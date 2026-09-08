exports.handler = async function(event) {
  const question = JSON.parse(event.body).question;
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
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({answer: data.choices[0].message.content})
  };
};
