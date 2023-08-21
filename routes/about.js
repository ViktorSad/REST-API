const express = require("express");
const AboutModel = require("../model/aboutWeb");

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const result = await AboutModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ msg: "fault", error: error.message });
  }
});
// router.post("/add", async (req, res) => {
//   try {
//     const webInfo = new AboutModel(req.body);
//     const result = await webInfo.save();
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({ msg: "fault", error: error.message });
//   }
// });

module.exports = router;
