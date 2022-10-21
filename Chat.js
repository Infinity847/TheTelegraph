function backtohome() {
    window.location = "main.html";
}

//YOUR FIREBASE LINKS

const firebaseConfig = {
    apiKey: "AIzaSyDaGspMMowJA1XcKCV502gbph_VeT9mgSo",
    authDomain: "letschat-d3f44.firebaseapp.com",
    databaseURL: "https://letschat-d3f44-default-rtdb.firebaseio.com",
    projectId: "letschat-d3f44",
    storageBucket: "letschat-d3f44.appspot.com",
    messagingSenderId: "1061774008972",
    appId: "1:1061774008972:web:d7c6224c564bd7c760d1a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("Telegraph||Username");
room_name = localStorage.getItem("room_name");
if (user_name == undefined) {
    window.location = "index.html"
    }else {
    
    }
function send() {
    msg = document.getElementById("message").value;
    
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("message").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> Username : " + name + "</h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class = 'likebtn' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span id = 'innerlikebtn' >👍Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });

}

