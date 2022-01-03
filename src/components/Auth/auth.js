import { auth } from "../../config/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const Auth = ({
  email,
  setEmail,
  password,
  setPassword,
  isSignedUp,
  setIsSignedUp,
  user,
}) => {
  let navigate = useNavigate();

  const handleEmailChange = (e) => {
    return setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    return setPassword(e.target.value);
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/todo");
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/todo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-mono min-h-screen flex items-center justify-center bg-purple-400">
      <div className="bg-white p-8 rounded shadow-2xl w-680px">
        <Navbar />
        <div>
          {isSignedUp ? (
            <div>
              <div className="flex items-center justify-center">
                <h2 className=" text-3xl font-bold mb-6 underline decoration-purple-800 underline-offset-2">
                  Sign up
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    className="w-full border-2 border-grey-200 mb-1 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    className="w-full border-2 border-grey-200 mb-5 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                </div>

                <button
                  className="w-full text-lg bg-purple-800 text-white p-4 rounded-lg hover:bg-purple-600 transition duration-300"
                  onClick={register}
                >
                  Sign up
                </button>

                <div className="flex items-center justify-center">
                  <button
                    className="underline text-blue-500"
                    onClick={() => setIsSignedUp(false)}
                  >
                    Need to log in instead?
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center">
                <h2 className="text-3xl font-bold mb-6 underline decoration-purple-800 underline-offset-2">
                  Log In
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    className="w-full border-2 border-grey-200 mb-1 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    className="w-full border-2 border-grey-200 mb-5 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <button
                  className="w-full text-lg bg-purple-800 text-white p-4 rounded-lg hover:bg-purple-600 transition duration-300"
                  onClick={signIn}
                >
                  Log in
                </button>
                <div>
                  <div className="flex items-center justify-center">
                    <button
                      className="underline text-blue-500"
                      onClick={() => setIsSignedUp(true)}
                    >
                      Need to register?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
