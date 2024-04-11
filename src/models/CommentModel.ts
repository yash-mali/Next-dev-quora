import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answers",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.comments) {
  delete mongoose.models["comments"];
}

const CommentModel = mongoose.model("comments", commentSchema);
export default CommentModel;
