import axios from "axios";
import { React, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

import  Grid from '@mui/material/Grid';
import  Paper from '@mui/material/Paper';
import  Button from '@mui/material/Button';
// import  Avatar  from '@mui/material/Avatar';
import  TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import AddCircleOutlineOutlinedIcon from '@mui/material/icons/AddCircleOutlineOutlined';

// ----------------------------------------------------------------------
/* eslint-disable*/

export default function SignupView() {

  //const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 10 }
    const navigate = useNavigate();
  

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async () => {
      try {
        const res = await axios.post(
          "https://aporvis-server.vercel.app/api/user/register",
          formData
        );
        if (res.data.error) {
          enqueueSnackbar(res.data.error, { variant: "error" });
        } else {
          enqueueSnackbar("Signup successful", { variant: "success" });
          navigate("/login");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("An error occurred while logging in.", {
            variant: "error",
          });
        }
      }
    };
  
    return (
     
      <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <h2 style={marginTop}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" type="email" style={marginTop}/>
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" type="tel" style={marginTop} />
                    <TextField fullWidth label='Password' placeholder="Enter your password" type="password" style={marginTop}/>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" type="password" style={marginTop}/>
                    <Link to="/login">
                    <Button type='submit' variant='contained' color='primary' style={marginTop}>Sign up</Button>
                    </Link>
                </form>
            </Paper>
        </Grid>
  
);
};

/*
import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        
    )
}

export default Signup;

import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" />
                    <TextField fullWidth label='Password' placeholder="Enter your password"/>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}
*/



