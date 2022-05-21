const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user } = require("../controlers/control.user");

router.get("/users", user.getUsers);
router.get("/users/:id", user.getUser);
router.post("/users", user.validate("createUser"), user.createUser);
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user1 = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user1) {
      res.json({ message: "cet utilisateur n'existe pas" });
    }    
    const user2 = await prisma.user.delete({
      where: {
        id: Number(id),
      }
    });
    res.json(user2)
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
