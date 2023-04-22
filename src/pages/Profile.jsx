import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import create from '../assets/icons/create.svg'
import { TextField, Button } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from '@mui/material/FormHelperText';
import { endpoint } from '../utils/endpoints';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useUserContext } from '../context/userContext'
import { toast as toasts } from "react-toastify";
import Dashboard from './Dashboard';
import animedoc from '../assets/anime-doc.svg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import hospitalicon from '../assets/hospital-svg.svg'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useFetch from '../hooks/useFetch'
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Profile = () => {

    const { user } = useUserContext()



    return (
        <Dashboard>
            <section className="bg-midWhite min-h-[100vh] py-4">
                <div className="rounded-2xl w-full shadow-lg flex justify-between bg-[#fff]">
                    <div className="py-8 px-8">
                        <h1 className="text-2xl">Welcome, <span className="text-hint">{user.first_name}{" "}{user.last_name}</span></h1>
                        <p className="mt-4">Get ready to take control of your health welcome aboard!</p>
                        <Link to='/book-appointment'>
                            <Button variant="contained" className="!mt-8" size="large">BOOK APPOINTMENT</Button>
                        </Link>
                    </div>
                    <div>
                        <img src={animedoc} alt="Anime-doc" />
                    </div>
                </div>

                <Appointments />
                <EditMedicalVitals />

            </section>
        </Dashboard>
    )
}

const Appointments = () => {

    const { user } = useUserContext()
    const { data, loading, error } = useFetch(`${endpoint}/user-appointments/${user._id}`)
    console.log(data)

    return (
        <div className="">
            <div className="pt-8">
                <h1 className="font-semibold text-4xl my-8 text-hint">Your Appointments</h1>
                <div className="my-8"></div>
                {
                    data && data.data.map(d => (
                        <div className='mb-8' key={d._id}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom component="div">
                                    <img src={hospitalicon} className="h-[3rem]" alt="Hospital Icon" />
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    {d.hospital.name}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    <LocationOnIcon />
                                </Typography>
                                <Typography gutterBottom variant="body2" color="text.secondary">
                                    {d.hospital.city}{" "}{d.hospital.state}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    <EventIcon />
                                </Typography>
                                <Typography gutterBottom variant="body2" color="text.secondary">
                                    {d.date}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    <AccessTimeIcon />
                                </Typography>
                                <Typography gutterBottom variant="body2" color="text.secondary">
                                    {d.time}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Download Slip
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                    ))
                }
            </div>
        </div>
    )
}

const EditMedicalVitals = () => {

    const { user } = useUserContext()
    console.log(user)

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);

    const [height, setHeight] = useState(user.height || '')
    const [weight, setWeight] = useState(user.weight || '')
    const [bloodGroup, setBloodGroup] = useState(user.blood_group || '')
    const [selectedGenotype, setSelectedGenotype] = useState(user.genotype || '')

    const handleSelectedGenotype = (e) => setSelectedGenotype(e.target.value);

    const genotypeMenuItems = ['AA', 'AS', 'AC', 'SS', 'SC'].map((genotype) => (
        <MenuItem value={genotype} key={genotype}>
            {genotype}
        </MenuItem>
    ));

    const submit = async () => {
        const settings = {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                height: height,
                weight: weight,
                blood_group: bloodGroup,
                genotype: selectedGenotype
            }),
        };

        try {
            setLoading(true)
            const res = await fetch(`${endpoint}/profile/${user._id}`, settings)
            const data = await res.json()
            if (data.error) {
                setErrors(data.error)
            } else {
                toasts.success(data.success)
                setErrors(null)
                navigate('/user-info')
            }
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    return (
        <div className="max-w-lg flex">
            <div className="pt-8 w-full">
                <h1 className="font-semibold text-4xl my-8 text-hint">Edit Your Medical Vitals</h1>
                <div className="mt-8">
                    <TextField
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        type="number"
                        label="Height(cm)"
                        variant="outlined"
                        className="w-full"
                        helperText={errors?.height}
                        error={errors?.height ? true : false}
                    />
                </div>
                <div className="mt-8">
                    <TextField
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        label="Weight(kg)"
                        variant="outlined"
                        className="w-full"
                        helperText={errors?.weight}
                        error={errors?.weight ? true : false}
                    />
                </div>
                <div className="mt-8">
                    <TextField
                        id="blood-group"
                        type="text"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        label="Blood Group"
                        variant="outlined"
                        className="w-full"
                        helperText={errors?.blood_group}
                        error={errors?.blood_group ? true : false}
                    />
                </div>
                <div className="mt-8">
                    <FormControl error={errors?.genotype ? true : false} fullWidth>
                        <InputLabel id="genotype">Genotype</InputLabel>
                        <Select
                            labelId="genotype"
                            id="demo-simple-select"
                            value={selectedGenotype}
                            label="Genotype"
                            onChange={handleSelectedGenotype}
                        >
                            {genotypeMenuItems}
                        </Select>
                        <FormHelperText>{errors?.genotype}</FormHelperText>
                    </FormControl>
                </div>
                <div className="mt-4">
                    <p>Why do we need this information, <span className="text-hint">Learn more</span></p>
                </div>
                <div className="mt-4 mb-8">
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
                            endIcon={<NavigateNext />}
                        >
                            Save
                        </Button>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Profile
