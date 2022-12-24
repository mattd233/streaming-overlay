import { getAllSongs } from '../../db/playlist';

export default defineEventHandler(async (_event) => {
  return await getAllSongs();
});
