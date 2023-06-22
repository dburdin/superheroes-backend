const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const superHeroSchema = Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    real_name: {
      type: String,
      required: true,
    },
    origin_description: {
      type: String,
      required: true,
    },
    superpowers: {
      type: [String],
      required: true,
    },
    catch_phrase: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

superHeroSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.array().items(Joi.string()).required(),
  catch_phrase: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
});

const schemas = {
  addSchema,
};

const SuperHero = model("superhero", superHeroSchema, "superheroes");

module.exports = { SuperHero, schemas };
