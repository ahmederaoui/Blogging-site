const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { body } = require("express-validator/check");
const { validationResult } = require('express-validator/check');


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
          body("name", "username doesn't exists").exists(),
          body("name").custom(value => {
            const nom = prisma.user.findUnique({
                where : {
                    name : value,
                }
            })
            if(nom){
                return Promise.reject('username already in use');
            }

          }),
          body("email").custom(value => {
              const mail = prisma.user.findUnique({
                  where : {
                      email : value,
                  }
              })
              if (mail){
                  return Promise.reject('e-mail already exist');
              }
          }),
          body("email", "Invalid email").exists().isEmail(),
          body("password").isLength({ min: 8 }),
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
      const { name, email, password } = req.body;
      const user = await prisma.user.create({
        data: {
           "name": name,"email": email, "password" :password
        },
      });
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
      console.log(error.message);
    }
  },
};

module.exports.user = user;
