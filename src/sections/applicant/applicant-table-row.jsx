import { useState } from 'react';
import { Link } from 'react-router-dom';
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
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{title}</TableCell>

        <TableCell>{department}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell align="center">{phoneNumber}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:eye" sx={{ mr: 2 }} />
          Approve
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:eye" sx={{ mr: 2 }} />
          Reject
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:eye" sx={{ mr: 2 }} />
          View Document
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Link to="editApplicant">
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
