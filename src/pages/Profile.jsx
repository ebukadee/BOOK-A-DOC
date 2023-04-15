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

const Profile = () => {

    const navigate = useNavigate()

    const { user } = useUserContext()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);

    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [selectedGenotype, setSelectedGenotype] = useState('')

    const handleSelectedGenotype = (e) => setSelectedGenotype(e.target.value);

    const genotypeMenuItems = ['AA', 'AS', 'AC', 'SS', 'SC'].map((genotype) => (
        <MenuItem value={genotype} key={genotype}>
            {genotype}
        </MenuItem>
    ));

    const submit = async () =>{
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

        try{
            setLoading(true)
            const res = await fetch(`${endpoint}/profile/${user._id}`, settings)
            const data = await res.json()
            if(data.error){
                setErrors(data.error)
            }else{
                toasts.success(data.success)
                setErrors(null)
                navigate('/user-info')
            }
            setLoading(false)
        }
        catch(err){
            setLoading(false)
            console.log(err)
        }
    }

    return (
        <section className="bg-midWhite min-h-[100vh] px-4 py-4">
            <div className="max-w-3xl mx-auto">
                <div className="py-0.5">
                    <span className="material-symbols-outlined cursor-pointer" onClick={() => navigate(-1)}> undo </span>
                </div>

                <div className="w-full flex justify-center">
                    <img src={create} alt="Doctor" className="max-h-72" />
                </div>

                <h1 className="text-center font-semibold text-4xl my-4">Tell us a more about yourself</h1>

                <div className="mx-auto max-w-lg">
                    <div className="mt-8">
                        <TextField 
                            id="height" 
                            value={height}
                            onChange={(e)=>setHeight(e.target.value)}
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
                            onChange={(e)=> setWeight(e.target.value)}
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
                            onChange={(e)=> setBloodGroup(e.target.value)}
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
                                Next
                            </Button>
                        )}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Profile
