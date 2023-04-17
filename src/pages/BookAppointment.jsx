import React from 'react'
import Dashboard from './Dashboard'
import { Button } from '@mui/material';
import animedoc from '../assets/anime-doc.svg'
import { useUserContext } from '../context/userContext'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import hospitalicon from '../assets/hospital-svg.svg'

const BookAppointment = () => {

  const { user } = useUserContext()

  return (
    <Dashboard>
      <section className="bg-midWhite min-h-[100vh] py-4">
        <div className="rounded-2xl w-full shadow-lg flex justify-between bg-[#fff]">
          <div className="py-8 px-8">
            <h1 className="text-2xl">Welcome, <span className="text-hint">{user.first_name}{" "}{user.last_name}</span></h1>
            <p className="mt-4">Get ready to take control of your health welcome aboard!</p>
            <Link to='/profile'><Button variant="contained" className="!mt-8" size="large">YOUR APPOINTMENTS</Button></Link>

          </div>
          <div>
            <img src={animedoc} alt="Anime-doc" />
          </div>
        </div>
        <Appointment />
      </section>

    </Dashboard>
  )
}


const Appointment = () => {

  return (
    <section className="pt-4">
            <h1 className="font-semibold text-4xl my-8">Available, <span className="text-hint">Hospitals</span></h1>
      <div className='my-8'>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom component="div">
              <img src={hospitalicon} className="h-[3rem]" alt="Hospital Icon" />
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Book Appointment
          </Button>
        </CardActions>
      </Card>
    </div>
    </section>
    
  )
}


export default BookAppointment