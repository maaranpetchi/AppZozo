declare module 'crypto-browserify' {
    const createSign: (algorithm: string) => {
      update: (data: string | Buffer) => void;
      sign: (privateKey: string, outputFormat?: 'hex' | 'base64') => string;
      end: () => void;
    };
    export { createSign };
  }
  