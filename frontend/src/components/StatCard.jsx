import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, title, value, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8 }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: '16px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: gradient || 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        {/* Icon Background */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '12px',
            background: 'rgba(37, 99, 235, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            color: '#2563EB',
            fontSize: '1.5rem',
          }}
        >
          {Icon}
        </Box>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            color: '#6B7280',
            fontWeight: 500,
            mb: 1,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </Typography>

        {/* Value */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#111827',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>

        {/* Bottom accent */}
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
            Last 30 days
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#10B981',
              fontWeight: 600,
            }}
          >
            ↑ 12%
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
}
