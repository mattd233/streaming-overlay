import { expireSuperchat } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  const data = expireSuperchat(event.context.params.id);
  return data;
})