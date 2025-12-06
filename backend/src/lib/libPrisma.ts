import "dotenv/config";

import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "../prisma/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const libPrisma = new PrismaClient({ adapter })
export { libPrisma }