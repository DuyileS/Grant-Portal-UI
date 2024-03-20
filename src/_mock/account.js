import { useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------
/*axios
  .post('https://localhost:7197/api/Auth/Login', formData)
  .then((response) => {
    console.log(response.data);
    localStorage.setItem('jwtToken', `Bearer ${response.data.jwtToken}`);
    setLoading(false);
  })
  .catch((err) => {
    setLoading(false);
  });*/

export const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
