import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, dropdown, date } = await req.json();

  if (!text || !dropdown || !date) {
    return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
  }

  return NextResponse.json({ message: `Received: ${text}, ${dropdown}, ${date}` });
}
