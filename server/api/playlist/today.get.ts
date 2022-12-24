import { getTodaySongs } from '../../db/playlist';

export default defineEventHandler(async (_event) => {
  return await getTodaySongs();
});
