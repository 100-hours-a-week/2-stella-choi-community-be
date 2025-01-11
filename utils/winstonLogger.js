const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const path = require('path');
const moment = require('moment-timezone');

const logDir = 'config/logs';

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

const appendTimestamp = winston.format((info, opts) => {
    if (opts.tz)
        info.timestamp = moment().tz(opts.tz).format(' YYYY-MM-DD HH:mm:ss ||');
    return info;
});

const format = winston.format.combine(
    appendTimestamp({ tz: 'Asia/Seoul' }),
    winston.format.printf(
        info =>
            `${info.timestamp}   [  ${info.level}  ]  ▶  ${info.message}  `,
    ),
);

const LOGGER = winston.createLogger({
    format,
    transports: [
        //* LOGGER.error
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            filename: path.join(`${logDir}/error`, `%DATE%.error.log`),
            zippedArchive: true,
            maxFiles: '7d',
        }),

        new winston.transports.Console({
            format: winston.format.colorize({ all: true }),
            handleExceptions: true,
        }),
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            filename: path.join(`${logDir}/exception`, `%DATE%.exception.log`),
            zippedArchive: true,
            maxFiles: '7d',
        }),
    ],
});

module.exports = LOGGER;
