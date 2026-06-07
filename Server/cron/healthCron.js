import cron from 'node-cron';
import axios from 'axios';

let isTaskRunning = false;

const URL = process.env.BASE_URL || 'http://localhost:5000';

const startHealthCron = () => {
  const port = process.env.PORT || 5000;
  const healthUrl = `${URL}/health`;

  // Avoid creating multiple cron jobs if already initialized (e.g. under hot-reloads)
  if (global.healthCronJob) {
    console.log('Health cron job is already scheduled.');
    return;
  }

  console.log(`Scheduling health cron job to request ${healthUrl} every 10 minutes.`);

  global.healthCronJob = cron.schedule('0 */10 * * * *', async () => {
    if (isTaskRunning) {
      console.log('Previous health check request is still in progress. Skipping.');
      return;
    }
    isTaskRunning = true;
    try {
      // console.log(`[Cron] Sending request to health check: ${healthUrl}`);
      const response = await axios.get(healthUrl);
      // console.log(`[Cron] Health check response: Status ${response.status}, Data:`, response.data);
    } catch (error) {
      console.error('[Cron] Error requesting health check API:', error.message);
    } finally {
      isTaskRunning = false;
    }
  });
};

export { startHealthCron };
