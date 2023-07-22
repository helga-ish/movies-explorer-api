const { Joi } = require('celebrate');

const userEmailSchema = {
  email: Joi.string().required().email(),
};

const userPasswordSchema = {
  password: Joi.string().required().min(8),
};

const userNameSchema = {
  name: Joi.string().min(2).max(30),
};

const userInfoSchema = {
  email: Joi.string().email(),
  name: Joi.string().min(2).max(30),
};

const signInSchema = Joi.object().keys({
  ...userEmailSchema,
  ...userPasswordSchema,
});

const signUpSchema = Joi.object().keys({
  ...userEmailSchema,
  ...userPasswordSchema,
  ...userNameSchema,
});

const movieInfoSchema = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i),
  trailerLink: Joi.string().required().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i),
  thumbnail: Joi.string().required().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
});

const movieIdSchema = Joi.object().keys({
  movieId: Joi.string().required().hex(),
});

module.exports = {
  userInfoSchema,
  signInSchema,
  signUpSchema,
  movieIdSchema,
  movieInfoSchema,
};
