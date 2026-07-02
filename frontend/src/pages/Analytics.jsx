import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Timeline as TimeIcon,
  Comment as QuestionsIcon,
  BarChart as ChartIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';

const AnalyticsCard = ({ children, title, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <Card
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        background: '#FFFFFF',
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
      )}
      {children}
    </Card>
  </motion.div>
);

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7days');

  const stats = [
    {
      icon: <TrendingIcon sx={{ fontSize: 28 }} />,
      title: 'Total Documents',
      value: '5',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      delay: 0,
    },
    {
      icon: <QuestionsIcon sx={{ fontSize: 28 }} />,
      title: 'Questions Today',
      value: '12',
      gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
      delay: 0.1,
    },
    {
      icon: <TimeIcon sx={{ fontSize: 28 }} />,
      title: 'Avg Response Time',
      value: '0.8s',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
      delay: 0.2,
    },
    {
      icon: <ChartIcon sx={{ fontSize: 28 }} />,
      title: 'Accuracy Rate',
      value: '94%',
      gradient: 'linear-gradient(135deg, #10B981 0%, #6EE7B7 100%)',
      delay: 0.3,
    },
  ];

  const chartData = [
    { label: 'Uploads', value: 5, color: '#2563EB' },
    { label: 'Questions', value: 12, color: '#7C3AED' },
    { label: 'Pages', value: 48, color: '#EC4899' },
    { label: 'Chunks', value: 245, color: '#F59E0B' },
  ];

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
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
              Analytics
            </Typography>
            <Typography variant="body1" sx={{ color: '#6B7280' }}>
              Track your AI assistant performance and usage insights.
            </Typography>
          </Box>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
              sx={{ borderRadius: '12px' }}
            >
              <MenuItem value="7days">Last 7 Days</MenuItem>
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="90days">Last 90 Days</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((card, index) => (
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

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12}>
          <AnalyticsCard title="Performance Overview" delay={0.2}>
            <Grid container spacing={2}>
              {chartData.map((item, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Card
                    sx={{
                      p: 2,
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: item.color,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827' }}>
                      {item.value}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AnalyticsCard>
        </Grid>

        {/* System Performance */}
        <Grid item xs={12} lg={6}>
          <AnalyticsCard title="System Performance" delay={0.3}>
            <Grid container spacing={2}>
              {[
                { label: 'Avg Response Time', value: '0.8s', change: '-12%', positive: true },
                { label: 'Cache Hit Rate', value: '87%', change: '+5%', positive: true },
                { label: 'API Availability', value: '99.9%', change: '0%', positive: true },
                { label: 'Error Rate', value: '0.1%', change: '-2%', positive: true },
              ].map((metric, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                  >
                    <Card
                      sx={{
                        p: 2,
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>
                        {metric.label}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          {metric.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: metric.positive ? '#10B981' : '#EF4444',
                            fontWeight: 600,
                          }}
                        >
                          {metric.change}
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </AnalyticsCard>
        </Grid>

        {/* Usage Trends */}
        <Grid item xs={12} lg={6}>
          <AnalyticsCard title="Usage Trends" delay={0.4}>
            <Box sx={{ mt: 2 }}>
              {[
                { name: 'Questions Asked', count: 45, percentage: 75 },
                { name: 'Documents Uploaded', count: 5, percentage: 45 },
                { name: 'Successful Queries', count: 42, percentage: 93 },
                { name: 'Failed Queries', count: 3, percentage: 7 },
              ].map((trend, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {trend.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#2563EB' }}>
                        {trend.count}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: 8,
                        borderRadius: '8px',
                        backgroundColor: '#E5E7EB',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trend.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + idx * 0.05 }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                          borderRadius: '8px',
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </AnalyticsCard>
        </Grid>

        {/* Top Topics */}
        <Grid item xs={12}>
          <AnalyticsCard title="Most Searched Topics" delay={0.5}>
            <Grid container spacing={2}>
              {[
                { topic: 'Policies', count: 45, icon: '📋' },
                { topic: 'Benefits', count: 38, icon: '🎁' },
                { topic: 'HR Procedures', count: 32, icon: '📝' },
                { topic: 'Compensation', count: 28, icon: '💰' },
                { topic: 'Leave Policy', count: 22, icon: '🏖️' },
                { topic: 'Code of Conduct', count: 18, icon: '⚖️' },
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#2563EB',
                          backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                        {item.icon}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.topic}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                        {item.count} searches
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </AnalyticsCard>
        </Grid>
      </Grid>
    </Box>
  );
}

