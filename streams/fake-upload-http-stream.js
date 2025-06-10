import { Readable } from "node:stream";
import { Buffer } from 'node:buffer';

class OneToHundredStream extends Readable {
  current = 1;
  isReading = false;

  _read(size) {
    if (this.isReading) return; // Já está lendo, ignore chamados extras
    this.isReading = true;

    setTimeout(() => {
      const i = this.current++;
      console.log(`Pushing number: ${i}`);
      if (i > 100) {
        this.push(null); // No more data
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer); // Push current number as a string
      }
      this.isReading = false;

    },1000);
  }
}

fetch("http://localhost:3000", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half"
}).then(async response => {
  // Aqui você consome a resposta do servidor!
  for await (const chunk of response.body) {
    console.log('[resposta do servidor]', chunk.toString());
  }
  console.log('Fim da resposta!');
});

