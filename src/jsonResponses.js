const url = require('url');



function responseBuilder(request, response, message, statCode, id = '', head) {
  const headers = { 'Content-Type': 'application/json' };
  response.writeHead(statCode, headers);
  if (head) {
    let stringed;
    if (id) {
      stringed = JSON.stringify({ message, id });
    } else {
      stringed = JSON.stringify({ message });
    }
    response.write(stringed);
  }
  response.end();
}

function getQueryParams(request) {
  return url.parse(request.url, true).query;
}

function notFound(request, response, head = false) {
  responseBuilder(request, response, 'The requested data could not be found.', 404, 'notFound', head);
}

function getUsers(request, response, head = false) {
  responseBuilder(request, response, 'The requested data could not be found.', 404, 'notFound', head);
}

function addUser(request, response, head = false) {
  const qParams = getQueryParams(request);
  

}


module.exports = {
  notFound,
  getUsers,
  addUser,
};
