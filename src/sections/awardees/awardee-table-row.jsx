import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Delete, Download, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AwardeeTableRow({
  selected,
  name,
  avatarUrl,
  telephoneNumber,
  emailAddress,
  areaOfSpecialization,
  amount,
  handleClick,
  id,
  getAwardees,
  documentId,
}) {
  const [open, setOpen] = useState(null);

  const deleteData = () => {
    console.log('submtting');
    axios
      .delete(`https://grant-portal-api.onrender.com/api/awardees/${id}`)
      .then((response) => {
        getAwardees();
        toast.success('Deleted Successfully');
        console.log('submitted successfully');
      })
      .catch((err) => toast.error(err.response.data));
  };

  const viewDocument = () => {
    console.log('submtting');
    axios
      .get(`https://grant-portal-api.onrender.com/api/documents/${documentId}`)
      .then((response) => {
        const document = response.data.filePath;
        setOpen(false);
        console.log('submitted successfully');
        window.location.href = document;
        toast.success('Document downloaded Successfully');
      })
      .catch((err) => toast.error(err.response.data));
  };

  const navigate = useNavigate();

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
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{telephoneNumber}</TableCell>

        <TableCell>{emailAddress}</TableCell>

        <TableCell align="center">{areaOfSpecialization}</TableCell>

        <TableCell>{amount}</TableCell>

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
          <Button variant="text" onClick={viewDocument} fullwidth>
            <Download />
            View Document
          </Button>

          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              navigate(`/editAwardee/${id}`, { state: { id } });
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

AwardeeTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  areaOfSpecialization: PropTypes.any,
  name: PropTypes.any,
  amount: PropTypes.any,
  selected: PropTypes.any,
  telephoneNumber: PropTypes.any,
  emailAddress: PropTypes.any,
};

/*

chunk-X3B7SAOS.js?v=963c9e4e:16737 Uncaught TypeError: destroy is not a function
    at safelyCallDestroy (chunk-X3B7SAOS.js?v=963c9e4e:16737:13)
    at commitHookEffectListUnmount (chunk-X3B7SAOS.js?v=963c9e4e:16864:19)
    at commitPassiveUnmountInsideDeletedTreeOnFiber (chunk-X3B7SAOS.js?v=963c9e4e:18279:17)
    at commitPassiveUnmountEffectsInsideOfDeletedTree_begin (chunk-X3B7SAOS.js?v=963c9e4e:18241:13)
    at commitPassiveUnmountEffects_begin (chunk-X3B7SAOS.js?v=963c9e4e:18177:19)
    at commitPassiveUnmountEffects (chunk-X3B7SAOS.js?v=963c9e4e:18165:11)
    at flushPassiveEffectsImpl (chunk-X3B7SAOS.js?v=963c9e4e:19485:11)
    at flushPassiveEffects (chunk-X3B7SAOS.js?v=963c9e4e:19443:22)
    at performSyncWorkOnRoot (chunk-X3B7SAOS.js?v=963c9e4e:18864:11)
    at flushSyncCallbacks (chunk-X3B7SAOS.js?v=963c9e4e:9135:30)

*/
