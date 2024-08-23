import {NextRequest, NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import {openai} from '@/utils/embeddings';
import { pc } from '@/utils/pineconeClient';
import { formatMetadata } from '@/utils/metadataFormatter';
const systemPrompt = `
You are an AI assistant specialized in providing users with insights based on scraped data from Rate My Professor. After receiving data such as professor names, ratings, difficulty scores, number of reviews, and department information, your role is to respond to user queries with detailed, relevant, and helpful information derived from this data.

Your focus is on interpreting and analyzing the scraped data to answer user questions, guide their decisions, and provide recommendations when necessary. You should always be accurate, user-friendly, and capable of explaining complex information clearly. Handle errors or incomplete data with care by suggesting alternatives or offering insights into why certain data might be unavailable. Maintain a helpful, professional, and friendly tone, and aim to ensure that each interaction empowers the user with valuable insights about professors.`
// POST function to handle incoming requests
export async function POST(req: NextRequest) {
  const messageData = await req.json() // Parse the JSON body of the incoming request ( this would be the user's message to the bot )
  // convert the user's input to an embedding so that we can compare its similarity with the embeddings in our pinecone database
  // Process user query -> create embedding from it -> query pinecone for similarities -> format results
  if (!messageData || messageData.length === 0) {
    return new Response("No message data provided", { status: 400 });
  }
  const latestMessage = messageData[messageData.length - 1];
  if (!latestMessage || !latestMessage.content) {
    return new Response("Invalid message format", { status: 400 });
  }

  const createdQueryEmbedding = await openai.embeddings.create({
    input: latestMessage.content,
    model: "text-embedding-3-small",
  });
  
  const index = pc.index("rmp-data")
  
  const queryEmbedding = createdQueryEmbedding.data[0].embedding

  // Get similarities
  const mostSimilarMatches = await index.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true 
  });
  if (!mostSimilarMatches || mostSimilarMatches.matches.length === 0) {
    return new Response("No similar data found", { status: 404 });
  }
  // Provide it as context with the user's input
  const metadataList = mostSimilarMatches.matches.map((match: any) => {
    return match.metadata;
  })
  const formattedMetadataList = metadataList.map((metadata: any) => formatMetadata(metadata)).join("\n\n-------\n\n");

  const augmentedQuery = `
  Contextual Information:\n
  ${formattedMetadataList}
  -------
  MY QUESTION:\n${latestMessage.content}
  `;

  console.log(augmentedQuery)

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: systemPrompt },
        {
            role: "user",
            content: augmentedQuery,
        },
    ],
    stream: true
  });
  
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream)
}
