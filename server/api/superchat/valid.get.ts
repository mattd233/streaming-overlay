import { getValidSuperchats } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  const data = getValidSuperchats();
  return data;
})