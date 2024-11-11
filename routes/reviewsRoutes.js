const express = require("express");
const { getReviews,addReview, getReviewsWithMine } = require("../controllers/reviewsController");
const router = express.Router();

router.get("/", getReviews);
router.get("/getReviewWithMine/:email", getReviewsWithMine)
router.post("/addReview", addReview)
module.exports = router;
