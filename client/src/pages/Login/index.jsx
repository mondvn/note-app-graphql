import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../../context/AuthProvider";

function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
    console.log(res);
  }

  if(user?.uid) {
    navigate('/')
    return  
  }
  
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "50px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}

export default Login;
