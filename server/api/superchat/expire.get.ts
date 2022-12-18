import { expireSuperchat } from '~~/server/db/superchat';

export default defineEventHandler(async(event) => {
  expireSuperchat(event.context.params.id);
})