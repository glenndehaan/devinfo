/**
 * Import own modules
 */
const config = require("../config");
const checkIp = require('check-ip');

class BaseController {
    constructor() {
        this.baseConfig = {
            config: config,
            protocol: '',
            hostname: '',
            baseUrl: '',
            appName: '',
            env: '',
            user: {
                agent: {},
                ip: {}
            },
            logo: '',
            footer: '',
            js: true
        }
    }

    /**
     * Returns the complete config base + page specific
     *
     * @param request
     * @param pageSpecificConfig
     */
    mergePageConfig(request, pageSpecificConfig) {
        this.baseConfig.hostname = request.get('host');
        this.baseConfig.protocol = request.protocol;
        this.baseConfig.baseUrl = `${request.protocol}://${request.get('host')}${config.application.basePath}`;
        this.baseConfig.appName = config.application.name;
        this.baseConfig.env = config.application.env;
        this.baseConfig.logo = config.logo;
        this.baseConfig.footer = config.footer;

        this.baseConfig.user.agent = request.useragent;
        this.baseConfig.user.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        const ipData = checkIp(this.baseConfig.user.ip);
        this.baseConfig.user.ip = {
            source: ip,
            data: ipData
        };

        return Object.assign(this.baseConfig, pageSpecificConfig);
    }
}

module.exports = BaseController;
