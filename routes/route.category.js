const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const category  = require("../controlers/control.category");

router.get("/categories",category.getCategories);
router.post("/categories",category.createCategory);


module.exports = router ;