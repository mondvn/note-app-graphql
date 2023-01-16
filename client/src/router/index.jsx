import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import NoteList from "../components/NoteList";
import Note from "../components/Note";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: async () => {
              const query = `query Folders {
                folders {
                  id
                  name
                  createdAt
                }
              }`;

              const res = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  query
                })
              })

              const {data} = await res.json()
              return data
            },
            children: [
              {
                element: <NoteList />,
                path: `folder/:folderId`,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
