import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Upload from './pages/Upload';
import Documents from './pages/Documents';
import Analytics from './pages/Analytics';
import { useAppContext } from './context/AppContext';

function App() {
  const { sidebarOpen } = useAppContext();

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            transition: 'margin-left 0.3s ease',
            ml: { xs: 0, sm: sidebarOpen ? '280px' : '80px' },
          }}
        >
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              bgcolor: '#F8FAFC',
              pt: 10,
              px: { xs: 2, sm: 3, md: 4 },
              pb: 4,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;