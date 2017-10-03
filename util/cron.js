import cron from 'node-cron'

const EVERY_MONDAY_NOON = '0 12 * * 1'
const EVERY_FRIDAY_END = '0 17 * * 5'

const mondayNoonJob = (job) => {
  cron.schedule(EVERY_MONDAY_NOON, job())
}

const friday5PMCronJob = (job) => {
  cron.schedule(EVERY_FRIDAY_END, job())
}

export {
  mondayNoonJob,
  friday5PMCronJob
}
