const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createSiding(req, res) {
  try {
    const { name, locationId, coalStock, capacity, isActive } = req.body;

    const newSiding = await prisma.siding.create({
      data: {
        name,
        locationId,
        coalStock,
        capacity,
        isActive,
      },
    });

    res.status(200).json(newSiding);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllSidings(req, res) {
  try {
    const sidings = await prisma.siding.findMany();
    res.status(200).json(sidings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateSiding(req, res) {
  let { id } = req.params;
  id = Number(id);
  const { name, locationId, coalStock, capacity, isActive } = req.body;
  try {
    const updateSiding = await prisma.siding.update({
      where: {
        id: id,
      },
      data: {
        name,
        locationId,
        coalStock,
        isActive,
        capacity,
      },
    });
    res.status(200).json(updateSiding);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
}

module.exports = {
  createSiding,
  getAllSidings,
  updateSiding,
};
