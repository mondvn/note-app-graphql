import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { AuthContext } from "../../context/AuthProvider";
import { graphQLRequest } from "../../utils/request";

function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid,
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("Register", { data });
  };

  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/" />;
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
