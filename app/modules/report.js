/**
 * Import vendor modules
 */
const fs = require('fs');

/**
 * Define save location
 *
 * @type {string}
 */
const location = `${__dirname}/../config/reports`;

class report {
    /**
     * Saves a report to disk
     *
     * @param uuid
     * @param data
     */
    save(uuid, data) {
        const saveData = {
            uuid,
            created: new Date().getTime(),
            ...data
        };

        fs.writeFileSync(`${location}/${uuid}.json`, JSON.stringify(saveData));
    }

    /**
     * Load a report from disk
     *
     * @param uuid
     * @return {boolean|any}
     */
    load(uuid) {
        if(fs.existsSync(`${location}/${uuid}.json`)) {
            return JSON.parse(fs.readFileSync(`${location}/${uuid}.json`));
        } else {
            return false;
        }
    }
}

/**
 * Exports the report module
 * @type {report}
 */
module.exports = new report();
