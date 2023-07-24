const Movie = require('../models/movie');
const ForbiddenError = require('../components/ForbiddenError');
const NotFoundError = require('../components/NotFoundError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .then((movieData) => {
      if (movieData === null) {
        throw new NotFoundError('Фильм не найден.');
      } else if (movieData.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return Movie.findOneAndDelete({ movieId: req.params.movieId })
        .then((movie) => res.status(200).send({ data: movie }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
