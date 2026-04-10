import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Créer des écoles
  const school1 = await prisma.school.create({
    data: {
      name: 'École Primaire Excellence',
      code: 'EPE001',
      region: 'Kinshasa',
    },
  });

  const school2 = await prisma.school.create({
    data: {
      name: 'Lycée Moderne Lumière',
      code: 'LML002',
      region: 'Lubumbashi',
    },
  });

  console.log('✅ Schools created');

  // Créer des utilisateurs
  const adminPassword = await bcrypt.hash('admin123', 12);
  const teacherPassword = await bcrypt.hash('teacher123', 12);
  const parentPassword = await bcrypt.hash('parent123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@edufirst.com',
      password: adminPassword,
      firstName: 'Jean',
      lastName: 'Admin',
      role: 'ADMIN',
      schoolId: school1.id,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@edufirst.com',
      password: teacherPassword,
      firstName: 'Marie',
      lastName: 'Professeur',
      role: 'TEACHER',
      schoolId: school1.id,
    },
  });

  const parent = await prisma.user.create({
    data: {
      email: 'parent@edufirst.com',
      password: parentPassword,
      firstName: 'Pierre',
      lastName: 'Parent',
      role: 'PARENT',
      schoolId: school1.id,
    },
  });

  console.log('✅ Users created');

  // Créer des étudiants
  const students = await Promise.all([
    prisma.student.create({
      data: {
        firstName: 'Alice',
        lastName: 'Dubois',
        birthDate: new Date('2010-05-15'),
        gender: 'FEMALE',
        schoolId: school1.id,
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Bob',
        lastName: 'Martin',
        birthDate: new Date('2009-08-22'),
        gender: 'MALE',
        schoolId: school1.id,
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Claire',
        lastName: 'Leroy',
        birthDate: new Date('2011-03-10'),
        gender: 'FEMALE',
        schoolId: school2.id,
      },
    }),
  ]);

  console.log('✅ Students created');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📋 Test accounts:');
  console.log('Admin: admin@edufirst.com / admin123');
  console.log('Teacher: teacher@edufirst.com / teacher123');
  console.log('Parent: parent@edufirst.com / parent123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
