import React from 'react';
import { useState } from 'react';
import './applicant.css';
import { Grid, TextField, Card, CardContent, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

export function EditGrantView() {
  const margin = { margin: '0 5px' };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Criteria: '',
    Amount: 0,
    Department: '',
    Deadline: '',
  });
  const { id } = useLocation().state;
  console.log(id);

  const submitForm = () => {
    axios
      .put(`https://grant-portal-api.onrender.com/api/grants/${id}`, formData)
      .then((response) => {
        console.log(response);
        setLoading(false);
        toast.success('Grant Edited Successfully');
        navigate('/grant');
        console.log('submitted successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="App">
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h4" color="inherit">
              Edit a Grant
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Fill all the mandatory fields to edit a Grant.
            </Typography>
            <form>
              <Typography variant="body2" align="left" gutterBottom>
                Grant Info :{' '}
              </Typography>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="title"
                    placeholder="Enter Title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Title}
                    onChange={(e) => {
                      setFormData({ ...formData, Title: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="description"
                    placeholder="Enter Description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Description}
                    onChange={(e) => {
                      setFormData({ ...formData, Description: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="criteria"
                    placeholder="Enter Criteria"
                    label="Criteria"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Criteria}
                    onChange={(e) => {
                      setFormData({ ...formData, Criteria: e.target.value });
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
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="department"
                    placeholder="Enter Department"
                    label="Department"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Department}
                    onChange={(e) => {
                      setFormData({ ...formData, Department: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="deadline"
                    placeholder="Enter Deadline"
                    label="Deadline"
                    type="date"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.Deadline}
                    onChange={(e) => {
                      setFormData({ ...formData, Deadline: e.target.value });
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
