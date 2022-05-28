const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const comment  = require("../controlers/control.comment");

router.get("/comments", comment.getComments);
router.get("/comments/:id", comment.getComment);
router.post("/comments",comment.createComment);
router.patch("/comments/:id",comment.updateComment);
router.delete("/comments/:id",comment.deleteComment);

module.exports = router;