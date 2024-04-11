import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: false,
      trim: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "questions",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["answers"]) {
  delete mongoose.models["answers"];
}

const AnswerModel = mongoose.model("answers", answerSchema);
export default AnswerModel;
