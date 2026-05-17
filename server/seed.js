const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'hy3763278@gmail.com';
  console.log(`Finding user with email: ${email}`);
  
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    console.error(`User with email ${email} not found in database.`);
    console.log("Please log in or sign up first on the frontend website, then run this seed command again!");
    return;
  }

  const userId = user.clerkUserId;
  console.log(`Found user: ${user.name || 'User'} (Clerk ID: ${userId})`);

  // Define categories to map
  const categoriesToSeed = [
    { name: 'Housing', type: 'EXPENSE', color: '#31572c' },
    { name: 'Food', type: 'EXPENSE', color: '#4f772d' },
    { name: 'Transport', type: 'EXPENSE', color: '#90a955' },
    { name: 'Entertainment', type: 'EXPENSE', color: '#ecf39e' },
    { name: 'Shopping', type: 'EXPENSE', color: '#132a13' },
    { name: 'Salary', type: 'INCOME', color: '#006c49' },
    { name: 'Investments', type: 'INCOME', color: '#008b8b' }
  ];

  console.log('Seeding / retrieving categories...');
  const categoryMap = {};
  for (const cat of categoriesToSeed) {
    const upserted = await prisma.category.upsert({
      where: {
        name_userId: {
          name: cat.name,
          userId: userId
        }
      },
      update: {},
      create: {
        name: cat.name,
        type: cat.type,
        color: cat.color,
        userId: userId
      }
    });
    categoryMap[cat.name] = upserted.id;
  }

  console.log('Categories synced.');

  // Clean old data to avoid duplication upon repeated seeding
  console.log('Cleaning existing seed-level transactions...');
  await prisma.transaction.deleteMany({
    where: {
      userId: userId,
      date: {
        gte: new Date('2026-04-01'),
        lte: new Date('2026-05-31')
      }
    }
  });

  // April transactions (April 2026)
  const aprilTransactions = [
    { title: 'Monthly Salary', amount: 5500.00, type: 'INCOME', date: new Date('2026-04-01'), paymentMethod: 'BANK_TRANSFER', categoryName: 'Salary' },
    { title: 'Apartment Rent', amount: 1500.00, type: 'EXPENSE', date: new Date('2026-04-02'), paymentMethod: 'BANK_TRANSFER', categoryName: 'Housing' },
    { title: 'Weekly Grocery Haul', amount: 180.50, type: 'EXPENSE', date: new Date('2026-04-05'), paymentMethod: 'DEBIT_CARD', categoryName: 'Food' },
    { title: 'Gas Station Fillup', amount: 45.00, type: 'EXPENSE', date: new Date('2026-04-07'), paymentMethod: 'CASH', categoryName: 'Transport' },
    { title: 'Cinema & Snacks', amount: 35.00, type: 'EXPENSE', date: new Date('2026-04-10'), paymentMethod: 'CREDIT_CARD', categoryName: 'Entertainment' },
    { title: 'Restaurant Dinner', amount: 85.00, type: 'EXPENSE', date: new Date('2026-04-14'), paymentMethod: 'CREDIT_CARD', categoryName: 'Food' },
    { title: 'Uber Ride', amount: 22.00, type: 'EXPENSE', date: new Date('2026-04-18'), paymentMethod: 'DEBIT_CARD', categoryName: 'Transport' },
    { title: 'Netflix Subscription', amount: 19.99, type: 'EXPENSE', date: new Date('2026-04-20'), paymentMethod: 'CREDIT_CARD', categoryName: 'Entertainment' },
    { title: 'Online Course Purchase', amount: 49.99, type: 'EXPENSE', date: new Date('2026-04-22'), paymentMethod: 'DEBIT_CARD', categoryName: 'Shopping' },
    { title: 'Dividend Payout', amount: 250.00, type: 'INCOME', date: new Date('2026-04-25'), paymentMethod: 'BANK_TRANSFER', categoryName: 'Investments' },
    { title: 'Supermarket Groceries', amount: 145.00, type: 'EXPENSE', date: new Date('2026-04-27'), paymentMethod: 'DEBIT_CARD', categoryName: 'Food' },
    { title: 'Bowling Night', amount: 60.00, type: 'EXPENSE', date: new Date('2026-04-28'), paymentMethod: 'CASH', categoryName: 'Entertainment' }
  ];

  // May transactions (May 2026)
  const mayTransactions = [
    { title: 'Monthly Salary', amount: 5500.00, type: 'INCOME', date: new Date('2026-05-01'), paymentMethod: 'BANK_TRANSFER', categoryName: 'Salary' },
    { title: 'Apartment Rent', amount: 1500.00, type: 'EXPENSE', date: new Date('2026-05-02'), paymentMethod: 'BANK_TRANSFER', categoryName: 'Housing' },
    { title: 'Whole Foods Grocery', amount: 220.00, type: 'EXPENSE', date: new Date('2026-05-04'), paymentMethod: 'DEBIT_CARD', categoryName: 'Food' },
    { title: 'Gas Fillup', amount: 50.00, type: 'EXPENSE', date: new Date('2026-05-06'), paymentMethod: 'CASH', categoryName: 'Transport' },
    { title: 'Concert Tickets', amount: 180.00, type: 'EXPENSE', date: new Date('2026-05-08'), paymentMethod: 'CREDIT_CARD', categoryName: 'Entertainment' },
    { title: 'Sushi Lounge Dinner', amount: 120.00, type: 'EXPENSE', date: new Date('2026-05-12'), paymentMethod: 'CREDIT_CARD', categoryName: 'Food' },
    { title: 'Gas Fillup', amount: 48.00, type: 'EXPENSE', date: new Date('2026-05-15'), paymentMethod: 'CASH', categoryName: 'Transport' },
    { title: 'Steam Game Purchase', amount: 59.99, type: 'EXPENSE', date: new Date('2026-05-16'), paymentMethod: 'OTHER', categoryName: 'Entertainment' },
    { title: 'iPad Purchase', amount: 799.00, type: 'EXPENSE', date: new Date('2026-05-17'), paymentMethod: 'CREDIT_CARD', categoryName: 'Shopping' }
  ];

  console.log('Seeding April transactions...');
  for (const tx of aprilTransactions) {
    await prisma.transaction.create({
      data: {
        title: tx.title,
        amount: tx.amount,
        type: tx.type,
        date: tx.date,
        paymentMethod: tx.paymentMethod,
        userId: userId,
        categoryId: categoryMap[tx.categoryName]
      }
    });
  }

  console.log('Seeding May transactions...');
  for (const tx of mayTransactions) {
    await prisma.transaction.create({
      data: {
        title: tx.title,
        amount: tx.amount,
        type: tx.type,
        date: tx.date,
        paymentMethod: tx.paymentMethod,
        userId: userId,
        categoryId: categoryMap[tx.categoryName]
      }
    });
  }

  // Budgets to seed for April and May
  const budgetsToSeed = [
    // April Budgets
    { amount: 1600.00, categoryName: 'Housing', month: 4, year: 2026 },
    { amount: 500.00, categoryName: 'Food', month: 4, year: 2026 },
    { amount: 150.00, categoryName: 'Transport', month: 4, year: 2026 },
    { amount: 200.00, categoryName: 'Entertainment', month: 4, year: 2026 },

    // May Budgets
    { amount: 1600.00, categoryName: 'Housing', month: 5, year: 2026 },
    { amount: 500.00, categoryName: 'Food', month: 5, year: 2026 },
    { amount: 150.00, categoryName: 'Transport', month: 5, year: 2026 },
    { amount: 200.00, categoryName: 'Entertainment', month: 5, year: 2026 }
  ];

  console.log('Seeding Budgets for April & May...');
  for (const bud of budgetsToSeed) {
    await prisma.budget.upsert({
      where: {
        userId_categoryId_month_year: {
          userId: userId,
          categoryId: categoryMap[bud.categoryName],
          month: bud.month,
          year: bud.year
        }
      },
      update: {
        amount: bud.amount
      },
      create: {
        amount: bud.amount,
        month: bud.month,
        year: bud.year,
        userId: userId,
        categoryId: categoryMap[bud.categoryName]
      }
    });
  }

  console.log('Database Seeding Successful! April and May data are completely loaded.');
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
