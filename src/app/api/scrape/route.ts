import { NextResponse } from 'next/server';
import scraper from '../../../utils/scraper'
import { isValidUrl } from '../../../utils/urlFilter'
export async function POST(req:Request) {
  const { url } = await req.json();
  
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }
  if (!isValidUrl(url)) {
    return NextResponse.json({ error: 'URL is in the wrong format (e.g www.ratemyprofessors.com/professor/12312)' }, { status: 400 });
  }

  try {
    const data = await scraper(url); 
    console.log(data)
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: `Failed to scrape the page: ${error}` }, { status: 500 });
  }
}