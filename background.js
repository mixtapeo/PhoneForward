// Create a context menu item for highlighted text
browser.contextMenus.create({
    id: "send-phone-number",
    title: "Send Phone Number",
    contexts: ["selection"]
  });
  
  // Add a click event listener for the context menu item
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "send-phone-number") {
      let selectedText = info.selectionText;
      sendPhoneNumber(selectedText);
    }
  });
  
  // Function to send the phone number to the Android device
  function sendPhoneNumber(phoneNumber) {
    fetch('192.168.2.31:8080', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: phoneNumber })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  }
  