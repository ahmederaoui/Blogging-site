const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { body } = require("express-validator/check");
const { validationResult } = require("express-validator/check");
validate = {
  create: (method) => {
    switch (method) {
      case "createArticle": {
        return [
          body("title", "the title doesn't exist or it's too short").exists(),
          body("description").optional(),
          body("content", "the content is obligatory").exists(),
          body("url").optional(),
        ];
      }
      case "updateArticle": {
        return [
          body("title").optional(),
          body("description").optional(),
          body("content").optional(),
          body("url").optional(),
          body("published").optional(),
        ];
      }
    }
  },
};

module.exports = validate;
