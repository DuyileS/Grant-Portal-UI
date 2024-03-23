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
import { Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function GrantTableRow({
  selected,
  title,
  description,
  amount,
  criteria,
  deadline,
  dateCreated,
  handleClick,
  id,
  getGrants,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const deleteData = () => {
    console.log(id);
    axios
      .delete(`https://localhost:7197/api/grants/${id}`)
      .then((response) => {
        getGrants();
        toast.success('Deleted Successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
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
        <div className="!flex !flex-col !gap-3">
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              navigate(`/editGrant/${id}`, { state: { id } });
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
