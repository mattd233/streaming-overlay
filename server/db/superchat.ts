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

const expireSuperchat = (id: number)  => {
  return prisma.superchat.update({
    where: {
      id
    },
    data: {
      expired: true
    }
  })
}

const deleteAllSuperchats = ()  => {
  return prisma.superchat.deleteMany();
}

export { getAllSuperchats, getValidSuperchats, expireSuperchat, deleteAllSuperchats };