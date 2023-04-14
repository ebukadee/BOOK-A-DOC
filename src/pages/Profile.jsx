import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import create from '../assets/icons/create.svg'
import { TextField, Button } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
import SkipNext from '@mui/icons-material/SkipNext';
import useFetch from '../hooks/useFetch'
import { endpoint } from '../utils/endpoints';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Profile = () => {

    const navigate = useNavigate()

    const [selectedGenotype, setSelectedGenotype] = useState('')

    const handleSelectedGenotype = (e) => setSelectedGenotype(e.target.value);

    const genotypeMenuItems = ['AA', 'AS', 'AC', 'SS', 'SC'].map((genotype) => (
        <MenuItem value={genotype} key={genotype}>
          {genotype}
        </MenuItem>
    ));

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
                        <TextField id="outlined-basic" type="text" label="Height(cm)" variant="outlined" className="w-full" />
                    </div>
                    <div className="mt-8">
                        <TextField id="outlined-basic" type="text" label="Weight(kg)" variant="outlined" className="w-full" />
                    </div>
                    <div className="mt-8">
                        <TextField id="outlined-basic" type="text" label="Blood Group" variant="outlined" className="w-full" />
                    </div>
                    <div className="mt-8">
                        <FormControl fullWidth>
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
                        </FormControl>
                    </div>
                    <div className="mt-4">
                        <p>Why do we need this information, <span className="text-hint">Learn more</span></p>
                    </div>
                    <div className="mt-4 mb-8">
                        <Button variant="contained" className="w-full !py-3" size="large" endIcon={<NavigateNext />}>Next</Button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Profile
