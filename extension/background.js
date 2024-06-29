// Create context menu item
browser.contextMenus.create({
  id: "send-phone-number",
  title: "Send Phone Number to Android",
  contexts: ["selection"]
});

// Add listener for context menu click
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "send-phone-number" && info.selectionText) {
    const selectedText = info.selectionText;
    const androidDeviceIp = "192.168.2.41"; // Replace with your Android device IP address
    const url = `http://${androidDeviceIp}:5000/send`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: selectedText })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Phone number sent successfully:", data);
    })
    .catch(error => {
      console.error("Error sending phone number:", error);
    });
  }
});
