var username = localStorage.getItem("Telegraph||Username");
var userstat = localStorage.getItem("Telegraph||UserStat");  
document.getElementById("chatspaces").innerHTML = "ChatSpaces : " + userstat;
if (username == undefined) {
window.location = "index.html"
}
if (userstat == undefined)
{
  localStorage.setItem("Telegraph||UserStat",5);
}

function logout() {
    window.location = "index.html";
}

//ADD YOUR FIREBASE LINKS HERE

// Your web app's Firebase configuration
//var firebaseConfig = {
//    apiKey: "AIzaSyCzLN0HzuNeOw_ad1Kk8jRNM6a_UBuO7kA",
 //   authDomain: "classtest-a5abb.firebaseapp.com",
 //   databaseURL: "https://classtest-a5abb-default-rtdb.firebaseio.com",
//    projectId: "classtest-a5abb",
//    storageBucket: "classtest-a5abb.appspot.com",
 //   messagingSenderId: "54590184475",
  //  appId: "1:54590184475:web:38cf67dd4b04be028becbe"
 // };
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
  
  function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("List.Chats").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
         Room_names = childKey;
        //Start code
        console.log("Room Name - " + Room_names);
        row = "<div class = 'room_name' id='"+Room_names+"'onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div>";
        document.getElementById("List.Chats").innerHTML += row;
        //End code
        });});}
  getData();
  
  function addRoom()
  {
    if (userstat > 0) {
    localStorage.setItem("Telegraph||UserStat",userstat-1);
    room_name = document.getElementById("inp1").value;
    document.getElementById("chatspaces").innerHTML = "ChatSpaces : " + userstat;
    firebase.database().ref("/").child(room_name).update({
      purpose : "adding room name"
    });
  
    localStorage.setItem("room_name", room_name);
  
    window.location = "Chat.html";
  }
  else {
    window.alert("You can't make more chats because you have no chat spaces left. You can get more by using promo codes.");
  }
  }
  
  function redirectToRoomName(name)
  {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "Chat.html";
  }