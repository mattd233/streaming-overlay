import { deleteAllSuperchats } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  deleteAllSuperchats();
  return;
})