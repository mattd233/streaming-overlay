import { prisma } from '.';

const getAllSuperchats = async () => {
  return await prisma.superchat.findMany();
};

const getValidSuperchats = async () => {
  return await prisma.superchat.findMany({
    where: {
      expired: false
    }
  });
};

const expireSuperchat = async (id: number) => {
  await prisma.superchat.update({
    where: {
      id: Number(id)
    },
    data: {
      expired: true
    }
  });
};

const deleteAllSuperchats = async () => {
  await prisma.superchat.deleteMany();
};

export { getAllSuperchats, getValidSuperchats, expireSuperchat, deleteAllSuperchats };
