import React from 'react';
import { Card, Box, Typography, IconButton, Chip } from '@mui/material';
import { OpenInNew as OpenIcon, Description as FileIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function SourceCard({ source }) {
  // Extract filename and page info
  const filename = source.source || source.filename || 'Document';
  const page = source.page || source.page_number || source.metadata?.page || 'N/A';
  const score = source.score || source.confidence || 0.95;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        sx={{
          p: 2,
          borderRadius: '12px',
          backgroundColor: '#F9FAFB',
          border: '1px solid #E5E7EB',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#F3F4F6',
            borderColor: '#2563EB',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <FileIcon sx={{ fontSize: 18, color: '#EF4444' }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#111827',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {filename}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
              <Chip
                label={`Page ${page}`}
                size="small"
                variant="outlined"
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                }}
              />
              <Chip
                label={`${Math.round(score * 100)}% relevance`}
                size="small"
                sx={{
                  height: 24,
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563EB',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              size="small"
              sx={{
                color: '#2563EB',
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                },
              }}
              title="Open PDF"
            >
              <OpenIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </motion.div>
        </Box>
      </Card>
    </motion.div>
  );
}
