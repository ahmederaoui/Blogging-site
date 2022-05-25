const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { body } = require("express-validator/check");
const { validationResult } = require("express-validator/check");

article = {
    getArticles : async (req , res )=>{
        try {
          const articles = await prisma.article.findMany({});
          if (articles == [] || articles.length == 0)
            res.json({ message: "il n y a aucune article" });
          res.json(articles);
        } catch (error) {
          res.json({ message: error.message });
        }
    },
    getArticle: async function (req, res) {
        try {
          const { id } = req.params;
          const article = await prisma.article.findUnique({
            where: {
              id: Number(id),
            },
          });
          if (!article) {
            res.json({ message: "cette article n'existe pas" });
          }
          res.json(article);
        } catch (error) {
          res.json({ message: error.message });
        }
    },
    validate : (method)=> {
        switch (method) {
            case "createUser": {
                return [
                    body("","username doesn't exists")
                ]
            }
        }
    },
    deleteArticle : async (req , res )=>{
        try {
            const { id } = req.params;
            const article1 = await prisma.article.findUnique({
              where: {
                id: Number(id),
              },
            });
            if (!article1) {
              res.json({ message: "cet utilisateur n'existe pas" });
            }
            const article2 = await prisma.article.delete({
              where: {
                id: Number(id),
              },
            });
            res.json(artiçle2);
          } catch (error) {
            res.json({ message: error.message });
          }
    }
}

module.exports.article = article ;