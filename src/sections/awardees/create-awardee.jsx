import React from 'react';
import './applicant.css';
import { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import 'react-toastify/dist/ReactToastify.css';

export function CreateAwardeeView() {
  const navigate = useNavigate();

  const margin = { margin: '0 5px' };

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    PhoneNumber: '',
    Email: '',
    AreaOfSpecialization: '',
    Amount: '',
    DocumentId: 0,
  });

  const [documentData, setDocumentData] = useState({
    Title: '',
    Description: '',
    File: {},
  });

  const submitDocument = async () => {
    console.log('submtting file');
    console.log(documentData);
    axios
      .post('https://grant-portal-api.onrender.com/api/documents', documentData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log(response);
        setFormData({ ...formData, DocumentId: response.data.documentId });
        console.log('submitted successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  const submitForm = async () => {
    console.log('submtting');
    await submitDocument()
      .then(() => {
        console.log(formData);
        axios
          .post('https://grant-portal-api.onrender.com/api/awardees', formData)
          .then((response) => {
            setLoading(false);
            toast.success('Awardee Created Successfully');
            setTimeout(() => {
              navigate('/awardees');
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data);
          });
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
              Create an Awardee
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Fill all the mandatory fields to create an awardee.
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
              <Grid container spacing={1} className='pt-2'>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="title"
                    placeholder="Enter Document Title"
                    label="Document Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={documentData.Title}
                    onChange={(e) => {
                      setDocumentData({ ...documentData, Title: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="description"
                    placeholder="Enter Document Description"
                    label="Document Description"
                    variant="outlined"
                    fullWidth
                    required
                    value={documentData.Description}
                    onChange={(e) => {
                      setDocumentData({ ...documentData, Description: e.target.value });
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="document"
                    type="file"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => {
                      setDocumentData({ ...documentData, File: e.target.files[0] });
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
                    Create
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
