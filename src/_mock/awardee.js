import axios from 'axios';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export const availableAwardees = () => {
  return axios
    .get('https://grant-portal-api.onrender.com/api/Awardees')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      toast.error(err.response.data, { autoClose: 1000 });
      return err.response.data;
    });
};
