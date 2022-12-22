import { prisma } from ".";
import moment from "moment";

const getAllSuperchats = () => {
  return prisma.superchat.findMany()
}

const getValidSuperchats = () => {
  return prisma.superchat.findMany({
    where: {
      expired: false
    }
  })
}

const expireSuperchat = async(id: number)  => {
  await prisma.superchat.update({
    where: {
      id: Number(id)
    },
    data: {
      expired: true
    }
  })
}

const deleteAllSuperchats = async()  => {
  await prisma.superchat.deleteMany();
}

export { getAllSuperchats, getValidSuperchats, expireSuperchat, deleteAllSuperchats };