import React from "react";
import ProfileTabs from "./_components/ProfileTabs";
import QuestionModel from "@/models/QuestionModel";
import { currentUser } from "@clerk/nextjs/server";
import { getMongoDbUserIdFromClerkUserId } from "@/actions/users";
import { IQuestion } from "@/interfaces/index";
import AnswerModel from "@/models/AnswerModel";
import CommentModel from "@/models/CommentModel";

async function ProfilePage({ searchParams }: { searchParams: any }) {
  const currentUserData = await currentUser();
  const mongoUserId = await getMongoDbUserIdFromClerkUserId(
    currentUserData?.id!
  );

  let askedQuestions: IQuestion[] = [];
  let answeredQuestions: IQuestion[] = [];
  let savedQuestions: IQuestion[] = [];
  let commentedQuestions = [];

  const tab = searchParams.tab || "asked";

  if (tab === "asked") {
    askedQuestions = await QuestionModel.find({
      user: mongoUserId,
    })
      .sort({ updatedAt: -1 })
      .populate("user");
  }

  if (tab === "answered") {
    answeredQuestions = await AnswerModel.find({
      user: mongoUserId,
    })
      .sort({ updatedAt: -1 })
      .populate("question");
  } else if (tab === "saved") {
    savedQuestions = await QuestionModel.find({
      savedBy: {
        $in: [mongoUserId],
      },
    });
  } else if (tab === "commented") {
    commentedQuestions = (await CommentModel.find({
      user: mongoUserId,
    })
      .sort({ updatedAt: -1 })
      .populate("question")) as any;
  }

  return (
    <div>
      <ProfileTabs
        askedQuestions={JSON.parse(JSON.stringify(askedQuestions))}
        answeredQuestions={JSON.parse(
          JSON.stringify(
            answeredQuestions.map((answer: any) => answer.question)
          )
        )}
        savedQuestions={JSON.parse(JSON.stringify(savedQuestions))}
        commentedQuestions={JSON.parse(
          JSON.stringify(
            commentedQuestions.map((comment: any) => comment.question)
          )
        )}
        mongoUserId={mongoUserId.toString()}
      />
    </div>
  );
}

export default ProfilePage;
