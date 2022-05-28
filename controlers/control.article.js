const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { body } = require("express-validator/check");
const { validationResult } = require("express-validator/check");
const validate = require("../validator/article.validator");

article = {
  getArticles: async (req, res) => {
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
  createArticle : async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const {title , description , content, userId , url  }= req.body ;
    try {
      const article = await prisma.article.create({
        data: {
          title :title,
          description :description,
          content :content,
          url : url,
          user : {
            connect :{ id : userId}
          },

        },
        
      });
      res.json(article);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  deleteArticle: async (req, res) => {
    try {
      const { id } = req.params;
      const article1 = await prisma.article.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!article1) {
        res.json({ message: "cette article n'existe pas" });
      }
      const article2 = await prisma.article.delete({
        where: {
          id: Number(id),
        },
      });
      res.json(article2);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  updateArticle : async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    try {
      const { id }= req.params ;
      const {title , description , content, url , published } = req.body;
      const article =await  prisma.article.update({
        where : {
          id : Number(id),
        },
        data : {
          title : title,
          description : description,
          content : content,
          url : url , 
          published : published 
        }
      })
      res.json(article)
    }catch(error){
      res.json({ message: error.message });
    }
  }
};

module.exports = article;
