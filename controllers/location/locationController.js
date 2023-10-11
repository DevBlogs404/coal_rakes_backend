const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createLocation(req, res) {
  try {
    const { latitude, longitude, address } = req.body;

    const newLocation = await prisma.location.create({
      data: { latitude, longitude, address },
    });

    res.status(200).json(newLocation);
  } catch (error) {
    console.log(error);
  }
}

async function getLocation(req, res) {
  try {
    const locations = await prisma.location.findMany();
    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createLocation,
  getLocation,
};
