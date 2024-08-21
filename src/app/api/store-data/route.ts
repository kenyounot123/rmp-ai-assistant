import { NextResponse } from 'next/server';
let tempData: any = null;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    tempData = data;
    return NextResponse.json({ message: 'Data stored successfully' }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error storing data' }, {
      status: 500,
    });
  }
}
export async function GET() {
  if (tempData) {
    return NextResponse.json(tempData)
  } else {
    return NextResponse.json({ message: 'No data available' }, {
      status: 404,
    });
  }
}
