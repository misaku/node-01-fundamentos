import http from "node:http";
import {  Transform } from "node:stream";

class NegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    console.log(`Received chunk: ${chunk.toString()}`);
    const number = Number(chunk.toString());
    const inverse = -1 * number;
    const transformad = Buffer.from(String(inverse))
    console.log(`Received number: ${number}, Inverse: ${inverse}`);
    callback(null, transformad);
  }
}

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`Received ${method} request for ${url}`);

  if (method === "POST" && url === "/") {
    console.log("entrou")
    return req
      .pipe(new NegativeNumberStream())
      .pipe(res)
      .on("finish", () => {
        console.log("Response sent successfully.");
      })
      .on("error", (err) => {
        console.error("Error in response stream:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      });

  }


});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/");
});
