import cron from 'node-cron';
import { jobModel } from '../../infrastructure/database/mongo/model/jobModel';

export const cronSchedule = cron.schedule('0 0 * * *', async () => {

    try {
        const now = new Date();

        const result: any = await jobModel.updateMany(
            { endDate: { $lte: now } },
            { $set: { expired: true } }
        );

        console.log(`${result.modifiedCount} jobs have been marked as expired.`);
    } catch (error) {
        console.error('Error running job expiry check:', error);
    }
}, {
    scheduled: false,
    timezone: "UTC"
});


export const startCronJob = () => {
    cronSchedule.start();
};