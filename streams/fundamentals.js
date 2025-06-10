import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  current = 1;
  constructor(options) {
    super(options);
    this.current = 1;
  }

  _read(size) {
    setTimeout(() => {
      const i = this.current++;
      if (i > 100) {
        this.push(null); // No more data
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer); // Push current number as a string
      }
    },1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * 10;
    console.log(`Number: ${number}, Multiplied by 10: ${result}`);
    callback();
  }
}

class NegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const inverse = -1 * number;
    const transformad = Buffer.from(String(inverse))
    callback(null, transformad);
  }
}
new OneToHundredStream().pipe(new NegativeNumberStream()).pipe(new MultiplyByTenStream());
