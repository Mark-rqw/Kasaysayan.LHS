// Initialize Firebase (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyDgl0J-ybrj04eKkmCcIW-kjaO9U_IvOd4",
    authDomain: "kasaysayan-a3cc5.firebaseapp.com",
    projectId: "kasaysayan-a3cc5",
    storageBucket: "kasaysayan-a3cc5.firebasestorage.app",
    messagingSenderId: "601208143349",
    appId: "1:601208143349:web:b106fdc1dced1e4824b4bc",
    measurementId: "G-YL6ME86E1V"
  };
  
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Request Notification Permission
function requestNotificationPermission() {
    Notification.requestPermission()
        .then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                getFCMToken();
            } else {
                console.log("Notification permission denied.");
            }
        });
}

// Get FCM Token
function getFCMToken() {
    messaging.getToken({ vapidKey: "BO2KHuS3C48Q5cD5Ov8pzg4YtnYfsJhtebO92cufVdJsO7PnOvok0RrPJGncUvB5ZYFKdinuLap_r855UD_cdYo" })
        .then((token) => {
            console.log("FCM Token:", token);
            // Send token to your server (optional)
        })
        .catch((err) => {
            console.error("Error getting FCM token:", err);
        });
}

// Handle Incoming Messages
messaging.onMessage((payload) => {
    console.log("Message received:", payload);
    alert(payload.notification.title + "\n" + payload.notification.body);
});

// Call this function on page load
requestNotificationPermission();
