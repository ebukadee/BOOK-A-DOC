import React from 'react'
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Button } from "@mui/material";
import { useUserContext } from "../context/userContext";
import { useLoaderData } from "react-router-dom";
import { endpoint } from "../utils/endpoints";
import { toast } from "react-toastify";



const BookAppointmentProgress = () => {
  const { data } = useLoaderData();
  const { user } = useUserContext();

  console.log(user._id, data)

  const d = new Date();

  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  const [date, setDate] = React.useState(dayjs(currentDate));
  const [time, setTime] = React.useState(dayjs(d));


  const submit = async () =>{

    const settings = {
      method: "post",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospital_id: data._id, 
        user_id: user._id,
        date: date,
        time: time
      }),
    };

    const res = await fetch(`${endpoint}/book-appointment`, settings)
    const result = await res.json()
    if(result.success){
      return toast.success(result.success);
    }else{
      return toast.error(result.error);
    }
  }

  return (
    <Dashboard>
      <section className='py-[5rem]'>
        <div className="rounded-lg mx-auto w-full max-w-[50rem] p-5 bg-white shadow-2xl">
          <h1 className="text-3xl text-center font-bold">BOOK A DOC</h1>

          <div className="mt-8 border-b-2 pb-2 border-[#ccc]">
            <h2 className="font-semibold">Hospital Name:</h2>
            <p>{data.name}</p>
          </div>
          <div className="mt-8 border-b-2 pb-2 border-[#ccc]">
            <h2 className="font-semibold">Appointee</h2>
            <p>{user.first_name}{' '}{user.last_name}</p>
          </div>
          <div className="mt-8 border-b-2 pb-2 border-[#ccc]">
            <h2 className="font-semibold">Hospital Location</h2>
            <p>{data.city}, {data.state}</p>
          </div>


          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                'DatePicker',
                'MobileDatePicker',
                'TimePicker',
                'MobileTimePicker',
              ]}
            >
              <div className="mt-8 border-b-2 pb-2 border-[#ccc]">
                <h2 className="font-semibold">Set Appointment Date</h2>
                <DemoItem>
                  <MobileDatePicker defaultValue={date} value={date}
          onChange={(newValue) => setDate(newValue)} />
                </DemoItem>
              </div>
              <div className="mt-8 border-b-2 pb-2 border-[#ccc]">
                <h2 className="font-semibold">Set Appointment Time</h2>
                <DemoItem>
                  <MobileTimePicker defaultValue={time} value={time} onChange={(newValue) => setTime(newValue)} />
                </DemoItem>
              </div>
            </DemoContainer>
          </LocalizationProvider>
          <div className="mt-8">
          <Button variant="contained" size="large" onClick={submit}>BOOK NOW</Button>
          </div>
        </div>
      </section>
    </Dashboard>
  )
}

export default BookAppointmentProgress