import http from "node:http";

// GET => Busca um recurso do backend
// POST => Cria um novo recurso no backend
// PUT => Atualiza um recurso existente no backend
// DELETE => Remove um recurso do backend
// PATCH => Atualiza parcialmente um recurso existente no backend
// HEAD => Obtém os cabeçalhos de resposta sem o corpo
// OPTIONS => Obtém os métodos HTTP suportados pelo recurso
// TRACE => Realiza um loop de retorno para teste de diagnóstico
// CONNECT => Estabelece um túnel para um servidor remoto
// HTTP/1.1 => Protocolo de comunicação entre cliente e servidor
// HTTP/2 => Versão mais recente do protocolo HTTP, com melhorias de desempenho
// HTTP/3 => Protocolo mais recente, baseado em QUIC, com melhorias de latência e segurança
// WebSocket => Protocolo de comunicação bidirecional sobre HTTP, usado para aplicações em tempo real
// REST => Arquitetura de software para sistemas distribuídos, baseada em recursos e métodos HTTP
// GraphQL => Linguagem de consulta para APIs, permite solicitar exatamente os dados necessários
// JSON => Formato de intercâmbio de dados leve e fácil de ler, usado em APIs
// XML => Formato de intercâmbio de dados mais complexo, usado em APIs mais antigas
// API => Interface de Programação de Aplicações, permite a comunicação entre sistemas diferentes

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`Received ${method} request for ${url}`);


  if(method === "GET" && url === "/users") {
    res
    .setHeader("Content-Type", "application/json")
    .statusCode(200)
    .end(JSON.stringify(users));
    return;
  }

  if(method === "POST" && url === "/users") {
    res.writeHead(201, { "Content-Type": "application/json" });
    const user = {
      id: users.length + 1,
      name: `User ${users.length + 1}`,
    };
    users.push(user)
    res.end("Criação de usuários\n");
    return;
  }

});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/");
});
