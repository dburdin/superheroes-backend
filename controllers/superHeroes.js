const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dhh42ueby",
  api_key: "636798444855926",
  api_secret: "qiexNfmOtv4K5gUF06zB-VCEJSA",
});

const { SuperHero } = require("../models/superHero");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const superheroes = await SuperHero.find({}, "-createdAt -updatedAt");
  const totalResult = superheroes.length;

  const paginatedSuperheroes = superheroes.slice(offset, offset + limit);

  return res.json({
    data: paginatedSuperheroes,
    page: parseInt(page),
    limit: parseInt(limit),
    totalResult,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await SuperHero.findById(id);
  if (!result) {
    throw new HttpError(404, "Not found");
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
    throw new HttpError(400, "Not found");
  }
  res.json({
    message: "Deleted",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await SuperHero.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json(result);
  console.log("result", result);
};

const uploadImg = async (req, res) => {
  if (!req.file) {
    throw new HttpError(400, "No file uploaded");
  }

  const uploadedImg = await cloudinary.uploader.upload(req.file.path);

  const imageUrl = uploadedImg.secure_url;

  res.json({
    imageUrl,
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
