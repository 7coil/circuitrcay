const fetch = require('node-fetch');
const url = require('url');

exports.handler = (event, context, callback) => {
  // https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/core-concepts/2-dynamic-content/functions/using-path.js
  const path = event.path.replace(/\/\.netlify\/functions\/[^/]*/, '');
  const myURL = url.parse(`https://phoneadmin.flashcashonline.com${path}`);

  Object.keys(event.queryStringParameters)
    .forEach(key => myURL.searchParams.append(key, params[key]));

  fetch(myURL, {
    headers: event.headers,
    method: event.httpMethod
  })
    .then((res) => {
      res.json()
        .then((data) => {
          callback(null, {
            statusCode: res,
            body: JSON.stringify(data, null, 2),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        });
    });
};
