const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, profession, bio } =
      req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        profession,
        bio,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile Updated",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};