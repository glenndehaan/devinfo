/**
 * Import base packages
 */
const express = require('express');
const app = express();
const compression = require('compression');

/**
 * Import own packages
 */
const log = require('./logger');
const config = require('../config');
const indexController = require('../controllers/IndexController');
const useragent = require('express-useragent');

class web {
    /**
     * Init the express app
     */
    init() {
        /**
         * Trust proxy
         */
        app.enable('trust proxy');

        /**
         * Set template engine
         */
        app.set('view engine', 'ejs');
        app.set('views', `${__dirname}/../views`);

        /**
         * Enable compression
         */
        app.use(compression({ threshold: 0 }));

        /**
         * Include static dir
         */
        app.use(express.static(`${__dirname}/../static`));

        /**
         * Load express user-agent
         */
        app.use(useragent.express());

        /**
         * Include form data
         */
        app.use(express.urlencoded({
            extended: true
        }));

        /**
         * Request logger
         */
        app.use((req, res, next) => {
            log.trace(`[WEB][REQUEST]: ${req.originalUrl}`);
            next();
        });

        /**
         * Configure routers
         */
        app.get('/', (req, res) => {
            indexController.indexAction(req, res);
        });
        app.post('/', (req, res) => {
            indexController.saveAction(req, res);
        });

        /**
         * Setup default 404 message
         */
        app.use((req, res) => {
            res.status(404);
            indexController.notFoundAction(req, res);
        });

        /**
         * Disable powered by header for security reasons
         */
        app.disable('x-powered-by');

        /**
         * Start listening on port
         */
        app.listen(config.application.port, config.application.host, () => {
            log.info(`[WEB] App is running on: ${config.application.host}:${config.application.port}`);
        });
    }
}

module.exports = new web();
