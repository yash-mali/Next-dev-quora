import { getMongoDbUserIdFromClerkUserId } from "@/actions/users";
import { connectDB } from "@/config/db";
import QuestionModel from "@/models/QuestionModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { questionid: string } }
) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);
    await QuestionModel.findByIdAndUpdate(params.questionid, reqBody);
    return NextResponse.json({ message: "Question updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { questionid: string } }
) {
  try {
    const { userId } = auth();
    if (userId === undefined) throw new Error("User not authenticated");
    await QuestionModel.findByIdAndDelete(params.questionid);
    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      {
        status: 500,
      }
    );
  }
}
