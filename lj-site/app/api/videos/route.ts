import { NextResponse } from "next/server";
import { videos } from "@/lib/data";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ videos });
}
