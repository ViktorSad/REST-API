const express = require("express");
const {
  searchMovies,
  getAllMovies,
  addMovie,
  editMovie,
  deleteMovie
} = require("../controller/movieController");
const { isTokenValid } = require("../middlewares/index");
const router = express.Router();

router.get("/", isTokenValid, getAllMovies);
router.post("/add", isTokenValid, addMovie);
router.get("/search", isTokenValid, searchMovies);
router.patch("/edit/:id", isTokenValid, editMovie);
router.delete("/delete/:id", isTokenValid, deleteMovie);
module.exports = router;
