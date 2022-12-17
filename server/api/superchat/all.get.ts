import { getAllSuperchats } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  const data = getAllSuperchats();
  return data;
})