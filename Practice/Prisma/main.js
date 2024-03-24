const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function createUser() {
    const user = await prisma.user.create({
        data: {
            name: "Alice",
            email: "alicekumar@gmail.com",
        },
    })
}

async function getUser() {
    const user = await prisma.user.findUnique({
        where: {
            email: "alicekumar@gmail.com",
        }
    })
    console.log(user)
}

async function getallUsers() {
    const users = await prisma.user.findMany()
    console.log(users)
}

createUser()
getUser("alicekumar@gmail.com")
getallUsers()