const { PrismaClient } = require("@prisma/client");

async function seedData() {
  const prisma = new PrismaClient();

  try {
    // Seed Users
    await prisma.user.createMany({
      data: [
        {
          first_Name: "shubham",
          last_Name: "hooda",
          email: "shubham123@gmail.com",
          password: "hashed_password_1", // Replace with a secure hash
          role: "admin",
          phone: "0987654321",
        },
        {
          first_Name: "monu",
          last_Name: "hooda",
          email: "monu123@example.com",
          password: "hashed_password_2", // Replace with a secure hash
          role: "admin",
          phone: "1234567890",
        },
        // Add more user records as needed
      ],
    });

    // Seed Location data
    const location1 = await prisma.location.create({
      data: {
        latitude: 34.0522,
        longitude: -118.2437,
        address: "Los Angeles, CA",
      },
    });

    const location2 = await prisma.location.create({
      data: {
        latitude: 40.7128,
        longitude: -74.006,
        address: "New York, NY",
      },
    });

    const location3 = await prisma.location.create({
      data: {
        latitude: 51.5074,
        longitude: -0.1278,
        address: "London, UK",
      },
    });

    // Seed Siding data
    const siding1 = await prisma.siding.create({
      data: {
        name: "Siding 1",
        locationId: location1.id,
        coalStock: 500,
        capacity: 1000,
        isActive: true,
      },
    });

    const siding2 = await prisma.siding.create({
      data: {
        name: "Siding 2",
        locationId: location2.id,
        coalStock: 300,
        capacity: 800,
        isActive: true,
      },
    });

    const siding3 = await prisma.siding.create({
      data: {
        name: "Siding 3",
        locationId: location3.id,
        coalStock: 700,
        capacity: 1200,
        isActive: true,
      },
    });

    // Seed Railway Rake data
    const rake1 = await prisma.railwayRake.create({
      data: {
        number: "Rake 101",
        locationId: location1.id,
        capacity: 200,
        isActive: true,
      },
    });

    const rake2 = await prisma.railwayRake.create({
      data: {
        number: "Rake 102",
        locationId: location2.id,
        capacity: 250,
        isActive: true,
      },
    });

    const rake3 = await prisma.railwayRake.create({
      data: {
        number: "Rake 103",
        locationId: location3.id,
        capacity: 180,
        isActive: true,
      },
    });

    // Seed Allocation Record data
    await prisma.allocationRecord.createMany({
      data: [
        {
          sidingId: siding1.id,
          rakeId: rake1.id,
          coalQuantity: 150,
        },
        {
          sidingId: siding2.id,
          rakeId: rake2.id,
          coalQuantity: 200,
        },
        {
          sidingId: siding3.id,
          rakeId: rake3.id,
          coalQuantity: 100,
        },
      ],
    });

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
