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
  isRegistering,
  setIsRegistering,
  registerInformation,
  setRegisterInformation,
}) => {
  let navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setRegisterInformation("");
      navigate("/todo");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      if (
        registerInformation.password !== registerInformation.confirmPassword
      ) {
        alert("Passwords do not match, please try again");
        return;
      }
      await createUserWithEmailAndPassword(
        auth,
        registerInformation.email,
        registerInformation.password
      );
      setEmail("");
      setPassword("");
      setRegisterInformation("");
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
          {isRegistering ? (
            <div>
              <div className="flex items-center justify-center">
                <h2 className=" text-3xl font-bold mb-6 underline decoration-purple-800 underline-offset-2">
                  Register
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    className="w-full border-2 border-grey-200 mb-1 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="email"
                    value={registerInformation.email}
                    placeholder="Email"
                    onChange={(e) =>
                      setRegisterInformation({
                        ...registerInformation,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    className="w-full border-2 border-grey-200 mb-1 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="password"
                    value={registerInformation.password}
                    placeholder="Password"
                    onChange={(e) =>
                      setRegisterInformation({
                        ...registerInformation,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    className="w-full border-2 border-grey-200 mb-1 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="password"
                    value={registerInformation.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      setRegisterInformation({
                        ...registerInformation,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  className="w-full text-lg bg-purple-800 text-white p-4 rounded-lg hover:bg-purple-600 transition duration-300"
                  onClick={handleRegister}
                >
                  Register
                </button>

                <div className="flex items-center justify-center">
                  <button
                    className="underline text-blue-500"
                    onClick={() => setIsRegistering(false)}
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
                    className="w-full border-2 border-grey-200 mb-1 p-3 rounded-lg outline-none focus:border-purple-500"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <button
                  className="w-full text-lg bg-purple-800 text-white p-4 rounded-lg hover:bg-purple-600 transition duration-300"
                  onClick={handleSignIn}
                >
                  Log in
                </button>
                <div>
                  <div className="flex items-center justify-center">
                    <button
                      className="underline text-blue-500"
                      onClick={() => setIsRegistering(true)}
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
