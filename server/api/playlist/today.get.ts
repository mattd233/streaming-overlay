import { getTodaySongs } from '../../db/playlist';

export default defineEventHandler(async(event) => {
  const data = getTodaySongs();
  return data;
})