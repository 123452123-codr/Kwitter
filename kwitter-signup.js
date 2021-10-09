var firebaseConfig = {
    apiKey: "AIzaSyAxrFX-ytpCE57rLMn-T3Nh3j6Y0GGou8c",
    authDomain: "pro-kwitter.firebaseapp.com",
    databaseURL: "https://pro-kwitter-default-rtdb.firebaseio.com",
    projectId: "pro-kwitter",
    storageBucket: "pro-kwitter.appspot.com",
    messagingSenderId: "334075946539",
    appId: "1:334075946539:web:cba484fc08dfa342a62c6e"
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