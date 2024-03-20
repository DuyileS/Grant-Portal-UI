import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const updateData = (formData) => {
  console.log('submtting');
  axios
    .put('https://localhost:7197/api/grants', formData)
    .then((response) => {
      toast.success('Updated Successfully');
      console.log('submitted successfully');
    })
    .catch((err) => toast.error(err.response.data));
};

const deleteData = (formData) => {
  console.log('submtting');
  axios
    .delete('https://localhost:7197/api/grants', formData)
    .then((response) => {
      toast.success('Deleted Successfully');
      console.log('submitted successfully');
    })
    .catch((err) => toast.error(err.response.data));
};

export default function GrantTableRow({
  selected,
  title,
  description,
  amount,
  criteria,
  deadline,
  dateCreated,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{description}</TableCell>

        <TableCell>{amount}</TableCell>

        <TableCell align="center">{criteria}</TableCell>

        <TableCell>
          <Label>{deadline}</Label>
        </TableCell>
        <TableCell>{dateCreated}</TableCell>

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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Link to="/editGrant">
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </Link>
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

GrantTableRow.propTypes = {
  title: PropTypes.any,
  handleClick: PropTypes.func,
  criteria: PropTypes.any,
  description: PropTypes.any,
  deadline: PropTypes.any,
  amount: PropTypes.any,
  selected: PropTypes.any,
  dateCreated: PropTypes.any,
};
