import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  CloudUpload as UploadIcon,
  Folder as DocumentsIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const drawerWidth = 280;
const collapsedWidth = 80;

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Chat', icon: <ChatIcon />, path: '/chat' },
  { label: 'Upload', icon: <UploadIcon />, path: '/upload' },
  { label: 'Documents', icon: <DocumentsIcon />, path: '/documents' },
  { label: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
];

const secondaryItems = [
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { label: 'About', icon: <InfoIcon />, path: '/about' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useAppContext();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ x: -drawerWidth }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : collapsedWidth,
            boxSizing: 'border-box',
            backgroundColor: '#111827',
            color: '#FFFFFF',
            border: 'none',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            position: 'fixed',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 70,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Avatar
                sx={{
                  bgcolor: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  width: 40,
                  height: 40,
                  fontSize: '1.5rem',
                }}
              >
                📘
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  HandbookIQ
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  AI Assistant
                </Typography>
              </Box>
            </motion.div>
          )}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
              },
            }}
          >
            {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Main Menu */}
        <List sx={{ flex: 1, px: 1, py: 2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.label}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: isActive
                        ? 'rgba(37, 99, 235, 0.2)'
                        : 'transparent',
                      color: isActive ? '#2563EB' : '#FFFFFF',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.15)',
                        color: '#2563EB',
                      },
                      pl: 2,
                      pr: 1.5,
                      py: 1.2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? '#2563EB' : '#9CA3AF',
                        minWidth: 40,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: '0.95rem',
                            fontWeight: isActive ? 600 : 500,
                          }}
                        />
                      </motion.div>
                    )}
                    {isActive && !sidebarOpen && (
                      <Box
                        sx={{
                          width: 4,
                          height: 24,
                          bgcolor: '#2563EB',
                          borderRadius: '2px',
                          ml: 'auto',
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>

        {/* Divider */}
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />

        {/* Secondary Menu */}
        <List sx={{ px: 1, py: 1 }}>
          {secondaryItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.15)',
                      color: '#2563EB',
                    },
                    pl: 2,
                    pr: 1.5,
                    py: 1.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: '#9CA3AF',
                      minWidth: 40,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {sidebarOpen && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        {/* Bottom Section */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {sidebarOpen && (
            <Box
              sx={{
                bgcolor: 'rgba(37, 99, 235, 0.1)',
                borderRadius: '12px',
                p: 1.5,
                mb: 1,
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Version 1.0
              </Typography>
            </Box>
          )}
          <ListItemButton
            sx={{
              borderRadius: '12px',
              color: '#FFFFFF',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: '#EF4444',
                minWidth: 40,
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {sidebarOpen && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: '0.95rem' }}
              />
            )}
          </ListItemButton>
        </Box>
      </Drawer>
    </motion.div>
  );
}