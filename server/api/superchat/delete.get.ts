import { deleteAllSuperchats } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  try {
    await deleteAllSuperchats();
    return 'success';
  } catch (error) {
    return 'failed';
  }
})