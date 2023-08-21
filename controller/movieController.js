const MovieModel = require("../model/movies");

const getAllMovies = async (req, res) => {
  try {
    const result = await MovieModel.find({});
    if (result.length < 1) {
      throw new TypeError("Nothing has been found");
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json({ msg: "fault", error: error.message });
  }
};
//  controller how to make search in MongoDb using RegExp (part of title, category, released_year or country)
const searchMovies = async (req, res) => {
  const { category, title, country, released_year } = req.query;
  try {
    const query = [];

    if (title && title.length > 0) {
      const titleRegEx = new RegExp(title, "i"); // Creating RegEx for search
      query.push({ title: titleRegEx });
    }

    if (category && category.length > 0) {
      const categoryRegEx = new RegExp(category, "i");
      query.push({ category: { $in: [categoryRegEx] } }); // Note the use of an array
    }
    if (country && country.length > 0) {
      const countryRegEx = new RegExp(country, "i");
      query.push({ country: { $in: [countryRegEx] } }); // Note the use of an array
    }
    if (released_year) {
      query.push({ released_year: { $gte: new Date(released_year) } }); // search  movie after specific year
    }

    const result = await MovieModel.find({ $and: query }); // searching movie with part-title, category, country if it's exist
    result.length > 0
      ? res.status(200).json(result)
      : res.status(200).json({ message: "Nothing was found" });
  } catch (error) {
    res.status(400).json({ msg: "fault", error: error });
  }
};

const addMovie = async (req, res) => {
  try {
    const movieObj = req.body;
    const newMovie = new MovieModel(movieObj);
    const result = await newMovie.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json({ msg: "fault", error: error.message });
  }
};
// Edit  --- PATCH
const editMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = req.body;
    const result = await MovieModel.findByIdAndUpdate(id, updatedMovie, {
      new: true
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json({ msg: "fault", error: error.message });
  }
};
//  delete movie by ID
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MovieModel.findByIdAndDelete(id);

    result
      ? res.status(201).json(result)
      : res.status(404).json({ message: "Record was not found" });
  } catch (error) {
    res.status(400).json({ msg: "fault", error: error.message });
  }
};

module.exports = {
  searchMovies,
  getAllMovies,
  addMovie,
  editMovie,
  deleteMovie
};
