import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  /* {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  */
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const user = useLocation().state;
  const [account, setAccount] = useState({
    displayName: '',
    role: '',
    email: '',
    avatarUrl: '',
  });

  useEffect(() => {
    let loggedInUser = null;

    if (user && user.loggedInUser) {
      loggedInUser = user.loggedInUser;
    } else {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        try {
          loggedInUser = JSON.parse(storedUser);
        } catch (e) {
          console.error('Failed to parse loggedInUser from localStorage');
        }
      }
    }

    if (!loggedInUser) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        try {
          const decoded = JSON.parse(atob(actualToken.split('.')[1]));
          loggedInUser = {
            username: decoded.unique_name || decoded.name || decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'User',
            role: decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '',
            email: decoded.email || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
            gender: decoded.gender || 'male'
          };
          localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        } catch (e) {
          console.error('Failed to parse jwtToken for user fallback');
        }
      }
    }

    if (loggedInUser) {
      const genderStr = (loggedInUser.gender || 'male').toLowerCase();
      const genderPath = genderStr === 'female' ? 'women' : 'men';

      // We can optionally store the generated avatar in localStorage so it doesn't change on every refresh
      let currentAvatar = localStorage.getItem('userAvatarUrl');
      if (!currentAvatar) {
        const randomId = Math.floor(Math.random() * 99) + 1;
        currentAvatar = `https://randomuser.me/api/portraits/${genderPath}/${randomId}.jpg`;
        localStorage.setItem('userAvatarUrl', currentAvatar);
      }

      setAccount({
        displayName: loggedInUser.username?.split('_').join(' ') || '',
        role: loggedInUser.role || '',
        email: loggedInUser.email || '',
        avatarUrl: currentAvatar,
      });
    }
  }, [user]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userAvatarUrl');
    setOpen(null);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.avatarUrl}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
