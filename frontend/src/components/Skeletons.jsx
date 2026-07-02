import React from 'react';
import { Skeleton, Box, Card } from '@mui/material';
import { motion } from 'framer-motion';

export const StatCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <Card sx={{ p: 3, borderRadius: '16px' }}>
      <Skeleton variant="circular" width={56} height={56} sx={{ mb: 2 }} />
      <Skeleton width="80%" height={20} sx={{ mb: 1 }} />
      <Skeleton width="60%" height={40} sx={{ mb: 2 }} />
      <Skeleton width="100%" height={20} />
    </Card>
  </motion.div>
);

export const MessageSkeleton = () => (
  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
    <Skeleton variant="circular" width={36} height={36} />
    <Box sx={{ flex: 1 }}>
      <Skeleton width="70%" height={20} sx={{ mb: 0.5 }} />
      <Skeleton width="90%" height={20} sx={{ mb: 0.5 }} />
      <Skeleton width="80%" height={20} />
    </Box>
  </Box>
);

export const TableRowSkeleton = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, mb: 2 }}>
    {[...Array(7)].map((_, i) => (
      <Skeleton key={i} width="100%" height={40} />
    ))}
  </Box>
);
