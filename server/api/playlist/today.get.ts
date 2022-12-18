import { getTodaySongs } from '../../db/playlist';

export default defineEventHandler(async(event) => {
  return getTodaySongs();
})