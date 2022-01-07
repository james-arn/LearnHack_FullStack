import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
//firebase
import { db } from "./config/firebase/firebase";
import { ref, onValue } from "firebase/database";
import { auth } from "./config/firebase/firebase";
//components
import Todo from "./components/Todo/Todo";
import Auth from "./components/Auth/auth";

function App() {
  //authenticaiton state
  const [email, setEmail] = useState(""); // LOGIN -onChange type input for form fields
  const [password, setPassword] = useState(""); // LOGIN - onChange type input for form fields
  const [user, setUser] = useState([]); // Tracks if logged in
  const [isRegistering, setIsRegistering] = useState(false); // Toggle for login or sign up options on form
  const [registerInformation, setRegisterInformation] = useState({
    //REGISTER onChange type input.
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();

  //Todo state
  const [todo, setTodo] = useState(""); //state to log 1 todo before submit.
  const [todos, setTodos] = useState([]); //array of all todos to map through.
  const [isEdit, setIsEdit] = useState(false); //for update functionality
  const [tempUidd, setTempUidd] = useState(""); //for update functionality

  //READ (CRUD)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]); //everytime reads database, array resets to not add old value
          const data = snapshot.val(); // Get data
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
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
            isRegistering={isRegistering}
            setIsRegistering={setIsRegistering}
            registerInformation={registerInformation}
            setRegisterInformation={setRegisterInformation}
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
            tempUidd={tempUidd}
            setTempUidd={setTempUidd}
          />
        }
      />
      <Route path="*" element={<p>Page not found.</p>} />
    </Routes>
  );
}

export default App;
