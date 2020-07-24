/**
 * Import base packages
 */
const fs = require('fs');
const deepmerge = require('deepmerge');

/**
 * Check if we are using the production version
 */
const snapcraft = process.env.NODE_ENV === 'snapcraft';
const docker = process.env.NODE_ENV === 'docker';

/**
 * Declare base config
 */
const baseConfig = {
    application: {
        name: "DevInfo",
        env: (!snapcraft && !docker) ? "(local)" : "",
        basePath: "/",
        host: "0.0.0.0",
        port: 4289
    },
    logger: {
        location: "./log",
        level: "info"
    },
    logo: '<svg xmlns="http://www.w3.org/2000/svg" height="120" width="120" viewBox="0 0 24 24"><path fill="white" d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>',
    footer: 'For more information please check: <a href="https://github.com/glenndehaan/devinfo" target="_blank" rel="noopener noreferrer">https://github.com/glenndehaan/devinfo</a>'
};

/**
 * Export the main config
 */
try {
    if(snapcraft) {
        module.exports = deepmerge(baseConfig, eval('require')(`${process.env.SNAP_COMMON}/config.json`));
    } else if(docker) {
        module.exports = deepmerge(baseConfig, eval('require')(`/var/app/config.json`));
    } else {
        module.exports = deepmerge(baseConfig, eval('require')(`${__dirname}/config.json`));
    }
} catch (e) {
    const config = fs.readFileSync(__dirname + '/../../_scripts/config/config.build.json', 'utf8');

    if(snapcraft) {
        fs.writeFileSync(`${process.env.SNAP_COMMON}/config.json`, config);
        module.exports = deepmerge(baseConfig, JSON.parse(config));
    } else if(docker) {
        fs.writeFileSync(`/var/app/config.json`, config);
        module.exports = deepmerge(baseConfig, JSON.parse(config));
    } else {
        fs.writeFileSync(`${__dirname}/config.json`, config);
        module.exports = deepmerge(baseConfig, JSON.parse(config));
    }
}
