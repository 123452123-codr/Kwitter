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

var user_name = localStorage.getItem("Kwitter Website User Name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function add_room() {
      var room_key = document.getElementById("room_name").value;

      firebase.database().ref("kwitter/").child(room_key).update({
            purpose: "adding room key",
            status: "under development"
      });

      localStorage.setItem("Kwitter Room_Key", room_key);

      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("kwitter/").on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
                  Room_names = childKey;

                  console.log("Room names ", Room_names);

                  var row = "<div class='room_name' id=" + Room_names + " onclick='redirectTo(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
      });});
}

function redirectTo(name) {
      console.log(name);
      localStorage.setItem("Kwitter Room_Key", name);
      window.location = "kwitter_page.html";
}

getData();

function log_out() {
      firebase.auth().signOut().then(() => {
            localStorage.removeItem("Kwitter Website User Name");
            localStorage.removeItem("Kwitter Room_Key");
            window.location.replace("index.html");
      }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode);
            alert(errorMessage);
      });
}