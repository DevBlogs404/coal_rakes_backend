const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// create an allocation record
async function createRecord(req, res) {}

// get all allocation records
async function getAllRecords(req, res) {}

// update an existing allocation record info
// async function updateRake(req, res) {}

// delete an allocation record
// async function deleteRake(req, res) {}

module.exports = {
  createRecord,
  getAllRecords,
};
