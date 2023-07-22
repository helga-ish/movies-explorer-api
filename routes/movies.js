const router = require('express').Router();
const { celebrate } = require('celebrate');
const { movieInfoSchema, movieIdSchema } = require('../middlewares/validationSchema');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({ body: movieInfoSchema }), createMovie);

router.delete('/movies/:movieId', celebrate({ params: movieIdSchema }), deleteMovie);

module.exports = router;
