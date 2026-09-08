window.addEventListener('message', function(event) {
  var question = event.data;
  var apiKey = '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';
  fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {role: 'system', content: 'You are an earthquake safety assistant. Only answer questions about earthquake safety, preparedness, evacuation, and emergency supplies. Keep answers short and practical. If someone asks something not related to earthquakes, politely redirect them.'},
        {role: 'user', content: question}
      ]
    })
  })
  .then(response => response.json())
  .then(data => {
    var answer = data.choices[0].message.content;
    window.parent.postMessage(answer, '*');
  })
  .catch(error => {
    window.parent.postMessage('Sorry I could not connect. Please check your internet connection.', '*');
  })
});
