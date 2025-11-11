import React from 'react';
import './applicant.css';
import { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import 'react-toastify/dist/ReactToastify.css';

export function EditAwardeeView() {
  const margin = { margin: '0 5px' };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    PhoneNumber: '',
    Email: '',
    AreaOfSpecialization: '',
    Amount: '',
  });

  const { id } = useLocation().state;

  const submitDocument = (formData) => {
    console.log('submtting');
    axios
      .post('https://grant-portal-api.onrender.com/api/documents', formData)
      .then((response) => {
        console.log('submitted successfully');
      })
      .catch((err) => toast.error(err.response.data));
  };

  const submitForm = () => {
    console.log('submtting');
    axios
      .put(`https://grant-portal-api.onrender.com/api/awardees/${id}`, formData)
      .then((response) => {
        setLoading(false);
        toast.success('Awardee Edited Successfully');
        navigate('/awardees');
        console.log('submitted successfully');
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <div className="App">
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h4" color="inherit">
              Edit an Awardee
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Fill all the mandatory fields to edit an awardee.
            </Typography>
            <form>
              <Typography variant="body2" align="left" gutterBottom>
                Awardee Info :{' '}
              </Typography>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="firstName"
                    placeholder="Enter Firstname"
                    label="Firstname"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Firstname}
                    onChange={(e) => {
                      setFormData({ ...formData, Firstname: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="lastName"
                    placeholder="Enter Lastname"
                    label="Lastname"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Lastname}
                    onChange={(e) => {
                      setFormData({ ...formData, Lastname: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    label="Phone Number"
                    type="number"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.PhoneNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, PhoneNumber: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="email"
                    placeholder="Enter Email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Email}
                    onChange={(e) => {
                      setFormData({ ...formData, Email: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="areaOfSpecialization"
                    placeholder="Enter Area of Specialization"
                    label="Area Of Specialization"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.AreaOfSpecialization}
                    onChange={(e) => {
                      setFormData({ ...formData, AreaOfSpecialization: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="amount"
                    placeholder="Enter Amount"
                    label="Amount"
                    type="number"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Amount}
                    onChange={(e) => {
                      setFormData({ ...formData, Amount: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} align="right">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="inherit"
                    loading={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    Update
                  </LoadingButton>
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
