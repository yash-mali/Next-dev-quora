"use client";
import { IQuestion } from "@/interfaces";
import { Button } from "@nextui-org/react";
import React from "react";
import AnswerForm from "./AnswerForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function QuestionInfoFooter({
  question,
  mongoDbUserId,
}: {
  question: IQuestion;
  mongoDbUserId: string;
}) {
  const router = useRouter();
  const [showNewAnswerModal, setShowNewAnswerModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSave = async () => {
    try {
      setLoading(true);
      const payload: IQuestion = question;
      payload.savedBy.push(mongoDbUserId);
      await axios.put(`/api/questions/${question._id}`, payload);
      toast.success("Question saved successfully to your profile.");
      router.refresh();
    } catch (error) {
      toast.error("Error saving question to your profile.");
    } finally {
      setLoading(false);
    }
  };

  const onRemoveFromSave = async () => {
    try {
      setLoading(true);
      const payload: IQuestion = question;
      payload.savedBy = payload.savedBy.filter(
        (savedBy) => savedBy !== mongoDbUserId
      );
      await axios.put(`/api/questions/${question._id}`, payload);
      toast.success("Question removed successfully from your profile.");
      router.refresh();
    } catch (error) {
      toast.error("Error removing question from your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-sm">
          {question.totalAnswers > 0 ? question.totalAnswers : "No"} Answers
        </span>

        <div className="flex gap-5">
          {question.savedBy.includes(mongoDbUserId) && (
            <Button
              size="sm"
              color="secondary"
              onClick={() => onRemoveFromSave()}
              isLoading={loading}
            >
              Remove from Saved
            </Button>
          )}
          {!question.savedBy.includes(mongoDbUserId) && (
            <Button
              size="sm"
              color="secondary"
              onClick={() => onSave()}
              isLoading={loading}
            >
              Save
            </Button>
          )}
          <Button
            size="sm"
            color="secondary"
            onClick={() => setShowNewAnswerModal(true)}
            isDisabled={mongoDbUserId === question.user._id}
          >
            Write an Answer
          </Button>
        </div>
      </div>

      {showNewAnswerModal && (
        <AnswerForm
          setShowAnswerForm={setShowNewAnswerModal}
          showAnswerForm={showNewAnswerModal}
          questionId={question._id}
        />
      )}
    </div>
  );
}

export default QuestionInfoFooter;
