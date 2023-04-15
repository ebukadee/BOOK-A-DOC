import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import doctorsvg from "../assets/icons/doctors.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { endpoint } from "../utils/endpoints";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { toast as toasts } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [toast, setToast] = useState({ show: false, message: '' })

  const settings = {
    method: "post",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${endpoint}/login`, settings);
      const data = await res.json();
      
      if (data.success) {

        setErrors(null);
        toasts.success(data.success);
        navigate('/profile')

      } else if(data.error) {

        setErrors(data.error);
        setToast((prev) => ({
          ...prev,
          show: true,
          message: "Stop breaking rules!",
        }));

      }else{

        setToast((prev) => ({
          ...prev,
          show: true,
          message: data.server_err,
        }));
        
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setToast(prev => ({...prev, show: false}));
  };

  return (
    <>
    <section className="bg-midWhite min-h-[100vh] px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="py-0.5">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => navigate(-1)}
          >
            undo
          </span>
        </div>

        <div className="w-full flex justify-center">
          <img src={doctorsvg} alt="Doctor" className="max-h-72" />
        </div>

        <h1 className="text-center font-semibold text-4xl my-4">
          Welcome back 👋
        </h1>

        <div className="mx-auto max-w-md">
          <div className="mt-8">
            <TextField
              id="outlined-basic-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              variant="outlined"
              className="w-full"
              helperText={errors?.email}
              error={errors?.email ? true : false}
            />
          </div>
          <div className="mt-8">
            <TextField
              id="outlined-basic-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              variant="outlined"
              className="w-full"
              helperText={errors?.password}
              error={errors?.password ? true : false}
            />
          </div>
          <div className="mt-8">
            {loading ? (
              <Button variant="contained" className="w-full !py-3" size="large">
                <CircularProgress size={26} sx={{ color: () => "#fff" }} />
              </Button>
            ) : (
              <Button
                variant="contained"
                className="w-full !py-3"
                size="large"
                onClick={submit}
              >
                Login
              </Button>
            )}
          </div>
          <p className="text-center mt-2 mb-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-hint">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
    <Snackbar
      autoHideDuration={3000}
      open={toast.show}
      onClose={handleClose}
      TransitionComponent={Slide}
      message={toast.message}
      key={Slide.name}
    />
    </>
  );
};

export default Login;
