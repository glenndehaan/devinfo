/**
 * Import base packages
 */
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const useragent = require('express-useragent');

/**
 * Import own modules
 */
const log = require('./modules/log');
const report = require('./modules/report');

/**
 * Import own utils
 */
const pageConfig = require('./utils/pageConfig');

/**
 * Trust proxy
 */
app.enable('trust proxy');

/**
 * Set template engine
 */
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

/**
 * GET /_health - Health check page
 */
app.get('/_health', (req, res) => {
    res.json({
        status: 'UP',
        host: os.hostname(),
        load: process.cpuUsage(),
        mem: process.memoryUsage(),
        uptime: process.uptime()
    });
});

/**
 * Include static dir
 */
app.use(express.static(`${__dirname}/public`));

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
    log.info(`[WEB][REQUEST]: ${req.originalUrl}`);
    next();
});

/**
 * Configure routers
 */
app.get('/', (req, res) => {
    if(req.query.uuid) {
        res.render('index', pageConfig(req, {
            template: 'index/index',
            pageTitle: 'Home',
            uuid: req.query.uuid
        }));
    } else {
        res.render('index', pageConfig(req, {
            template: 'index/index',
            pageTitle: 'Home'
        }));
    }
});
app.post('/', (req, res) => {
    let uuid = false;

    if(typeof req.body.agent_os !== "undefined") {
        uuid = uuidv4();
        report.save(uuid, req.body);
    }

    res.redirect(`/?uuid=${uuid}`);
});
app.get('/report/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    const reportData = report.load(uuid);

    if(reportData) {
        res.render('index', pageConfig(req, {
            template: 'index/index',
            pageTitle: 'Report',
            js: false,
            report: reportData
        }));
    } else {
        res.render('index', pageConfig(req, {
            template: 'general/notfound',
            pageTitle: 'Not Found',
            js: false
        }));
    }
});
app.get('/report/:uuid/raw', (req, res) => {
    const uuid = req.params.uuid;
    const reportData = report.load(uuid);
    res.json(reportData);
});

/**
 * Setup default 404 message
 */
app.use((req, res) => {
    res.status(404);
    res.send('Not Found!');
});

/**
 * Disable powered by header for security reasons
 */
app.disable('x-powered-by');

/**
 * Start listening on port
 */
app.listen(3000, '0.0.0.0', () => {
    log.info(`[WEB] App is running on: 0.0.0.0:3000`);
    log.info("[SYSTEM] App running");
    log.info(`[SYSTEM] Support and Help: https://github.com/glenndehaan/devinfo`);
});
