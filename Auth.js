const firebaseConfig = {
  apiKey: "AIzaSyCSPmxnvDF6jM8m3yOuds0YhXEgE4TTJCo",
  authDomain: "todoappkbw.firebaseapp.com",
  projectId: "todoappkbw",
  storageBucket: "todoappkbw.firebasestorage.app",
  messagingSenderId: "150311367768",
  appId: "1:150311367768:web:a766407ce25db4ab10062d",
};
//checking
firebase.initializeApp(firebaseConfig);

var email = document.getElementById('email')
var password = document.getElementById('password')

function SignUp() {

  var userEmail = email.value
  var userPassword = password.value
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredentials) => {
      localStorage.setItem('userId',userCredential.user.uid)
      window.location.href = "file:///D:/Sir%20Bilal/batch%202/JavaScript/TODO%20App/todo.html";
    })
    .catch((error) => {
      alert("SomeThimg went wrong");
    });
}

function logIn() {
  
  var userEmail = email.value
  var userPassword = password.value
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      localStorage.setItem('userId',userCredential.user.uid)
      window.location.href = "file:///D:/Sir%20Bilal/batch%202/JavaScript/TODO%20App/todo.html";
    })
    .catch((error) => {
      alert("SomeThimg went wrong");
    });
}
