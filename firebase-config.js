// 💙 SIMRK 2026 - Blue Configuration
// Firebase: mokf-5aef3 | Cloudinary: dwexoyjtv
// ✨ PREMIUM: Notifications + Compact Grid + Delete Videos

const firebaseConfig = {
    apiKey: "AIzaSyAcWv_einTTguNKtRpDJ-tTKy6Y5n3eqlc",
    authDomain: "mokf-5aef3.firebaseapp.com",
    databaseURL: "https://mokf-5aef3-default-rtdb.firebaseio.com",
    projectId: "mokf-5aef3",
    storageBucket: "mokf-5aef3.firebasestorage.app",
    messagingSenderId: "321526498785",
    appId: "1:321526498785:web:d51500582f83201c18bea0",
    measurementId: "G-NGRL5JZL0Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Cloudinary Configuration
const CLOUD_NAME = "dwexoyjtv";
const UPLOAD_PRESET = "go_3gn";

// 💙 SIMRK Settings
const ADMIN_EMAILS = ['jasim28v@gmail.com'];
const DICEBEAR_URL = "https://api.dicebear.com/7.x/big-smile/svg";
const COVER_COLORS = [
    "linear-gradient(135deg, #0f172a, #1e3a5f, #1e40af)",
    "linear-gradient(135deg, #020617, #0f172a, #1e3a5f)",
    "linear-gradient(135deg, #172554, #1e40af, #3b82f6)",
    "linear-gradient(135deg, #1e3a5f, #3b82f6, #06b6d4)",
    "linear-gradient(135deg, #0c4a6e, #0891b2, #06b6d4)",
    "linear-gradient(135deg, #0a0a1a, #0f172a, #1e40af)"
];

// 💙 App Info
const APP_NAME = "SIMRK";
const APP_VERSION = "2026.1";
const PRIMARY_COLOR = "#3b82f6";
const SECONDARY_COLOR = "#06b6d4";

console.log('💙 %c'+APP_NAME+' v'+APP_VERSION+' Ready ✨', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
