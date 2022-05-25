const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const user  = require("../controlers/control.user");

router.get("/users", user.getUsers);
router.get("/users/:id", user.getUser);
router.post("/users", user.validate("createUser"), user.createUser);
router.delete("/users/:id",user.deleteUser);
router.patch("/users/:id", user.validate("updateUser"), user.updateUser);

module.exports = router;
