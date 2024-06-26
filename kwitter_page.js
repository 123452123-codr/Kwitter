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
var room_key = localStorage.getItem("Kwitter Room_Key");

function send() {
      var message = document.getElementById("message").value;
      firebase.database().ref("kwitter/" + room_key).push({
            name: user_name,
            message: message,
            like: 0
      });
      document.getElementById("message").value = "";
}

function getData() { 
      firebase.database().ref("kwitter/" + room_key).on('value', function(snapshot) { 
            document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "purpose" && childKey != "status") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);
         var name = message_data['name'];
         var message = message_data['message'];
         var likes = message_data['like'];

         var name_with_tag = "<h4>" + name + "<img class='user_tick' draggable='false' src='tick.png'></h4>";
         var message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         var btn_with_tag = "<button class='btn btn-warning' id='" + firebase_message_id + "' value='" + likes + "' onclick='updateLikes(this.id)'>";
         var span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + likes + "</span></button><hr>";

         var row = name_with_tag + message_with_tag + btn_with_tag + span_tag;
         document.getElementById("output").innerHTML += row;
//End code
      } });  }); 
}

getData();

function updateLikes(messageid) {
      console.log("Clicked on liked button - " + messageid);
      var likes = document.getElementById(messageid).value;
      var updated_like = Number(likes) + 1;
      console.log(updated_like);

      firebase.database().ref("kwitter/" + room_key).child(messageid).update({
            like: updated_like
      });
}

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