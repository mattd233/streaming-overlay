import { getAllSuperchats } from '~~/server/db/superchat';

export default defineEventHandler(async (_event) => {
  return await getAllSuperchats();
});
