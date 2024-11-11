// models/collegeModel.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const collegeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String }, // Path to the image file or URL
    rating: { type: Number, min: 0, max: 5 }, // Rating out of 5
    admissionDates: { type: String }, // Admission period in string format
    events: [{ type: String }], // List of event names
    sports: [{ type: String }], // List of sports or competitions
    researchPaperIds: [{ type: Schema.Types.ObjectId, ref: "Researchpaper" }], // References to ResearchPaper documents
    reviewIds: [{ type: Schema.Types.ObjectId, ref: "Review" }], // References to Review documents
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
