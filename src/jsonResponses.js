const url = require('url');

const users = {};

function responseBuilder(request, response, message, statCode, head) {
  const headers = { 'Content-Type': 'application/json' };
  response.writeHead(statCode, headers);
  // if the request method is not head (or the response recieves a body), then write the body
  if (!head) {
    const stringed = JSON.stringify(message);
    response.write(stringed);
  }
  response.end();
}
function isHead(request) {
  return (request.method === 'HEAD');
}
function getQueryParams(request) {
  return url.parse(request.url, true).query;
}

function notFound(request, response) {
  const notFoundMsg = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };
  const head = isHead(request);
  responseBuilder(request, response, notFoundMsg, 404, head);
}

function getUsers(request, response) {
  const head = isHead(request);
  responseBuilder(request, response, users, 200, head);
}

function addUser(request, response) {
  let responseCode = 418;
  const qParams = getQueryParams(request);
  if (!qParams.name || !qParams.age) {
    responseBuilder(request, response, { id: 'addUserMissingParams', message: 'Requires both a name and age parameter' }, 400, false);
    return;
  }
  const { name } = qParams;
  responseCode = (users[name] ? 204 : 201);
  users[name] = qParams;
  const head = responseCode !== 201;
  responseBuilder(request, response, { message: 'Created Successfully' }, responseCode, head);
}

module.exports = {
  notFound,
  getUsers,
  addUser,
};
