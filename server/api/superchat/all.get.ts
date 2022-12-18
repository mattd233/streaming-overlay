import { getAllSuperchats } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  return getAllSuperchats();
})