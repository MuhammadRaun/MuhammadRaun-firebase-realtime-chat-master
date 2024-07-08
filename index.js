// Your web app's Firebase configuration
var firebaseConfig = // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 {
  apiKey: "AIzaSyBE-GVyk0tsp3ZJQvY2XT2_lZjzlgbjVAU",
  authDomain: "team-chat-13628.firebaseapp.com",
  databaseURL: "https://team-chat-13628-default-rtdb.firebaseio.com",
  projectId: "team-chat-13628",
  storageBucket: "team-chat-13628.appspot.com",
  messagingSenderId: "649767137839",
  appId: "1:649767137839:web:c735db16a775dcd587ccda",
  measurementId: "G-WGCRQZGJN3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
