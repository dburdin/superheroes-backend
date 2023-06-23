const express = require("express");
const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");
const { upload } = require("../../middlewares");

const { schemas } = require("../../models/superHero");

const {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  uploadImg,
} = require("../../controllers/superHeroes");

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:id", isValidId, removeById);

router.put("/:id", isValidId, validateBody(schemas.addSchema), updateById);

router.post("/upload", upload.single("image"), uploadImg);

module.exports = router;
