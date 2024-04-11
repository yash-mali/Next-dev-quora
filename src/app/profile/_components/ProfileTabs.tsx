"use client";
import { Button, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import { IQuestion } from "@/interfaces/index";
import axios from "axios";
import toast from "react-hot-toast";

interface ProfileTabsProps {
  askedQuestions: IQuestion[];
  answeredQuestions: IQuestion[];
  savedQuestions: IQuestion[];
  commentedQuestions: IQuestion[];
  mongoUserId: string;
}

function ProfileTabs({
  askedQuestions,
  answeredQuestions,
  savedQuestions,
  mongoUserId,
  commentedQuestions,
}: ProfileTabsProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [loadingForRemoveFromSaved, setLoadingForRemoveFromSaved] =
    React.useState(false);
  const [selectedQuestionToDelete, setSelectedQuestionToDelete] =
    React.useState<string | null>(null);

  const deleteQuestion = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/questions/${id}`);
      toast.success("Question deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getQuestion = (question: IQuestion) => (
    <div className="border p-3 flex flex-col gap-2 bg-gray-50 cursor-pointer hover:border-gray-700">
      <h1>{question.title}</h1>
      <span className="text-gray-500 text-sm line-clamp-2">
        {question.description}
      </span>
      <div className="flex justify-end gap-5 mt-5">
        <Button
          size="sm"
          variant="flat"
          onClick={() => {
            router.push(`/questions/view-question/${question._id}`);
          }}
        >
          View
        </Button>

        {question.user._id === mongoUserId && (
          <>
            {" "}
            <Button
              size="sm"
              color="secondary"
              variant="flat"
              isLoading={loading && selectedQuestionToDelete === question._id}
              onClick={() => {
                setSelectedQuestionToDelete(question._id);
                deleteQuestion(question._id);
              }}
            >
              Delete
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onClick={() => {
                router.push(`/questions/edit-question/${question._id}`);
              }}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const getEmptyMessage = () => (
    <div>
      <h1 className="text-sm">No questions found</h1>
    </div>
  );

  return (
    <Tabs
      color="primary"
      onSelectionChange={(key) => {
        router.push(`/profile?tab=${key}`);
      }}
    >
      <Tab title="Questions Asked" key="asked">
        <div className="flex flex-col gap-5">
          {askedQuestions.map((question) => (
            <div key={question._id}>{getQuestion(question)}</div>
          ))}

          {askedQuestions.length === 0 && getEmptyMessage()}
        </div>
      </Tab>
      <Tab title="Questions Answered" key="answered">
        <div className="flex flex-col gap-5">
          {answeredQuestions.map((question) => (
            <div key={question._id}>{getQuestion(question)}</div>
          ))}
        </div>
        {answeredQuestions.length === 0 && getEmptyMessage()}
      </Tab>
      <Tab title="Questions Saved" key="saved">
        <div className="flex flex-col gap-5">
          {savedQuestions.map((question) => (
            <div key={question._id}>{getQuestion(question)}</div>
          ))}
        </div>
        {savedQuestions.length === 0 && getEmptyMessage()}
      </Tab>

      <Tab title="Questions Commented" key="commented">
        <div className="flex flex-col gap-5">
          {commentedQuestions.map((question) => (
            <div key={question._id}>{getQuestion(question)}</div>
          ))}
        </div>
        {commentedQuestions.length === 0 && getEmptyMessage()}
      </Tab>
    </Tabs>
  );
}

export default ProfileTabs;
