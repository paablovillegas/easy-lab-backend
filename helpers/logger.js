const winston = require('winston');
require('winston-daily-rotate-file');

const myformat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transport = new winston.transports.DailyRotateFile({
    filename: 'backend.%DATE%',
    dirname: 'logs',
    extension: '.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: 5,
});

const logger = winston.createLogger({
    format: myformat,
    transports: [
        transport,
    ],
});

module.exports = logger;