window.addEventListener('message', function(event) {
  var question = event.data;
  if (!question || question === '') return;
  var apiKey = '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';
  fetch('https://api.groq.com/openai/v1/chat/completions', {
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
        {role: 'user', content: String(question)}
      ]
    })
  })
  .then(function(response) { return response.json(); })
  .then(function(data) {
    if (data.choices && data.choices[0]) {
      window.parent.postMessage(data.choices[0].message.content, '*');
    } else {
      window.parent.postMessage('Error: ' + JSON.stringify(data), '*');
    }
  })
  .catch(function(error) {
    window.parent.postMessage('Connection error: ' + error.message, '*');
  });
});
