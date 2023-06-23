const { SuperHero } = require("../models/superHero");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await SuperHero.find({}, "-createdAt -updatedAt");
  return res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await SuperHero.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await SuperHero.create(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await SuperHero.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json({
    message: "Deleted",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await SuperHero.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const uploadImg = async (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  uploadImg: ctrlWrapper(uploadImg),
};
