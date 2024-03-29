const fetch = require('node-fetch');

exports.handler = (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization'
      }
    })
  }

  // https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/core-concepts/2-dynamic-content/functions/using-path.js
  const path = event.path.replace(/\/\.netlify\/functions\/[^/]*/, '');
  
  const qs = Object.keys(event.queryStringParameters)
    .map(key => `${key}=${encodeURIComponent(event.queryStringParameters[key])}`)
    .join('&')
  
  const myURL = `https://phoneadmin.flashcashonline.com${path}${qs.length ? `?${qs}` : ''}`

  fetch(myURL, {
    headers: event.headers,
    method: event.httpMethod
  })
    .then((res) => {
      res.json()
        .then((data) => {
          callback(null, {
            statusCode: res.status,
            body: JSON.stringify(data, null, 2),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        });
    });
};
