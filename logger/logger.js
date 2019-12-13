const { createLogger, format, transports } = require('winston');


module.exports = createLogger({
    format: format.combine(
        format.timestamp(),
        format.simple()

    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            timestamp: true,
            colorize: true,
            prettyPrint: true,
            maxFiles: 5,
            filename: './logs/log-api.log'
        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.simple()
            )
        })
    ]
});