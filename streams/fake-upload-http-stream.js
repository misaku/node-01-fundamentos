import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  current = 1;
  constructor(options) {
    super(options);
    this.current = 1;
  }

  _read(size) {
    setTimeout(() => {
      const i = this.current++;
      console.log(`Pushing number: ${i}`);
      if (i > 100) {
        this.push(null); // No more data
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer); // Push current number as a string
      }
    },1000);
  }
}

fetch("http://localhost:3000", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half"
})
