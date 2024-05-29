var firebaseConfig = {
  apiKey: "AIzaSyDYJTo8x0dFPPimDFdTuiXrHBzXgicTBBs",
  authDomain: "kwitter-cv.firebaseapp.com",
  databaseURL: "https://kwitter-cv-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kwitter-cv",
  storageBucket: "kwitter-cv.appspot.com",
  messagingSenderId: "168427652728",
  appId: "1:168427652728:web:240282f8b7b955d7e24f8d",
  measurementId: "G-WVSELDRT19"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById("user_name").value = "";
document.getElementById("email").value = "";
document.getElementById("password").value = "";

function add_user() {
    var user_name = document.getElementById("user_name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      localStorage.setItem("Kwitter Website User Name", user_name);
      window.location.replace("kwitter_room.html");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode);
      alert(errorMessage);
    });
}