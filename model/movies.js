const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const listMovieCategories = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western"
];

const countryNames = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "France",
  "Germany",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Russia",
  "South Africa",
  "Mexico",
  "Argentina",
  "Italy"
  // Add more country names as needed
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Russian",
  "Arabic",
  "Hindi",
  "Portuguese",
  "Italian",
  "Korean",
  "Dutch",
  "Turkish",
  "Polish"
  // Add more languages as needed
];

const movieSchema = new mongoose.Schema({
  title: { type: String, trim: true, require: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  imdb_score: { type: Number, require: true, set: (data) => data.toFixed(2) },
  released_year: {
    type: Date,
    min: new Date().getFullYear()
  },
  duration: { type: String, required: true },
  view_count: { type: Number },
  trailer: { type: String, required: true },
  category: [{ type: String, enum: listMovieCategories }],
  country: [{ type: String, enum: countryNames }],
  language: [{ type: String, enum: languages }],
  director: { type: String },
  cast: [
    {
      name: { type: String },
      character: { type: String }
    }
  ]
});
movieSchema.plugin(uniqueValidator);
const MovieModel = mongoose.model("Movie", movieSchema);
module.exports = MovieModel;
