const { createLogger, format, transports } = require('winston');
const rTracer = require('cls-rtracer');

module.exports = createLogger({
transports:[
    new transports.File({
    filename: 'logs/server.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${rTracer.id()}: ${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
    new transports.Console({
        format:format.combine(
            format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(info => `${rTracer.id()}: ${info.level}: ${[info.timestamp]}: ${info.message}`),
        )})
    ]
});