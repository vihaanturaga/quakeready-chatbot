var API_KEY = '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';

window.addEventListener('message', function(event) {
  var question = event.data;
  if (!question || question === '') return;

  fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://vihaanturaga.github.io',
      'X-Title': 'QuakeReady'
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      max_tokens: 300,
      messages: [
        { role: 'system', content: 'You are QuakeReady, an earthquake safety assistant. Answer in 2-3 sentences, keep it practical.' },
        { role: 'user', content: question }
      ]
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.choices && data.choices[0]) {
      window.parent.postMessage(data.choices[0].message.content, '*');
    } else {
      window.parent.postMessage('Debug: ' + JSON.stringify(data), '*');
    }
  })
  .catch(function(err) {
    window.parent.postMessage('Error: ' + err.message, '*');
  });
});
