import LHNavBarImg from "./LearnHack_Logo_Horizontal.svg";
import { auth } from "../../config/firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  let navigate = useNavigate();

  const handleSignOut = () => {
    try {
      signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {auth.currentUser ? (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-mono">{auth.currentUser.email} is signed in</h1>
            <button
              className="font-mono border-2 border-gray-300 rounded-lg p-2 hover:border-purple-400"
              onClick={handleSignOut}
            >
              Log out
            </button>
          </div>
          <div className="my-4">
            <img src={LHNavBarImg} alt="logo" />
          </div>
        </div>
      ) : (
        <div>
          <div className="my-4">
            <img src={LHNavBarImg} alt="logo" />
          </div>
        </div>
      )}
    </div>
  );
};
