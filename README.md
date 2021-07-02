# DevInfo

A system/browser info page used by developers to check browser specifics

[![Snap Status](https://build.snapcraft.io/badge/glenndehaan/devinfo.svg)](https://build.snapcraft.io/user/glenndehaan/devinfo) [![devinfo](https://snapcraft.io//devinfo/badge.svg)](https://snapcraft.io/devinfo) [![Build Status](https://img.shields.io/docker/cloud/build/glenndehaan/devinfo.svg)](https://hub.docker.com/r/glenndehaan/devinfo) [![Build Status](https://img.shields.io/docker/cloud/automated/glenndehaan/devinfo.svg)](https://hub.docker.com/r/glenndehaan/devinfo)

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
The config can be found here:
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
- Download the `docker-compose.yml` file from the repo
- Place the file on your server
- Run `docker-compose up`
- Open up a browser and go to http://127.0.0.1:4289

#### Config
The config can be found here:
```
./devinfo_docker_config/config.json
```

#### Log
The log can be found here:
```
./devinfo_docker_config/server.log
```

## Development Usage
- Install NodeJS 8.0 or higher
- Run `npm install` in the root project folder
- Run `npm run dev` in the root project folder

Then open up a webbrowser and go to: `http://localhost:4289`

## Reports
After a report has been generated the url should look something like this:
```
https://devinfo.example.com/report/76468dd1-e20c-4085-831b-672489ca886a
```

### Integrations / Raw data
Every report is also available in a JSON format. Just add `/raw` to the end of a report URL:
```
https://devinfo.example.com/report/76468dd1-e20c-4085-831b-672489ca886a/raw
```

> This data could also be integrated into other applications that might need it

## Customization
### Logo
By updating the config you are able to override the default logo:
```json
{
  "logo": "<img src='data:image/png;base64,........'/>"
}
```

### Footer
By updating the config you are able to override the default footer:
```json
{
  "footer": "Hello World!"
}
```

## License

MIT
