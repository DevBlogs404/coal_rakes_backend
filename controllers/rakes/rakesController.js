const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// create a new railway rake
async function createRake(req, res) {
  try {
    const { number, capacity, locationId, isActive, sidingId } = req.body;

    const newRake = await prisma.railwayRake.create({
      data: {
        number,
        locationId,
        capacity,
        isActive,
        sidingId,
      },
    });

    return res.status(200).json(newRake);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
}

// get all railway rakes
async function getAllRakes(req, res) {
  try {
    const allRakes = await prisma.railwayRake.findMany();

    res.status(200).json(allRakes);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
}

// update an existing railway rake info
async function updateRake(req, res) {
  let { id } = req.params;
  id = Number(id);
  const { number, capacity, locationId, isActive, sidingId } = req.body;
  try {
    const updateRake = await prisma.railwayRake.update({
      where: {
        id: id,
      },
      data: {
        number,
        capacity,
        isActive,
        locationId,
        sidingId,
      },
    });

    res.status(200).json(updateRake);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
}

// delete a railway rake
async function deleteRake(req, res) {
  let { id } = req.params;
  id = Number(id);
  try {
    const deleteRake = await prisma.railwayRake.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json(deleteRake);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
  }
}

module.exports = {
  createRake,
  getAllRakes,
  updateRake,
  deleteRake,
};
