/**
 * Import base packages
 */
const fs = require('fs');
const deepmerge = require('deepmerge');

/**
 * Check if we are using the dev version
 */
const dev = process.env.NODE_ENV !== 'production';

/**
 * Declare base config
 */
const baseConfig = {
    application: {
        name: "DevInfo",
        env: dev ? "(local)" : "",
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
    module.exports = deepmerge(baseConfig, eval('require')(dev ? __dirname + '/config.json' : process.cwd() + '/config.json'));
} catch (e) {
    const config = fs.readFileSync(__dirname + '/../../_scripts/config/config.build.json', 'utf8');
    fs.writeFileSync(dev ? __dirname + '/config.json' : process.cwd() + '/config.json', config);

    module.exports = deepmerge(baseConfig, JSON.parse(config));
}
