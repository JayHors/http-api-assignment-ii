const http = require('http');
const url = require('url');
const fileHandler = require('./fileResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3500;

const urlHandles = {
    '/': fileHandler.getIndex,
    '/style.css': fileHandler.getCSS,
    '/getUsers': jsonHandler.success,
    '/notReal': jsonHandler.notFound,
    notFound: jsonHandler.notFound,
};

function onRequest(request, response) {
  const parsedUrl = new url.URL(request.url, 'https://http-api-1-jayhors.herokuapp.com/');
  const hasHead = (request.method === 'HEAD') ? true : false;
  if (urlHandles[parsedUrl.pathname]) {
    urlHandles[parsedUrl.pathname](request, response, hasHead);
  } else {
    urlHandles.notFound(request, response, hasHead);
  }
}

http.createServer(onRequest).listen(port, () => { console.log(`Listening on localhost port ${port}`); });
