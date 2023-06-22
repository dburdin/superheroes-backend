const { Schema, model } = require("mongoose");

const superHeroSchema = Schema({
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
});

const SuperHero = model("superHero", superHeroSchema);

module.exports = SuperHero;
