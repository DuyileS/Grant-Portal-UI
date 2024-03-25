import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AppTasks from '../app-tasks';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [grants, setGrants] = useState([]);

  const [applicants, setApplicants] = useState([]);

  const [awardees, setAwardees] = useState([]);

  function getGrants() {
    axios
      .get('https://localhost:7197/api/Grants')
      .then((response) => {
        setGrants(response.data);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data, { autoClose: 1000 });
        }
        console.log(err);
      });
  }

  function getAwardees() {
    axios
      .get('https://localhost:7197/api/Awardees')
      .then((response) => {
        setAwardees(response.data);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data, { autoClose: 1000 });
        }
        console.log(err);
      });
  }

  function getApplicants() {
    axios
      .get('https://localhost:7197/api/Applicants')
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data, { autoClose: 1000 });
        }
        console.log(err);
      });
  }

  useEffect(() => {
    getGrants();
    getApplicants();
    getAwardees();
    console.log(grants);
  }, []);
  console.log(grants);

  function calculateGrantTotal() {
    let total = 0;
    grants.forEach((grant) => {
      total += grant.amount;
    });
    return total;
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Grants"
            total={grants.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_check.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Amount for Grants"
            total={calculateGrantTotal()}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_check.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Applicants"
            total={applicants.length}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Awardees"
            total={awardees.length}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_medal.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Areas of Discipline"
            chart={{
              series: [
                { label: 'Science', value: 4344 },
                { label: 'Technology', value: 5435 },
                { label: 'Health', value: 1443 },
                { label: 'Agriculture', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Project Completion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Populate Grant Portal Database' },
              { id: '2', name: 'Approve pending grant applications' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
