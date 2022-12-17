import { prisma } from ".";
import moment from "moment";

const getAllSongs = () => {
  return prisma.song.findMany()
}

const getTodaySongs = () => prisma.song.findMany(
  {
    where: {
      created_at: {
        gte: moment().startOf('day').toDate()
      }
    }
  }
)

export { getAllSongs, getTodaySongs };