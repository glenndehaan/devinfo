/**
 * Import own modules
 */
const log = require("./modules/logger");
const web = require("./modules/web");

/**
 * Init modules
 */
web.init();

log.info("[SYSTEM] App running");
log.info(`[SYSTEM] Support and Help: https://github.com/glenndehaan/devinfo`);
