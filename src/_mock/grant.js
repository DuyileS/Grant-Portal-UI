import axios from 'axios';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export const availableGrants = () => {
  return axios
    .get('https://localhost:7197/api/Grants')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      toast.error(err.response.data, { autoClose: 1000 });
      return err.response.data;
    });
};
