import moment from 'moment';
import { prisma } from '.';

const getAllSongs = async () => {
  return await prisma.song.findMany();
};

const getTodaySongs = async () => {
  return await prisma.song.findMany({
    where: {
      created_at: {
        gte: moment().startOf('day').toDate()
      }
    }
  });
};

export { getAllSongs, getTodaySongs };
