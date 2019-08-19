const { validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const User = require("../models/User");

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "name",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (status) profileFields.status = status;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );

      return res.json(profile);
    }
    // Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
