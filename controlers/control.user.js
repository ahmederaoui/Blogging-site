const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

user = {
  getUsers: async function (req, res, next) {
    try {
      const users = await prisma.user.findMany({});
      if (users == [] || users.length == 0)
        res.json({ message: "il n y a pas dutilisater" });
      res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
  },
  getUser: async function (req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        res.json({ message: "cet utilisateur n'existe pas" });
      }
      res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
  },
};

module.exports.user = user;
