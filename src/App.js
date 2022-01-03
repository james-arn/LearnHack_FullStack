import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//firebase
import { db } from "./config/firebase/firebase";
import { ref, onValue } from "firebase/database";
import { auth } from "./config/firebase/firebase";
//components
import Todo from "./components/Todo/Todo";
import Auth from "./components/Auth/auth";

function App() {
  //authenticaiton state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [isSignedUp, setIsSignedUp] = useState(false); //if registered, they are signed up/
  //Todo state
  const [todo, setTodo] = useState(""); //state to log 1 todo before submit.
  const [todos, setTodos] = useState([]); //array of all todos.
  const [isEdit, setIsEdit] = useState(false); //for update functionality
  const [tempUuid, setTempUuid] = useState(""); //for update functionality

  //READ (CRUD)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // Everytime someone logs in or out do this.
      setUser(user);
    });
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        //if database is read when empty, it will throw error. This stops that.
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]); //old array is new array. Inside array is objects.
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route></Route>
        <Route
          exact
          path="/"
          element={
            <Auth
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isSignedUp={isSignedUp}
              setIsSignedUp={setIsSignedUp}
              user={user}
            />
          }
        />
        <Route
          exact
          path="/todo"
          element={
            <Todo
              todo={todo}
              setTodo={setTodo}
              todos={todos}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              tempUuid={tempUuid}
              setTempUuid={setTempUuid}
            />
          }
        />
        <Route path="*" element={<p>Page not found.</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
