/**
 * Import base packages
 */
const fs = require('fs');
const config = require("../config");

/**
 * Check if we are using the production version
 */
const snapcraft = process.env.NODE_ENV === 'snapcraft';
const docker = process.env.NODE_ENV === 'docker';

/**
 * Create log dir if it doesn't exists
 */
if(!snapcraft && !docker) {
    if (!fs.existsSync(`${__dirname}/../${config.logger.location}`)){
        fs.mkdirSync(`${__dirname}/../${config.logger.location}`);
    }
}

/**
 * Setup logger
 */
let logFilePath = '';
if(snapcraft) {
    logFilePath = `${process.env.SNAP_COMMON}/server.log`;
} else if(docker) {
    logFilePath = `/var/app/server.log`;
} else {
    logFilePath = `${__dirname}/../${config.logger.location}/server.log`;
}

const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: logFilePath,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

/**
 * Set log level from config
 */
log.setLevel(config.logger.level);

/**
 * Export the logger
 */
module.exports = log;
