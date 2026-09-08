const https = require('https');

exports.handler = async function(event) {
  const question = JSON.parse(event.body).question;
  const apiKey = process.env.GROQ_API_KEY;
  
  const requestBody = JSON.stringify({
    model: 'llama-3.1-8b-instant',
    max_tokens: 500,
    messages: [
      {role: 'system', content: 'You are an earthquake safety assistant. Only answer questions about earthquake safety. Keep answers short and practical.'},
      {role: 'user', content: question}
    ]
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const parsed = JSON.parse(data);
        resolve({
          statusCode: 200,
          headers: {'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify({answer: parsed.choices[0].message.content})
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        statusCode: 500,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({answer: 'Error: ' + error.message})
      });
    });

    req.write(requestBody);
    req.end();
  });
};
