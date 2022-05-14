const { Router } = require("express");
const {
  usersGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post("/", userPost);

router.put("/:id", userPut);

router.delete("/:id", userDelete);

module.exports = router;
