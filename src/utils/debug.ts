const DEBUG_PREFIX = '[APP DEBUG] : ';
const DEBUG_PREFIX_SUCCESS = '[APP DEBUG] SUCCESS : ';
const DEBUG_PREFIX_ERROR = '[APP DEBUG] ERROR : ';

class Debug {
  private isDevelopment: boolean = __DEV__;
  private isProduction: boolean = !this.isDevelopment;
  private showIfDevelopment: string[] = ['info', 'success', 'error'];
  private showIfProduction: string[] = ['error'];

  private makeOrNot(method: string): boolean {
    if (this.isDevelopment) {
      return this.showIfDevelopment.includes(method);
    }

    if (this.isProduction) {
      return this.showIfProduction.includes(method);
    }

    return false;
  }

  info(...message: any[]): void {
    if (this.makeOrNot('info')) {
      console.log(
        `%c${new Date().toISOString()}`,
        'color: white',
        DEBUG_PREFIX,
        ...message,
      );
    }
  }

  success(...message: any[]): void {
    if (this.makeOrNot('success')) {
      console.info(
        `%c${new Date().toISOString()} %c${DEBUG_PREFIX_SUCCESS}`,
        'color: white',
        'color: green',
        ...message,
      );
    }
  }

  error(...message: any[]): void {
    if (this.makeOrNot('error')) {
      console.warn(
        `%c${new Date().toISOString()} %c${DEBUG_PREFIX_ERROR}`,
        'color: white',
        'color: red',
        ...message,
      );
    }
  }

  clear(): void {
    console.clear();
  }
}

const debug = new Debug();

export default debug;
