import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Check, Close, Delete, Download, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function ApplicantTableRow({
  selected,
  name,
  title,
  department,
  email,
  phoneNumber,
  status,
  handleClick,
  id,
  getApplicants,
  documentId,
}) {
  const [open, setOpen] = useState(null);

  const approveApplicant = () => {
    console.log('submtting');
    axios
      .post('https://localhost:7197/api/awardees')
      .then((response) => {
        getApplicants();
        setOpen(false);
        toast.success('Applicant Approved');
        console.log('submitted successfully');
      })
      .catch((err) => toast.error(err.response.data));
  };

  const deleteData = () => {
    console.log('submtting');
    setOpen(false);
    axios
      .delete(`https://localhost:7197/api/applicants/${id}`)
      .then((response) => {
        console.log(response);
        getApplicants();
        setOpen(false);

        toast.success('Deleted Successfully');
        console.log('submitted successfully');
      })
      .catch((err) => toast.error('An error occured'));
  };

  const viewDocument = () => {
    console.log('submtting');
    axios
      .get(`https://localhost:7197/api/documents/${documentId}`)
      .then((response) => {
        const document = response.data.filePath;
        setOpen(false);
        console.log('submitted successfully');
        window.location.href = document;
        toast.success('Document downloaded Successfully');
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{title}</TableCell>

        <TableCell>{department}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell align="center">{phoneNumber}</TableCell>

        <TableCell>
          <Label color={(status === 'approved' && 'unapproved') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div className="!flex !flex-col !gap-3">
          <Button variant="text" onClick={approveApplicant} color="success" fullwidth>
            <Check />
            Approve
          </Button>

          <Button variant="text" onClick={deleteData} color="error" fullwidth>
            <Close />
            Reject
          </Button>

          <Button variant="text" onClick={viewDocument} fullwidth>
            <Download />
            View Document
          </Button>

          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              navigate(`/editApplicant/${id}`, { state: { id } });
            }}
            color="warning"
            fullWidth
          >
            <Edit /> Edit
          </Button>

          <Button variant="text" onClick={deleteData} color="error" fullWidth>
            <Delete />
            Delete
          </Button>
        </div>
      </Popover>
    </>
  );
}
ApplicantTableRow.propTypes = {
  department: PropTypes.any,
  handleClick: PropTypes.func,
  phoneNumber: PropTypes.any,
  name: PropTypes.any,
  title: PropTypes.any,
  email: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
