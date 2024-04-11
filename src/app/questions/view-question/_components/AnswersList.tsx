import { connectDB } from "@/config/db";
import { IQuestion } from "@/interfaces";
import AnswerModel from "@/models/AnswerModel";
import AnswerCard from "./AnswerCard";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { getMongoDbUserIdFromClerkUserId } from "@/actions/users";
connectDB();

async function AnswersList({ question }: { question: IQuestion }) {
  const currentUserData = await currentUser();
  const mongoUserId = await getMongoDbUserIdFromClerkUserId(
    currentUserData?.id!
  );
  const answers = await AnswerModel.find({ question: question._id })
    .populate("user")
    .populate("question")
    .sort({ updatedAt: -1 });
  return (
    <div className="flex flex-col gap-5">
      {answers.map((answer: any) => (
        <AnswerCard
          answer={JSON.parse(JSON.stringify(answer))}
          key={answer._id}
          mongoUserId={mongoUserId.toString()}
        />
      ))}
    </div>
  );
}

export default AnswersList;
