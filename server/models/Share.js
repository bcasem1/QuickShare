import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    text: { type: String },
    fileUrl: { type: String },
    fileName: { type: String },
    fileSize: { type: Number },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

// TTL Index - auto delete after 30 minutes (1800 seconds)
ShareSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Share", ShareSchema);
