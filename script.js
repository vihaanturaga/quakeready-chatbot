window.addEventListener('message', function(event) {
  var question = event.data;
  if (!question || question === '') return;

  fetch('https://fancy-lab-232f.vihaan-turaga.workers.dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: question })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    window.parent.postMessage(data.answer, '*');
  })
  .catch(function(err) {
    window.parent.postMessage('Error: ' + err.message, '*');
  });
});
  .catch(function(err) {
    window.parent.postMessage('Error: ' + err.message, '*');
  });
});
