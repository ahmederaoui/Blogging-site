const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const  article = require("../controlers/control.article");
const validate = require("../validator/article.validator")


router.get("/articles", article.getArticles);
router.get("/articles/:id", article.getArticle);
router.delete("/articles/:id",article.deleteArticle);
router.post("/articles",validate.create("createArticle"),article.createArticle);
router.patch("/articles/:id",validate.create("updateArticle"),article.updateArticle);


module.exports = router;