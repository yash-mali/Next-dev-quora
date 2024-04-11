"use client";
import { dateTimeFormat } from "@/helpers/date-time-formats";
import { IQuestion } from "@/interfaces";
import React from "react";
import { useRouter } from "next/navigation";

function QuestionCard({ question }: { question: IQuestion }) {
  const router = useRouter();
  
  return (
    <div
      className="p-3 flex flex-col gap-3 border bg-gray-50 hover:border-gray-700 cursor-pointer"
      onClick={() => router.push(`/questions/view-question/${question._id}`)}
    >
      <h1>{question.title}</h1>
      <p className="text-gray-500 line-clamp-2 text-sm">
        {question.description}
      </p>

      <div className="flex flex-col md:flex-row md:justify-between mt-5 md:items-center">
        <div>
          <span className="text-secondary text-xs">
            {question.totalAnswers > 0 ? question.totalAnswers : "No"} answers
          </span>
        </div>

        <div className="flex gap-10 text-xs flex-wrap">
          <span>
            Asked On{" "}
            <span className="text-secondary">
              {dateTimeFormat(question.updatedAt)}
            </span>
          </span>

          <span>
            Asked By{" "}
            <span className="text-secondary">{question.user.name}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
