import { getAllSongs } from '../../db/playlist';

export default defineEventHandler(async(event) => {
  return getAllSongs();
})