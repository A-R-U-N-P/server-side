import moment from 'moment';

class Logger {
  public log(label: string, value?: unknown) {
    console.log(
      `\x1b[36m [${moment().format('MM ddd, YYYY hh:mm:ss a')}]`,
      `\x1b[33m ${label}${typeof value === 'object' ? '\n' : ''} `,
      '\x1b[0m',
      value || '',
    );
  }

  public error(label: string, value?: unknown) {
    console.log(
      `\x1b[36m [${moment().format('MM ddd, YYYY hh:mm:ss a')}]`,
      `\x1b[31m ${label}${typeof value === 'object' ? '\n' : ''} `,
      '\x1b[0m',
      value || '',
    );
  }

  public about(label: string) {
    console.log(
      '\x1b[36m',
      `\x1b[31m ${label}`,
      '\x1b[0m',
    );
  }
}

export const logger = new Logger();
