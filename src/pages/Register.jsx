import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import create from "../assets/icons/create.svg";
import { TextField, Button, Checkbox } from "@mui/material";
import { endpoint } from "../utils/endpoints";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { toast as toasts } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const handleChecked = () => setChecked((prev) => !prev);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "" });

  const settings = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    }),
  };

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${endpoint}/register`, settings);
      const data = await res.json();
      console.log(data);
      if (data.success) {
        console.log("Success", data);
        setErrors(null);
        toasts.success(data.success);
        navigate("/login");
      } else {
        console.log("Error", data);
        setErrors(data.error);
        setToast((prev) => ({
          ...prev,
          show: true,
          message: "Stop breaking rules!",
        }));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <>
      <section className="bg-midWhite min-h-[100vh] px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="py-0.5">
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => navigate('/')}
            >
             
              home
            </span>
          </div>

          <div className="w-full flex justify-center">
            <img src={create} alt="Doctor" className="max-h-72" />
          </div>

          <h1 className="text-center font-semibold text-4xl my-4">
            Create a new account
          </h1>

          <div className="mx-auto max-w-md">
            <div className="mt-8">
              <TextField
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                label="First Name"
                variant="outlined"
                className="w-full"
                helperText={errors?.first_name}
                error={errors?.first_name ? true : false}
              />
            </div>
            <div className="mt-8">
              <TextField
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                label="Last Name"
                variant="outlined"
                className="w-full"
                helperText={errors?.last_name}
                error={errors?.last_name ? true : false}
              />
            </div>
            <div className="mt-8">
              <TextField
                id="email"
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
                id="password"
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
              <TextField
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                label="Confirm Password"
                variant="outlined"
                className="w-full"
                helperText={errors?.confirm_password}
                error={errors?.confirm_password ? true : false}
              />
            </div>
            <div className="mt-4 flex items-center">
              <Checkbox
                checked={checked}
                onChange={handleChecked}
                inputProps={{ "aria-label": "controlled" }}
              />
              <p>
                I agree to the <span className="text-hint"> Terms of Service </span> and the 
                <span className="text-hint"> Privacy Policy </span>
              </p>
            </div>
            <div className="mt-4">
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
                  SIGN UP
                </Button>
              )}
            </div>
            <p className="text-center mt-2 mb-8">
              Already have an account? {" "}
              <Link to="/login" className="text-hint">Login</Link>
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

export default Register;
