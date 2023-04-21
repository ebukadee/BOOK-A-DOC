import React from 'react'
import { useParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dashboard from './Dashboard';

const BookAppointmentProgress = () => {
    const { hospitalId } = useParams()


  return (
    <Dashboard>
        <div>{hospitalId}</div>
        <section></section>
    </Dashboard>
  )
}

export default BookAppointmentProgress