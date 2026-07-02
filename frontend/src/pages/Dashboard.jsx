import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Tab,
  Tabs,
  LinearProgress,
} from '@mui/material';
import {
  Description as DocumentsIcon,
  BookmarkAdded as PagesIcon,
  StorageTwoTone as ChunksIcon,
  QuestionAnswer as QuestionsIcon,
  TrendingUp as TrendingIcon,
  ArrowRight as ArrowRightIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats } = useAppContext();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const statCards = [
    {
      icon: <DocumentsIcon sx={{ fontSize: 28 }} />,
      title: 'Uploaded Documents',
      value: stats.uploadedDocs,
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      delay: 0,
    },
    {
      icon: <PagesIcon sx={{ fontSize: 28 }} />,
      title: 'Pages Indexed',
      value: stats.pagesIndexed,
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
      delay: 0.1,
    },
    {
      icon: <ChunksIcon sx={{ fontSize: 28 }} />,
      title: 'Text Chunks',
      value: stats.chunks,
      gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
      delay: 0.2,
    },
    {
      icon: <QuestionsIcon sx={{ fontSize: 28 }} />,
      title: 'Questions Asked',
      value: stats.questionsAsked,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
      delay: 0.3,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Employee Handbook Uploaded',
      description: 'Employee-Handbook-for-Nonprofits-and-Small-Businesses.pdf',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Document Indexed',
      description: '48 pages indexed, 245 chunks created',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Question Answered',
      description: 'Compare the both pdf and tell me which one is best',
      time: '30 minutes ago',
      status: 'completed',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280' }}>
            Welcome back! Here's your AI assistant performance overview.
          </Typography>
        </Box>
      </motion.div>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              icon={card.icon}
              title={card.title}
              value={card.value}
              gradient={card.gradient}
              delay={card.delay}
            />
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card
              sx={{
                p: 3,
                mb: 3,
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<DocumentsIcon />}
                  onClick={() => navigate('/upload')}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Upload PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TrendingIcon />}
                  onClick={() => navigate('/chat')}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Ask Question
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/documents')}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  View Documents
                </Button>
              </Box>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <Button
                  size="small"
                  endIcon={<ArrowRightIcon />}
                  onClick={() => navigate('/analytics')}
                >
                  View All
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: '#F9FAFB',
                        mb: 1.5,
                        borderLeft: '4px solid #2563EB',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#F3F4F6',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: '#111827',
                              mb: 0.5,
                            }}
                          >
                            {activity.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#6B7280',
                              mb: 0.5,
                            }}
                          >
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                            {activity.time}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: '#D1FAE5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#10B981',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        >
                          ✓
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                System Status
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    Vector Store
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>
                    Operational
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{
                    borderRadius: '8px',
                    height: 6,
                    backgroundColor: '#E5E7EB',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #10B981 0%, #6EE7B7 100%)',
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    LLM Service
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>
                    Ready
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={95}
                  sx={{
                    borderRadius: '8px',
                    height: 6,
                    backgroundColor: '#E5E7EB',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #10B981 0%, #6EE7B7 100%)',
                    },
                  }}
                />
              </Box>

              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    API Health
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>
                    Healthy
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={99}
                  sx={{
                    borderRadius: '8px',
                    height: 6,
                    backgroundColor: '#E5E7EB',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #10B981 0%, #6EE7B7 100%)',
                    },
                  }}
                />
              </Box>
            </Card>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
                border: '1px solid rgba(37, 99, 235, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                💡 Quick Tip
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.6 }}>
                Upload PDF handbooks to create a searchable knowledge base. The AI will automatically index pages and chunks for quick retrieval.
              </Typography>
              <Button
                size="small"
                sx={{
                  mt: 2,
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Learn More →
              </Button>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}