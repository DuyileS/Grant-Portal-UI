/* eslint-disable*/
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
// import { Form, Field, Formik, ErrorMessage } from 'formik'

import { useRouter } from 'src/routes/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ Email: '', Password: '' });
  /* const handleClick = () => {
    router.push('/dashboard');
  }; */

  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email').required('Required'),
    password: Yup.string().required('Required'),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitForm = () => {
    setLoading(true);
    axios
      .post('https://localhost:7197/api/Auth/Login', formData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('jwtToken', `Bearer ${response.data.jwtToken}`);
        setLoading(false);
        toast.success('login Successful', { autoClose: 1000 });
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 1000 });
        setLoading(false);
      });
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          validationSchema={validationSchema}
          value={formData.Email}
          name="email"
          label="Email address"
          onChange={(e) => {
            setFormData({ ...formData, Email: e.target.value });
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.Password}
          onChange={(e) => {
            setFormData({ ...formData, Password: e.target.value });
          }}
          validationSchema={validationSchema}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          .
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={submitForm}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to RIIC</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link
              to="/register"
              variant="subtitle2"
              sx={{ ml: 0.5 }}
              className="text-blue-700 underline"
            >
              Get started
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
