/**
 * Import own modules
 */
const checkIp = require('check-ip');

/**
 * Page Base Config
 */
const baseConfig = {
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
    uuid: undefined,
    js: true,
    report: undefined
}

/**
 * Returns the complete config base + page specific
 *
 * @param request
 * @param pageSpecificConfig
 */
module.exports = (request, pageSpecificConfig) => {
    baseConfig.hostname = request.get('host');
    baseConfig.protocol = request.protocol;
    baseConfig.baseUrl = `${request.protocol}://${request.get('host')}/`;
    baseConfig.appName = 'DevInfo';
    baseConfig.logo = '<svg xmlns="http://www.w3.org/2000/svg" height="120" width="120" viewBox="0 0 24 24"><path fill="white" d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>';
    baseConfig.footer = 'For more information please check: <a href="https://github.com/glenndehaan/devinfo" target="_blank" rel="noopener noreferrer">https://github.com/glenndehaan/devinfo</a>';

    baseConfig.user.agent = request.useragent;
    baseConfig.user.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    const ipData = checkIp(baseConfig.user.ip);
    baseConfig.user.ip = {
        source: ip,
        data: ipData
    };

    baseConfig.uuid = undefined;
    baseConfig.report = undefined;
    baseConfig.js = true;

    return Object.assign(baseConfig, pageSpecificConfig);
};
