import mongoose from "mongoose";

export type NoteDocument = mongoose.Document & {
  author_id: String,
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
};

const NoteSchema = new mongoose.Schema<NoteDocument>(
  {
    author_id: String,
    title: String,
    content: String,
  },
  {
    timestamps: true,
    collection: "notes",
  }
);

const Note = mongoose.model<NoteDocument>("Note", NoteSchema);

export default Note;
