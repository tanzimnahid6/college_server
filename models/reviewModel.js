// models/reviewModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true }, // Reference to the College model
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating out of 5
  comment: { type: String, required: true }, // Review comment text
  name: {type: String}
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
