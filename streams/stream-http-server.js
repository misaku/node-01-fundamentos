import http from "node:http";
import { Transform } from "node:stream";
import { Buffer } from 'node:buffer';

class NegativeNumberStream extends Transform {

  _transform(chunk, encoding, callback) {
    const inverse = -1 * Number(chunk.toString());
    console.log({inverse})
    callback(null, Buffer.from(String(inverse)))
  }


}

const server = http.createServer((req, res) => {
  req.on("end", () => console.log("req end"));
  res.on("finish", () => console.log("res finish"));

  return req
    .pipe(new NegativeNumberStream()).pipe(res);

});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/");
});
