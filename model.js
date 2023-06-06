const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllData() {
  const records = await prisma.people.findMany();
  return records;
}

async function getDataById(id) {
  const record = await prisma.people.findUnique({
    where: {
      id
    }
  });
  return record;
}

async function createData(data) {
  const record = await prisma.people.create({
    data: {
      name: data.name,
      phone: data.phone
    }
  });
  return record;
}

async function updateData(id, data) { 
  const record = await prisma.people.update({
    where: { id:id},
    data: {...data }
  });
  return record;
}

async function deleteData(id) {
  const record = await prisma.people.delete({
    where: { id: id }
  });
  return record;
}

async function getLength() {
  const records = await prisma.people.findMany();
  return records.length;
}

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
  getLength
};
