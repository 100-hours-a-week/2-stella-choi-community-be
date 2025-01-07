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
        //* LOGGER.info
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            filename: path.join(`${logDir}/log`, `%DATE%.log`),
            zippedArchive: true, // 로그 삭제되기 전 압축되어 저장  //! cron/yml 통해 압축
            handleExceptions: true,
            maxFiles: '7d', // 하루가 지나면 로그파일이 새로 생성되고 이전 파일은 삭제됨
        }),

        //* LOGGER.error
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            filename: path.join(`${logDir}/error`, `%DATE%.error.log`),
            zippedArchive: true,
            maxFiles: '7d',
        }),

        new winstonDaily({
            level: 'http',
            datePattern: 'YYYY-MM-DD',
            filename: path.join(`${logDir}/http`, `%DATE%.http.log`),
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
            filename: path.join(`${logDir}/error`, `%DATE%.exception.log`),
            zippedArchive: true,
            maxFiles: '7d',
        }),
    ],
});

module.exports = LOGGER;
