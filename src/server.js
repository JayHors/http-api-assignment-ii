const http = require('http');
const url = require('url');
const fileHandler = require('./fileResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3500;

const urlHandles = {
  GET: {
    '/': fileHandler.getIndex,
    '/style.css': fileHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notFound,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/': fileHandler.getIndex,
    '/style.css': fileHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notFound,
    notFound: jsonHandler.notFound,
  },
  POST: {
    '/addUser': jsonHandler.addUser,
  },
};

function onRequest(request, response) {
  const parsedUrl = new url.URL(request.url, 'https://http-api-2-jayhors.herokuapp.com/');
  const { method } = request;
  if (urlHandles[method][parsedUrl.pathname]) {
    urlHandles[method][parsedUrl.pathname](request, response);
  } else {
    urlHandles.GET.notFound(request, response);
  }
}

http.createServer(onRequest).listen(port, () => { console.log(`Listening on localhost port ${port}`); });
