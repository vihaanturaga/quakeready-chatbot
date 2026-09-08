exports.handler = async function(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: ''
    };
  }

  try {
    const body = JSON.parse(event.body);
    const question = body.question;
    const apiKey = process.env.GROQ_API_KEY;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 500,
        messages: [
          {role: 'system', content: 'You are an earthquake safety assistant. Only answer questions about earthquake safety. Keep answers short and practical.'},
          {role: 'user', content: question}
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({answer: answer})
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({answer: 'Error: ' + error.message})
    };
  }
};
