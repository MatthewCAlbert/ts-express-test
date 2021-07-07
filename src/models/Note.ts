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
    timestamps: { currentTime: () => Math.floor(Date.now() + parseInt(process.env.UTC_OFFSET)*3600*1000) },
    collection: "notes",
  }
);

const Note = mongoose.model<NoteDocument>("Note", NoteSchema);

export default Note;
