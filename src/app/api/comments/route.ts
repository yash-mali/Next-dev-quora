import { connectDB } from "@/config/db";
import CommentModel from "@/models/CommentModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getMongoDbUserIdFromClerkUserId } from "@/actions/users";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);
    await CommentModel.create(reqBody);
    return NextResponse.json({ message: "Comment added successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl?.searchParams;
    const answer = searchParams?.get("answer");
    const comments = await CommentModel.find({ answer }).populate("user").sort({ updatedAt: -1 });
    return NextResponse.json({ comments });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      {
        status: 500,
      }
    );
  }
}
