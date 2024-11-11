const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const College = require("../models/collegeModel");
const { replaceMongoIdInArray } = require("../utils/convertId");
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, review, email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    const userId = user._id;
    const name = user.name;
    const college = user.university;

    const findTheCollege = await College.findOne({ name: college });
    const collegeId = findTheCollege._id;

    const letsSave = new Review({
      userId,
      collegeId,
      rating,
      comment: review,
      name,
    });
    const isSaved = await letsSave.save();

    if (!isSaved) {
      return res.json({ success: false, message: "Something went wrong" });
    }

    res.json({ success: true, message: "Successfully added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviewsWithMine = async (req, res) => {
  try {
    const { email } = req.params;
    let reviews = [];

    // Check if email is provided
    if (email) {
      // Find the user by email
      const getUser = await User.findOne({ email });
      if (!getUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { _id } = getUser;
      // Fetch all reviews
      const getAllReview = await Review.find();

      // Find the user's own review
      const getMyReview = getAllReview.find(
        (item) => item.userId.toString() === _id.toString()
      );

      // Filter out the user's review to get others' reviews
      const getOthersReview = getAllReview.filter(
        (item) => item.userId.toString() !== _id.toString()
      );

      // If the user has a review, add it to the reviews array
      if (getMyReview) {
        reviews.push(getMyReview);
      }

      // Always return 3 reviews: 1 from the logged-in user if available, and 2 others
      let othersReview = getOthersReview.slice(0, 2); // Get 2 other reviews

      // Add the other reviews to the array
      reviews = [...reviews, ...othersReview];

      // If there are less than 3 reviews, get more from others (but only return 3 total reviews)
      if (reviews.length < 3) {
        const additionalReviews = getOthersReview.slice(
          othersReview.length,
          3 - reviews.length
        );
        reviews = [...reviews, ...additionalReviews];
      }

    } else {
      // If no email is provided, return any 3 reviews from all users
      const getAllReview = await Review.find();
      reviews = getAllReview.slice(0, 3); // Always return up to 3 reviews
    }

    // Return the reviews as the response
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
