const { PrismaClient } = require("@prisma/client");
const { json } = require("express/lib/response");
const prisma = new PrismaClient();

comment = {
  getComments: async (req, res) => {
    try {
      const comments = await prisma.comment.findMany({});
      res.json(comments);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  getComment: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await prisma.comment.findUnique({
        where: {
          id: Number(id)
        },
      });
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  createComment: async (req, res) => {
    try {
      const { content, userId, articleId } = req.body;
      const comment = await prisma.comment.create({
        data: {
          content: content,
          user: {
            connect: {
              id: userId,
            },
          },
          article: {
            connect: {
              id: articleId,
            },
          },
        },
      });
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await prisma.comment.update({
        where: {
          id: Number(id),
        },
        data: {
          content: content,
        }
      });
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await prisma.comment.delete({
        where: {
          id: Number(id)
        },
      });
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
};

module.exports = comment;
