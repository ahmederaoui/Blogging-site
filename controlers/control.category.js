const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();


category = {
    getCategories : async (req , res)=> {
        try{
            const categories = await prisma.category.findMany({});
            res.json(categories)
        }catch(error){
            res.json({message : error.message})
        }
    },
    createCategory : async (req , res )=>{
        try{
            const { name } = req.body;
            const category = await prisma.category.create({
                data : {
                    name : name
                }
            })
            res.json(category);
        }catch(error){
            res.json({ message :  error.message})
        }
    }
}

module.exports = category;