import cron from 'node-cron';
import fs from 'fs'
import path from 'path'

const logDirectory = path.join(__dirname, 'logs');

cron.schedule('0 0 * * 0', () => {
    fs.truncate(path.join(logDirectory, 'access.log'), 0, (err) => {
        if (err) {
            console.error('Failed to clear log file:', err);
        } else {
            console.log('Log file cleared');
        }
    });
});
