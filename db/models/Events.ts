import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  description: String,
  userId: String,
});

export const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
