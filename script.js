window.addEventListener('message', function(event) {
  var question = event.data;
  if (!question || question === '') return;
  
  fetch('https://quakeready-chatbot.netlify.app/.netlify/functions/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({question: question})
  })
  .then(function(response) { return response.json(); })
  .then(function(data) {
    window.parent.postMessage(data.answer, '*');
  })
  .catch(function(error) {
    window.parent.postMessage('Connection error: ' + error.message, '*');
  });
});
