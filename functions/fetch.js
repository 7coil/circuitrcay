const fetch = require('node-fetch');

event.handler = (event, context, callback) => {
  // https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/core-concepts/2-dynamic-content/functions/using-path.js
  const path = event.path.replace(/\/\.netlify\/functions\/[^/]*/, '');
  const url = new URL(`https://phoneadmin.flashcashonline.com${path}`);

  Object.keys(event.queryStringParameters)
    .forEach(key => url.searchParams.append(key, params[key]));

  fetch(url, {
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