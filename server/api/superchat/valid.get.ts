import { getValidSuperchats } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  return getValidSuperchats();
})