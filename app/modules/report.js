/**
 * Import vendor modules
 */
const fs = require('fs');

/**
 * Check if we are using the production version
 */
const snapcraft = process.env.NODE_ENV === 'snapcraft';
const docker = process.env.NODE_ENV === 'docker';

/**
 * Define save location
 *
 * @type {string}
 */
let location = '';
if(snapcraft) {
    if (!fs.existsSync(`${process.env.SNAP_COMMON}/reports`)){
        fs.mkdirSync(`${process.env.SNAP_COMMON}/reports`);
    }
    location = `${process.env.SNAP_COMMON}/reports`;
} else if(docker) {
    //todo
} else {
    location = `${__dirname}/../config/reports`;
}

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
