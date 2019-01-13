import chalk from 'chalk';
import backupDbToFile from './backup.mjs';
import cron from './cron.mjs';

async function runCron() {
  const t0 = new Date();
  await backupDbToFile();
  const t1 = new Date();
  await cron();
  const t2 = new Date();

  console.info(`\nBackup time: ${chalk.red.bold(t1-t0)} ms`);
  console.info(`Cron time: ${chalk.red.bold(t2-t1)} ms\n`);
}

runCron();
