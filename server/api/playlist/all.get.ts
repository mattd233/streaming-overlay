import { getAllSongs } from '../../db/playlist';

export default defineEventHandler(async(event) => {
  const data = getAllSongs();
  return data;
})