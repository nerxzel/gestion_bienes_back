import { PrismaClient } from '@prisma/client';

// Function that returns a new instance of PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Global variable that stores the PrismaClient instance
const globalForPrisma = globalThis;

// If an instance already exists, we return it. Else we create a new instance and store it in the global variable
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// If the environment is not production, we store the PrismaClient instance in the global variable
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}


export default prisma;