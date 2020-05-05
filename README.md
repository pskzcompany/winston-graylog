# @pskzcompany/winston-graylog

[![npm](https://img.shields.io/npm/v/@pskzcompany/winston-graylog.svg)](https://www.npmjs.com/package/@pskzcompany/winston-graylog)
[![gitlab action](https://github.com/pskzcompany/winston-graylog/workflows/test%20&%20build/badge.svg)](https://github.com/pskzcompany/winston-graylog/actions)
[![Fully automated version management and package publishing](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A graylog GELF UDP transport for Winston 3
A [Graylog](https://www.graylog.org/) GELF UDP transport for [winston](https://github.com/winstonjs/winston) based on the [@pskzcompany/winston-graylog](https://github.com/pskzcompany/graylog) package.

## Installation

```bash
npm install winston @pskzcompany/winston-graylog
```

## Usage

```ts
import winston from 'winston';
import { WinstonGraylog } from '@pskzcompany/winston-graylog';

const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new WinstonGraylog({
      level: 'debug',
      graylog: 'gelf://10.0.0.1:12201',
      defaultMeta: {
        environment: 'production',
        release: '1.0.1',
      },
    }),
  ],
});

logger.info({ message: 'info message', facility: 'Node.js' });
// or
logger.info('info message', { facility: 'Node.js' });

logger.error({ message: new Error('Some error'), duration: 26 });
// or
logger.error(new Error('Some error'), { duration: 26 });
```

## Options

- **name**: Transport name
- **level**: Level of messages this transport should log. (default: info)
- **silent**: Boolean flag indicating whether to suppress output. (default: false)
- **handleExceptions**: Boolean flag, whenever to handle uncaught exceptions. (default: false)
- **exceptionsLevel**: Level of exceptions logs when handleExceptions is true. (default: error)
- **graylog**:
  - `gelf://10.0.0.1:12201,10.0.0.2:12201?hostname=host&facility=Node.js&bufferSize=1400&deflate=optimal` – as connection string
  - **- OR -**
  - **servers**: list of graylog2 servers
    - **host**: your server address (default: localhost)
    - **port**: your server port (default: 12201)
  - **hostname**: the name of this host (default: os.hostname())
  - **facility**: the facility for these log messages (default: "Node.js")
  - **bufferSize**: max UDP packet size, should never exceed the MTU of your system (default: 1400)
- **defaultMeta**: meta data to be always used by default for each logging message.

## Lisence

MIT
