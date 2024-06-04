# DevInfo

A system/browser info page used by developers to check browser specifics

[![Image Size](https://img.shields.io/docker/image-size/glenndehaan/devinfo)](https://hub.docker.com/r/glenndehaan/devinfo)

## Structure
* Express.JS
* EJS
* CSS
* JS Logger
* Express User Agent
* Check IP

## Development Usage
- Install NodeJS 20.0 or higher
- Run `npm install` in the root project folder
- Run `npm run dev` in the root project folder

Then open up a webbrowser and go to: `http://localhost:3000`

## Docker

- Code from master is build by Docker Hub
- Builds can be pulled by using this command: `docker pull glenndehaan/devinfo`
- An example docker compose file can be found below:

```yaml
version: '3'
services:
  app:
    image: glenndehaan/devinfo
    ports:
      - "3000:3000"
    environment:
      # Sets the application Log Level (Valid Options: error|warn|info|debug|trace)
      LOG_LEVEL: 'info'
```

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

## License

MIT
