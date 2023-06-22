const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/superHero");

const {
  getAll,
  // getById,
  add,
  // removeById,
  // updateById,
} = require("../../controllers/superHeroes");

router.get("/", getAll);

// router.get("/:contactId", getById);

router.post("/", validateBody(schemas.addSchema), add);

// router.delete("/:contactId", removeById);

// router.put("/:contactId", validateBody(schemas.addSchema), updateById);

module.exports = router;
