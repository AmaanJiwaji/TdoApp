const firebaseConfig = {
  apiKey: "AIzaSyCSPmxnvDF6jM8m3yOuds0YhXEgE4TTJCo",
  authDomain: "todoappkbw.firebaseapp.com",
  projectId: "todoappkbw",
  storageBucket: "todoappkbw.firebasestorage.app",
  messagingSenderId: "150311367768",
  appId: "1:150311367768:web:a766407ce25db4ab10062d",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var listContainer = document.getElementById("listContainer");
var userId = localStorage.getItem("userId");

function post() {
  var todoValue = document.getElementById("todo");
  var data = {
    todo: todoValue.value,
    userId: userId,
  };
  db.collection("todos")
    .add(data)
    .then(() => {
      todoValue.value = " ";
      getData();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

function getData() {
  db.collection("todos")
    // .where("userId", "==", userId)
    .get()
    .then((data) => {
      listContainer.innerHTML = "";
      data.forEach((todos) => {
        var newTodo = document.createElement("div");
        newTodo.setAttribute("id", todos.id);
        var todo = document.createElement("h6");
        var todoText = document.createTextNode(todos.data().todo);
        todo.appendChild(todoText);
        newTodo.appendChild(todo);
        listContainer.appendChild(newTodo);
        newTodo.setAttribute("class", "todoContainer");
        var dltBtn = document.createElement("button");
        var dltText = document.createTextNode("Remove");
        dltBtn.setAttribute("class", "btn btn-danger");
        dltBtn.setAttribute("onclick", "removeTodo()");
        dltBtn.appendChild(dltText);
        newTodo.appendChild(dltBtn);
        var editBtn = document.createElement("button");
        var editText = document.createTextNode("Edit");
        editBtn.setAttribute("class", "btn btn-secondary");
        editBtn.setAttribute("onclick", "editTodo()");
        editBtn.appendChild(editText);
        newTodo.appendChild(editBtn);
        var updateBtn = document.createElement("button");
        var updateText = document.createTextNode("Update");
        updateBtn.setAttribute("class", "btn btn-success hide");
        updateBtn.setAttribute("onclick", "updateTodo()");
        updateBtn.appendChild(updateText);
        newTodo.appendChild(updateBtn);
      });
    })
    .catch((error) => {
      console.error("Error getting data: ", error);
    });
}

getData();

function removeTodo() {
  var btn = event.target;

  db.collection("todos")
    .doc(btn.parentNode.id)
    .delete()
    .then(() => {
      btn.parentNode.remove();
    })
    .catch((error) => {
      alert("Error removing document: ");
    });
}

function editTodo() {
  alert("Kindly Click on text to edit");
  var btn = event.target;
  btn.style.display = "none";
  btn.parentNode.lastChild.style.display = "inline-block";
  btn.parentNode.firstChild.contentEditable = "true";
}

function updateTodo() {
  var btn = event.target;

  var updatedTodo = btn.parentNode.childNodes[0].innerHTML;
  db.collection("todos")
    .doc(btn.parentNode.id)
    .set({ todo: updatedTodo })
    .then(() => {
      btn.style.display = "none";
      btn.parentNode.childNodes[2].style.display = "inline-block";
      btn.parentNode.firstChild.contentEditable = "false";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

function RemoveAll() {
  db.collection("todos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
      listContainer.innerHTML = "";
    })
    .catch((error) => {
      alert("Error removing documents: " + error.message);
    });
}
