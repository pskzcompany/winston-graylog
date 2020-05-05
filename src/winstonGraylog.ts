import Transport, { TransportStreamOptions } from 'winston-transport';
import Graylog, { GraylogOptions, GraylogLevelEnum } from '@pskzcompany/graylog';

interface TransportOptions extends TransportStreamOptions {
  graylog: GraylogOptions;
  defaultMeta?: Record<string, any>;
}

/** Graylog Winston Transport */
export class WinstonGraylog extends Transport {
  graylog: Graylog;
  defaultMeta: Record<string, any>;

  constructor(options: TransportOptions) {
    super(options);
    this.silent = options.silent || false;
    this.handleExceptions = options.handleExceptions || false;
    this.graylog = new Graylog(options.graylog);
    this.defaultMeta = options.defaultMeta || {};
  }

  log(info: any, next: Function) {
    const { message, level, ...rest } = info;
    const metadata = { ...this.defaultMeta, ...rest };
    setImmediate(() => {
      this.graylog._log(message, metadata, this._convertLevel(level), true);
    });
    next();
  }

  close() {
    this.graylog.close();
  }

  _levels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    err: 3,
    error: 3,
    warning: 4,
    warn: 4,
    notice: 5,
    info: 6,
    debug: 7,
  };

  _convertLevel(level: string): GraylogLevelEnum {
    return this._levels[level] ?? this._levels.info;
  }
}
