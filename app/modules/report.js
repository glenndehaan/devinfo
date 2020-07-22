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

    load() {

    }
}

/**
 * Exports the report module
 * @type {report}
 */
module.exports = new report();
