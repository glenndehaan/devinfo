/**
 * Import vendor modules
 */
const { v4: uuidv4 } = require('uuid');

/**
 * Import own modules
 */
const baseController = require('./BaseController');
const report = require('../modules/report');

class IndexController extends baseController {
    /**
     * Renders the Home page
     *
     * @param req
     * @param res
     */
    indexAction(req, res) {
        if(typeof req.query.uuid !== "undefined") {
            res.render('index', this.mergePageConfig(req, {
                template: 'index/index',
                pageTitle: 'Home',
                uuid: req.query.uuid
            }));
        } else {
            res.render('index', this.mergePageConfig(req, {
                template: 'index/index',
                pageTitle: 'Home'
            }));
        }
    }

    /**
     * Redirects to the home page and saves the data to disk
     *
     * @param req
     * @param res
     */
    saveAction(req, res) {
        let uuid = false;

        if(typeof req.body.agent_os !== "undefined") {
            uuid = uuidv4();
            report.save(uuid, req.body);
        }

        res.redirect(`/?uuid=${uuid}`);
    }

    /**
     * Renders the 404 page
     *
     * @param req
     * @param res
     */
    notFoundAction(req, res) {
        res.render('index', this.mergePageConfig(req, {
            template: 'general/notfound',
            pageTitle: 'Not Found'
        }));
    }
}

module.exports = new IndexController();
