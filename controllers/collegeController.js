const College = require("../models/collegeModel");
const researchPaperModel = require("../models/researchPaperModel");
const reviewModel = require("../models/reviewModel");

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findById(id)
      .populate({
        path: "reviewIds",
        model: reviewModel,
      })
      .populate({
        path: "researchPaperIds",
        model: researchPaperModel,
      });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Return the college data if found
    res.status(200).json(college);
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCollegeByName = async (req, res) => {
  const collegeName = req.query.college; // Query parameter for college name

  if (!collegeName) {
    return res.status(400).json({ message: "College name is required" });
  }

  try {
    const college = await College.findOne({
      name: new RegExp(collegeName, "i"),
    }); // Case-insensitive search

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json(college);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
