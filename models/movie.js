const mongoose = require('mongoose');
const validator = require('validator');
const user = require('./user');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
    // validate: {
    //   validator: (v) => validator.isURL(v),
    // },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  thumbnail: {
    type: Object,
    // required: true,
    // validate: {
    //   validator: (v) => validator.isURL(v),
    // },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: user,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
