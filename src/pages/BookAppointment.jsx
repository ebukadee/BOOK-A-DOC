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


  const { data, loading, error } = useFetch(`${endpoint}/all-hospitals/1`)
  console.log(data)

  return (
    <>
    <section className="pt-4">
            <h1 className="font-semibold text-4xl my-8">Recommended, <span className="text-hint">Hospitals</span></h1>
      
        {
          data?.data && 
          data?.data.map((hospital) =>(
            <div className='my-8'>
            <Card key={hospital._id}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom component="div">
              <img src={hospitalicon} className="h-[3rem]" alt="Hospital Icon" />
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {hospital.name}
            </Typography>
            <Typography gutterBottom component="div">
              <LocationOnIcon/>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {hospital.city}, {hospital.state}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/book-appointment/${hospital._id}`}>
          <Button size="small" color="primary" >
            Book Appointment
          </Button>
          </Link>
        </CardActions>
      </Card>
      </div>
          ))
        }
      
    
    </section>
    </>
  )
}


export default BookAppointment



