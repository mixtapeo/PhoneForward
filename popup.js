document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get('phoneNumber', (data) => {
      document.getElementById('number').innerText = data.phoneNumber;
    });
  
    document.getElementById('sendButton').addEventListener('click', () => {
      browser.storage.local.get('phoneNumber', (data) => {
        fetch('http://your-android-device-ip:your-port/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber: data.phoneNumber })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
      });
    });
  });
