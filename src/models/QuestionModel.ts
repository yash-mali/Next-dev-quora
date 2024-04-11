import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
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
    tags: {
      type: [String],
      required: false,
      default: [],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    totalAnswers: {
      type: Number,
      required: false,
      default: 0,
    },
    savedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
      ref: "users",
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["questions"]) {
  delete mongoose.models["questions"];
}

const QuestionModel = mongoose.model("questions", questionSchema);
export default QuestionModel;
