import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { Button } from "@mui/material";
import animedoc from "../assets/anime-doc.svg";
import { useUserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import hospitalicon from "../assets/hospital-svg.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import useFetch from "../hooks/useFetch";
import { endpoint } from "../utils/endpoints";
const BookAppointment = () => {
  const { user } = useUserContext();

  return (
    <Dashboard>
      <section className="bg-midWhite min-h-[100vh] py-4">
        <div className="rounded-2xl w-full shadow-lg flex justify-between bg-[#fff]">
          <div className="py-8 px-8">
            <h1 className="text-2xl">
              Schedule Appointments,{" "}
              <span className="text-hint">
                {user.first_name} {user.last_name}
              </span>
            </h1>
            <p className="mt-4">
              You are in control of your health, you can always update your{" "}
              <Link to="/user-info">
                <Button size="small" color="primary">
                  Appointment Settings
                </Button>
              </Link>{" "}
              before booking an appointment{" "}
            </p>
            <Link to="/profile">
              <Button variant="contained" className="!mt-8" size="large">
                YOUR APPOINTMENTS
              </Button>
            </Link>
          </div>
          <div>
            <img src={animedoc} alt="Anime-doc" />
          </div>
        </div>
        <Appointment />
      </section>
    </Dashboard>
  );
};

const Appointment = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [hospital, setHospital] = useState(null);

  const btnHandler = (hospital) => {
    setHospital(hospital);
    handleOpen();
  };

  const { data, loading, error } = useFetch(`${endpoint}/all-hospitals/1`);

  return (
    <>
      <section className="pt-4">
        <h1 className="font-semibold text-4xl my-8">
          Recommended, <span className="text-hint">Hospitals</span>
        </h1>

        {data?.data &&
          data?.data.map((hospital) => (
            <div className="my-8">
              <Card key={hospital._id}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom component="div">
                      <img
                        src={hospitalicon}
                        className="h-[3rem]"
                        alt="Hospital Icon"
                      />
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {hospital.name}
                    </Typography>
                    <Typography gutterBottom component="div">
                      <LocationOnIcon />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hospital.city}, {hospital.state}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => btnHandler(hospital)}
                  >
                    Book Appointment
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
      </section>
      <TransitionsModal
        hospital={hospital}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default BookAppointment;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TransitionsModal({ open, handleClose, hospital }) {
  console.log(hospital);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
