import ViewCode from "@/components/ViewCode";
import { dateTimeFormat } from "@/helpers/date-time-formats";
import { IQuestion } from "@/interfaces";
import QuestionModel from "@/models/QuestionModel";
import React from "react";
import QuestionInfoFooter from "../_components/QuestionInfoFooter";
import { currentUser } from "@clerk/nextjs";
import { getMongoDbUserIdFromClerkUserId } from "@/actions/users";
import { connectDB } from "@/config/db";
import AnswersList from "../_components/AnswersList";
import Link from "next/link";

connectDB();

interface ViewQuestionProps {
  params: {
    questionid: string;
  };
}

async function ViewQuestion({ params }: ViewQuestionProps) {
  const question: IQuestion = (await QuestionModel.findById(
    params.questionid
  ).populate("user")) as IQuestion;
  const currentUserData = await currentUser();
  const mongoDbUserId = await getMongoDbUserIdFromClerkUserId(
    currentUserData?.id!
  );
  return (
    <div>
      <div className="bg-gray-100 p-3">
        <h1 className="text-primary text-lg md:text-xl">{question.title}</h1>
        <div className="flex gap-5 md:gap-10 text-xs mt-2">
          <span>
            Asked On{" "}
            <span className="text-secondary">
              {dateTimeFormat(question.createdAt)}
            </span>
          </span>

          <Link href={`/users/${question.user._id}`}>
            Asked By{" "}
            <span className="text-secondary underline cursor-pointer">
              {question.user.name}
            </span>
          </Link>
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        {question.tags.map((tag: string, index: number) => (
          <Link
            href={`/?tag=${tag}`}
            key={index}
            className="bg-primary/20 p-2 rounded-md text-sm text-gray-600 capitalize underline cursor-pointer"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-5 mt-7">
        <p className="text-sm text-gray-600">{question.description}</p>

        <ViewCode code={question.code} />

        <QuestionInfoFooter
          question={JSON.parse(JSON.stringify(question))}
          mongoDbUserId={mongoDbUserId.toString()}
        />

        {question.totalAnswers > 0 && (
          <AnswersList question={JSON.parse(JSON.stringify(question))} />
        )}
      </div>
    </div>
  );
}

export default ViewQuestion;
