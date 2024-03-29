import React from 'react';
import './applicant.css';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { inputFormElements } from './formElements';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export function CreateUserView() {
  const navigate = useNavigate();

  const submitData = (formData) => {
    console.log('submtting');
    axios
      .post('https://localhost:7197/api/Auth/Register', formData)
      .then((response) => {
        toast.success('User Created Successfully');
        navigate('/user');
        console.log('submitted successfully');
      })
      .catch((err) => toast.error(err.response.data));
  };

  const margin = { margin: '0 5px' };
  return (
    <div className="App">
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h4" color="inherit">
              Create a User
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Fill all the mandatory fields to create a user.
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const mainFormData = {};
                for (let pair of formData.entries()) {
                  mainFormData[pair[0]] = pair[1];
                }
                console.log(mainFormData);
                submitData(mainFormData);
              }}
            >
              <Typography variant="body2" align="left" gutterBottom>
                User Info :{' '}
              </Typography>
              <Grid container spacing={1}>
                {inputFormElements.slice(0, 4).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} />
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={1}>
                {inputFormElements.slice(4, 9).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} />
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} align="right">
                  <Button type="submit" variant="contained" color="inherit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
