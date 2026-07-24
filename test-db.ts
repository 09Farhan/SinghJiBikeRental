import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  
  const updatedAdmin = await prisma.adminUser.update({
    where: { email: 'admin@singhjibikes.com' },
    data: { passwordHash: adminPassword }
  });
  
  console.log('Successfully updated the admin password hash!');
}

main().finally(() => prisma.$disconnect());
