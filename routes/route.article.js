const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { article } = require("../controlers/control.article");

router.get("/articles", article.getArticles);
router.get("/articles/:id", article.getArticle);
router.delete("/articles/:id",article.deleteArticle)

module.exports = router;