import { Pinecone } from '@pinecone-database/pinecone';
import { listIndexes } from '@pinecone-database/pinecone/dist/control';

interface MetaData {
  profName: string,
  profRatingValue: string
  profDifficulty: string
  numOfRatings: string,
  profDepartment: string
  profSchool: string
}
// Initialize Pinecone client
export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string
});

// Ensure Pinecone Index
export async function ensurePineconeIndex() {
  try {
    // List existing indexes
    const existingIndexes = await pc.listIndexes();
    if (existingIndexes.indexes) {
      const indexExists = existingIndexes.indexes.some(index => index.name === 'rmp-data');
      // Check if 'rmp-data' already exists
      if (indexExists) {
        console.log('Index already exists.');
        return pc.index('rmp-data'); // Return the existing index
      }

      // If index does not exist, create it
      await pc.createIndex({
        name: 'rmp-data',
        dimension: 1536, // Replace with your model dimensions
        metric: 'cosine', // Replace with your model metric
        spec: { 
          serverless: { 
            cloud: 'aws', 
            region: 'us-east-1' 
          }
        } 
      });
    }
    console.log('Index created successfully.');
  } catch (error) {
    console.error("Error ensuring Pinecone index exists: ", error);
  }
}

// Insert Data into Pinecone
export async function insertDataIntoPinecone(embedding: number[], metadata: MetaData) {
  try {
    const index = pc.Index('rmp-data');

    // Prepare vectors with metadata
    const vectors = {
      id: metadata.profName, // Create a unique ID for each embedding
      values: embedding,
      metadata: {
        profRatingValue: metadata.profRatingValue,
        profDifficulty: metadata.profDifficulty,
        numOfRatings: metadata.numOfRatings,
        profDepartment: metadata.profDepartment,
        profSchool: metadata.profSchool,
      }
    };

    // Upsert vectors into Pinecone
    await index.upsert([vectors]);
  } catch (error) {
    console.error("Error inserting data into Pinecone: ", error);
  }
}
