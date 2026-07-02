import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getDocuments, deleteDocument } from '../services/documentsApi';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const docs = await getDocuments();
      setDocuments(docs || []);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (doc) => {
    setSelectedDoc(doc);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDoc) return;

    try {
      setLoading(true);
      await deleteDocument(selectedDoc.name);
      await fetchDocuments();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedDoc(null);
      setLoading(false);
    }
  };

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
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
            Documents
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280' }}>
            Manage your uploaded PDF files and track their indexing status.
          </Typography>
        </Box>
      </motion.div>

      {/* Search and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <TextField
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ flex: 1, minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#9CA3AF' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchDocuments}
            disabled={loading}
            sx={{ borderRadius: '12px' }}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </Box>
      </motion.div>

      {/* Documents Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {loading ? (
          <Card
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
            }}
          >
            <CircularProgress />
          </Card>
        ) : documents.length === 0 ? (
          <Card
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
            }}
          >
            <FileIcon sx={{ fontSize: 64, color: '#D1D5DB', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#6B7280', mb: 1 }}>
              No documents yet
            </Typography>
            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
              Upload your first PDF to get started
            </Typography>
          </Card>
        ) : (
          <TableContainer
            component={Card}
            sx={{
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              '& .MuiTable-root': {
                minWidth: 750,
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280' }}>
                    Document Name
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#6B7280' }}>
                    Size
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280' }}>
                    Pages
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280' }}>
                    Chunks
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280' }}>
                    Status
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#6B7280' }}>
                    Upload Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocs.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FileIcon sx={{ color: '#EF4444' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {doc.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{doc.size}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={doc.pages} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={doc.chunks} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={doc.status}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          color: '#10B981',
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        {doc.uploadDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          title="Download"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(37, 99, 235, 0.1)',
                              color: '#2563EB',
                            },
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(doc)}
                          title="Delete"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              color: '#EF4444',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>Delete Document?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete <strong>{selectedDoc?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{ backgroundColor: '#EF4444' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
