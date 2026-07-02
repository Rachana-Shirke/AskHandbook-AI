import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode, sidebarOpen } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchFocus, setSearchFocus] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <motion.div
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid #E5E7EB',
          color: '#1F2937',
          ml: sidebarOpen ? '280px' : '80px',
          width: sidebarOpen ? 'calc(100% - 280px)' : 'calc(100% - 80px)',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          {/* Search Bar */}
          <Box
            sx={{
              flex: 1,
              maxWidth: '500px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Search documents, questions..."
              variant="outlined"
              size="small"
              fullWidth
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1.5, color: '#9CA3AF' }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#F3F4F6',
                  border: searchFocus ? '2px solid #2563EB' : 'none',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: '#E5E7EB',
                  },
                },
              }}
            />
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                size="small"
                sx={{
                  color: '#6B7280',
                  '&:hover': {
                    color: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
              <IconButton
                size="small"
                onClick={toggleDarkMode}
                sx={{
                  color: '#6B7280',
                  '&:hover': {
                    color: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Divider */}
            <Divider orientation="vertical" flexItem sx={{ my: 1, mx: 1 }} />

            {/* User Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tooltip title="Profile">
                <Avatar
                  onClick={handleProfileMenuOpen}
                  sx={{
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    },
                  }}
                >
                  AD
                </Avatar>
              </Tooltip>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            minWidth: '280px',
            mt: 1,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ color: '#6B7280' }}>
            Signed in as
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Admin User
          </Typography>
        </Box>
        <Divider />
        <MenuItem>
          <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
          Settings
        </MenuItem>
        <MenuItem>
          <NotificationsIcon sx={{ mr: 2, fontSize: 20 }} />
          Notifications
        </MenuItem>
        <Divider />
        <MenuItem>
          <LogoutIcon sx={{ mr: 2, fontSize: 20, color: '#EF4444' }} />
          <Typography sx={{ color: '#EF4444' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </motion.div>
  );
}
