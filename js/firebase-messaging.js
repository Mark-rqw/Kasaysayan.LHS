// js/firebase-messaging.js
const messaging = firebase.messaging();

// Request permission for push notifications
function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken();
    } else {
      console.error("Permission denied for notifications.");
    }
  });
}

// Get FCM Token
function getToken() {
  messaging.getToken({ vapidKey: "BO2KHuS3C48Q5cD5Ov8pzg4YtnYfsJhtebO92cufVdJsO7PnOvok0RrPJGncUvB5ZYFKdinuLap_r855UD_cdYo" }).then((token) => {
    console.log("FCM Token:", token);
    sendTokenToServer(token); // Store token in database
  }).catch((error) => {
    console.error("Error getting token:", error);
  });
}

// Send the token to your server (to store in the database)
function sendTokenToServer(token) {
  fetch("php/saveToken.php", {
    method: "POST",
    body: JSON.stringify({ token: token }),
    headers: { "Content-Type": "application/json" },
  });
}

// Listen for incoming messages
messaging.onMessage((payload) => {
  console.log("Message received:", payload);
  showNotification(payload.notification);
});

// Display notification
function showNotification(notification) {
  new Notification(notification.title, {
    body: notification.body,
    icon: "assets/Kasaysayan_logo.png"
  });
}

// Request permission when the page loads
window.onload = requestPermission;

