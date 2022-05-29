const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { body } = require("express-validator/check");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");

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
  validate: (method) => {
    switch (method) {
      case "createUser": {
        return [
          body("name", "username doesn't exist").exists().isLength({ min: 3 }),
          body("name").custom( async (value) => {
            const nom = await prisma.user.findUnique({
              where: {
                name: value,
              }
            });
            if (nom) {
              return Promise.reject("username already in use");
            }
          }),
          body("email").custom( async (value) => {
            const mail = await prisma.user.findUnique({
              where: {
                email: value,
              }
            });
            if (mail) {
              return Promise.reject("e-mail already exist");
            }
          }),
          body("email", "Invalid email").exists().isEmail(),
          body("password").exists().isLength({ min: 8 }),
          body("role").optional(),
        ];
      }
      case "updateUser": {
        return [
          body("name", "username doesn't exists").optional().isLength({ min: 3 }),
          body("name").custom( async (value) => { 
            const nom = await prisma.user.findUnique({
              where: {
                name: value,
              }
            });
            if (nom) {
              return Promise.reject("username already in use");
            }
          }),
          body("email").custom(async (value) => {
            const mail = await prisma.user.findUnique({
              where : {
                email: value,
              }
            });
            if (mail ) {
              return Promise.reject("e-mail already exist");
            }
          }),
          body("email", "Invalid email").optional().isEmail(),
          body("password").optional().exists().isLength({ min: 8 }),
        ];
      }
    }
  },
  createUser: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const { name, email, password,role } = req.body;
      let hashedPassword = await bcrypt.hashSync(password,10)
      console.log(hashedPassword)
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role : role ,
        },
      });
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
      console.log(error.message);
    }
  },
  updateUser: async (req , res) => {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const { name, email, password } = req.body;
      const user = await prisma.user.update({
        where : {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
      console.log(error.message);
    }
  },
  deleteUser: async function (req, res) {
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
        },
      });
      res.json(user2);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};

module.exports= user;
