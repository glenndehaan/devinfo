# DevInfo

A system/browser info page used by developers to check browser specifics

[![Snap Status](https://build.snapcraft.io/badge/glenndehaan/devinfo.svg)](https://build.snapcraft.io/user/glenndehaan/devinfo) [![devinfo](https://snapcraft.io//devinfo/badge.svg)](https://snapcraft.io/devinfo)

## Structure
* Express.JS
* EJS
* CSS
* Simple Node Logger
* Express User Agent
* Check IP

## Basic Usage
### Snapcraft
#### Install
- Install the app via snapd:

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-white.svg)](https://snapcraft.io/devinfo)

- Open up a browser and go to http://127.0.0.1:4289

#### Config
The default snap config can be found here:
```
/var/snap/devinfo/common/config.json
```

#### Log
The log can be found here:
```
/var/snap/devinfo/common/server.log
```

Additional snap logs can be accessed by running this command:
```
sudo journalctl -fu snap.devinfo.devinfo-server
```

#### Service
Snap installs a service by default. To get the status of the app run this command:
```
service snap.devinfo.devinfo-server status
```

To restart the app:
```
service snap.devinfo.devinfo-server restart
```

### Docker

## Development Usage
- Install NodeJS 8.0 or higher
- Run `npm install` in the root project folder
- Run `npm run dev` in the root project folder

Then open up a webbrowser and go to: `http://localhost:4289`

## License

MIT
