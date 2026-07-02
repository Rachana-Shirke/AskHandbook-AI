import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Chip,
  Alert,
  Divider,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as PDFIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  FileCopy as FileIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadHandbook } from '../services/uploadApi';
import { useAppContext } from '../context/AppContext';

const FileSize = ({ bytes }) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export default function Upload() {
  const { stats, setStats } = useAppContext();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const newFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    );

    if (newFiles.length === 0) {
      setErrorMessage('Please drop PDF files only');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    addFiles(newFiles);
  };

  const handleFileInput = (e) => {
    const newFiles = Array.from(e.target.files);
    addFiles(newFiles);
  };

  const addFiles = (newFiles) => {
    const filesWithStatus = newFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      status: 'pending',
      progress: 0,
      error: null,
    }));

    setFiles((prev) => [...prev, ...filesWithStatus]);
    setErrorMessage('');
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setSuccessMessage('');
    setErrorMessage('');

    let successCount = 0;
    let failureCount = 0;

    for (const fileItem of files) {
      if (fileItem.status === 'completed') continue;

      try {
        // Simulate progress
        setUploadProgress((prev) => ({
          ...prev,
          [fileItem.id]: 30,
        }));

        // Upload file
        await uploadHandbook(fileItem.file);

        // Update progress
        setUploadProgress((prev) => ({
          ...prev,
          [fileItem.id]: 100,
        }));

        // Update file status
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id ? { ...f, status: 'completed' } : f
          )
        );

        successCount++;

        // Update stats
        setStats((prev) => ({
          ...prev,
          uploadedDocs: prev.uploadedDocs + 1,
          pagesIndexed: prev.pagesIndexed + 10,
          chunks: prev.chunks + 50,
        }));
      } catch (error) {
        console.error('Upload failed:', error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: 'error', error: 'Upload failed' }
              : f
          )
        );
        failureCount++;
      }
    }

    setUploading(false);

    if (successCount > 0) {
      setSuccessMessage(`${successCount} file(s) uploaded successfully!`);
    }
    if (failureCount > 0) {
      setErrorMessage(`${failureCount} file(s) failed to upload.`);
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
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
            Upload Handbooks
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280' }}>
            Upload PDF files to build your knowledge base. Your files will be automatically indexed and made searchable.
          </Typography>
        </Box>
      </motion.div>

      {/* Alerts */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Alert
            severity="success"
            onClose={() => setSuccessMessage('')}
            sx={{ mb: 2, borderRadius: '12px' }}
          >
            {successMessage}
          </Alert>
        </motion.div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Alert
            severity="error"
            onClose={() => setErrorMessage('')}
            sx={{ mb: 2, borderRadius: '12px' }}
          >
            {errorMessage}
          </Alert>
        </motion.div>
      )}

      {/* Drag and Drop Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: '16px',
            border: '2px dashed',
            borderColor: dragActive ? '#2563EB' : '#D1D5DB',
            backgroundColor: dragActive ? 'rgba(37, 99, 235, 0.05)' : '#F9FAFB',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            mb: 3,
            '&:hover': {
              borderColor: '#2563EB',
              backgroundColor: 'rgba(37, 99, 235, 0.05)',
            },
          }}
        >
          <motion.div
            animate={{ scale: dragActive ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <CloudUploadIcon
              sx={{
                fontSize: 64,
                color: dragActive ? '#2563EB' : '#9CA3AF',
                mb: 2,
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {dragActive ? 'Drop your files here' : 'Drag and drop your PDFs'}
          </Typography>

          <Typography variant="body2" sx={{ color: '#6B7280', mb: 2 }}>
            or click the button below to browse
          </Typography>

          <Button
            variant="contained"
            component="label"
            size="large"
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Choose PDF Files
            <input
              ref={fileInputRef}
              hidden
              multiple
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
            />
          </Button>

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: '#9CA3AF',
              mt: 2,
            }}
          >
            Supported formats: PDF • Max file size: 50MB
          </Typography>
        </Card>
      </motion.div>

      {/* Files List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card
            sx={{
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              overflow: 'hidden',
              mb: 3,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                backgroundColor: '#F9FAFB',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {files.length} File{files.length !== 1 ? 's' : ''} Selected
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Total size: {FileSize(files.reduce((sum, f) => sum + f.file.size, 0))}
                </Typography>
              </Box>
              <Button
                size="small"
                onClick={clearAll}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  color: '#EF4444',
                }}
              >
                Clear All
              </Button>
            </Box>

            {/* Files List */}
            <List sx={{ p: 0 }}>
              <AnimatePresence>
                {files.map((fileItem, index) => (
                  <motion.div
                    key={fileItem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem
                      divider={index < files.length - 1}
                      sx={{
                        backgroundColor:
                          fileItem.status === 'error'
                            ? 'rgba(239, 68, 68, 0.05)'
                            : fileItem.status === 'completed'
                            ? 'rgba(16, 185, 129, 0.05)'
                            : 'transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        },
                      }}
                    >
                      <ListItemIcon>
                        {fileItem.status === 'completed' ? (
                          <CheckCircleIcon sx={{ color: '#10B981' }} />
                        ) : fileItem.status === 'error' ? (
                          <ErrorIcon sx={{ color: '#EF4444' }} />
                        ) : (
                          <PDFIcon sx={{ color: '#EF4444' }} />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={fileItem.file.name}
                        secondary={
                          <>
                            <Typography variant="caption" sx={{ color: '#6B7280' }}>
                              {FileSize(fileItem.file.size)}
                            </Typography>
                            {fileItem.status === 'error' && (
                              <>
                                {' • '}
                                <Typography
                                  variant="caption"
                                  sx={{ color: '#EF4444' }}
                                >
                                  {fileItem.error}
                                </Typography>
                              </>
                            )}
                          </>
                        }
                      />

                      {/* Progress or Status */}
                      {fileItem.status === 'pending' && (
                        <Box sx={{ width: 200 }}>
                          <LinearProgress
                            variant="determinate"
                            value={uploadProgress[fileItem.id] || 0}
                            sx={{
                              borderRadius: '8px',
                              height: 4,
                              backgroundColor: '#E5E7EB',
                              '& .MuiLinearProgress-bar': {
                                background:
                                  'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: '#9CA3AF', mt: 0.5 }}
                          >
                            {uploadProgress[fileItem.id] || 0}%
                          </Typography>
                        </Box>
                      )}

                      {fileItem.status === 'completed' && (
                        <Chip
                          label="Uploaded"
                          size="small"
                          icon={<CheckCircleIcon />}
                          sx={{
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: '#10B981',
                          }}
                        />
                      )}

                      {fileItem.status === 'error' && (
                        <Chip
                          label="Failed"
                          size="small"
                          icon={<ErrorIcon />}
                          sx={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                          }}
                        />
                      )}

                      {/* Delete Button */}
                      <IconButton
                        edge="end"
                        onClick={() => removeFile(fileItem.id)}
                        disabled={fileItem.status === 'pending' && uploading}
                        sx={{ ml: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </Card>
        </motion.div>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleUpload}
              disabled={uploading || files.every((f) => f.status === 'completed')}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 500,
                minWidth: 200,
              }}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Add More
            </Button>
          </Box>
        </motion.div>
      )}

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ marginTop: 40 }}
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
            📋 What happens after upload?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip label="1" color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  PDF Processing
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Your PDF is extracted and analyzed
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip label="2" color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Text Chunking
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Content is split into searchable chunks
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip label="3" color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Vector Embedding
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Embeddings are created for semantic search
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip label="4" color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Ready to Query
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  Ask questions using the Chat feature
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}
