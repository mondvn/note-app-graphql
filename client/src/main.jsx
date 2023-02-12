import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { Container } from "@mui/system";
import "./firebase/config";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
    <RouterProvider router={router}></RouterProvider>
  </Container>
);
