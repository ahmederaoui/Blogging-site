const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import Chance from "chance";
import {user} from "@pagemarker/data";
var chance = new Chance();

async function seed(){
    const User = {
        name : "kljhfiosqd",
        email : "ahmedsdfg@mail.com",
        password :"passwordd",
        role : "ADMIN"
    }
    await client.user.create({data : User})
    for (let i=0;i< 10;i++){
        await client.user.create({
            data : {
                name : chance.word({lenght : 7}),
                email: chance.email(),
                password : chance.password(),
            }
        })
    }

}

module.exports = seed