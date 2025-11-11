/* eslint-disable*/
import axios from 'axios';
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
// import  Avatar  from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
// import AddCircleOutlineOutlinedIcon from '@mui/material/icons/AddCircleOutlineOutlined';

// ----------------------------------------------------------------------
/* eslint-disable*/

export default function SignupView() {
  //const Signup = () => {
  const paperStyle = { padding: 20, width: 300, margin: '0 auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const marginTop = { marginTop: 10 };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    Username: '',
    Password: '',
    Roles: [''],
  });

  const submitForm = () => {
    setLoading(true);
    axios
      .post('https://grant-portal-api.onrender.com/api/Auth/Register', formData)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        toast.success('Registration Successful', { autoClose: 1000 });
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 1000 });
        setLoading(false);
      });
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={marginTop}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="Firstname"
            placeholder="Enter your Firstname"
            style={marginTop}
            value={formData.Firstname}
            onChange={(e) => {
              setFormData({ ...formData, Firstname: e.target.value });
            }}
          />
          <TextField
            fullWidth
            label="Lastname"
            placeholder="Enter your Lastname"
            style={marginTop}
            value={formData.Lastname}
            onChange={(e) => {
              setFormData({ ...formData, Lastname: e.target.value });
            }}
          />
          <TextField
            fullWidth
            label="Username"
            placeholder="Enter your email address as Username"
            type="email"
            style={marginTop}
            value={formData.Username}
            onChange={(e) => {
              setFormData({ ...formData, Username: e.target.value });
            }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
            style={marginTop}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            style={marginTop}
            value={formData.Password}
            onChange={(e) => {
              setFormData({ ...formData, Password: e.target.value });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Role"
            placeholder="Enter user role"
            style={marginTop}
            value={formData.Roles}
            onChange={(e) => {
              setFormData({ ...formData, Roles: [e.target.value] });
            }}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="inherit"
            fullWidth
            loading={loading}
            style={marginTop}
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            Sign up
          </LoadingButton>
        </form>
      </Paper>
    </Grid>
  );
}
