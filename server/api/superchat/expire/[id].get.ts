import { expireSuperchat } from '~~/server/db/superchat';

export default defineEventHandler(async (event) => {
  try {
    await expireSuperchat(event.context.params.id);
    return 'success';
  } catch (error) {
    return 'failed';
  }
});
