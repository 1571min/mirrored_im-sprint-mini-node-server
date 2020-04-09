/* 
  README.md 파일을 꼭 읽으시길 바랍니다. 모든 basic requirements가 정리되어 있습니다.  
  HINT : 
    request 의 method 와 url을 활용하여 클라이언트의 요청을 분기 할 수 있어야 합니다.
    잘못된 요청은 잘못된 요청이라는 응답을 주어야 합니다.
  */
// Readable streams emit 'data' events once a listener is added.
const http = require('http');

const PORT = 5000;

const ip = 'localhost';

const server = http.createServer((request, response) => {
  let headers = defaultCorsHeader;
  if (request.method === 'OPTIONS') {
    console.log('this is options');
    response.writeHead(200, headers);
    response.end();
  } else if (request.method === 'POST') {
    console.log('this is post');
    let body = '';
    response.writeHead(200, headers);
    request.on('data', (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
      if (request.url === '/upper') {
        response.end(body.toUpperCase());
      } else if (request.url === '/lower') {
        response.end(body.toLowerCase());
      } else {
        response.end(body);
      }
    });
    console.log(
      `http request method is ${request.method}, url is ${request.url}`
    );
  }
});

server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
};
