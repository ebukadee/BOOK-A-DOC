import React from "react";
import Home from "./pages/Home";
import "../src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserInfo from "./pages/UserInfo";
import Auth from './components/Auth'
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import BookAppointmentProgress from "./pages/BookAppointmentProgress";
import ErrorPage from "./pages/ErrorPage";
import { endpoint } from "./utils/endpoints";
import DownloadSlip from "./pages/DownloadSlip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const settings = {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      };
      try {
        const res = await fetch(`${endpoint}/verify-user`, settings)
        const data = await res.json()
        if (!data.success) {
          return false
        }
      } catch (err) {
        console.log(err)
        return false
      }
      return true
    }
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "profile",
    element: (
      <Auth>
        <Profile />
      </Auth>
    ),
  },
  {
    path: "user-info",
    element: (
      <Auth>
        <UserInfo />
      </Auth>
    ),
  },
  {
    path: "book-appointment",
    element: (
      <Auth>
        <BookAppointment />
      </Auth>
    ),
  },
  {
    path: "book-appointment/:hospitalId",
    element: (
      <Auth>
        <BookAppointmentProgress />
      </Auth>
    ),
    loader: async ({ params }) => {
      let res = await fetch(`${endpoint}/hospital/${params.hospitalId}`)
      if (res.status === 401) {
        throw new Response("Not Found", { status: 404 });
      }
      return res.json();
    }
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
