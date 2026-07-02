import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Typography,
  Card,
  Chip,
  CircularProgress,
  Tooltip,
  Button,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as AIIcon,
  Person as PersonIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  FiberManualRecord as StatusIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { askQuestion } from '../services/chatApi';
import SourceCard from '../components/SourceCard';

const TypingIndicator = () => (
  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', py: 1 }}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#2563EB',
          }}
        />
      </motion.div>
    ))}
  </Box>
);

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! 👋 I\'m your AI-powered handbook assistant. I can help you find information, answer questions, and provide insights from your uploaded documents. How can I help you today?',
      timestamp: new Date(),
      sources: [],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const result = await askQuestion(inputValue);

      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: result.answer,
        timestamp: new Date(),
        sources: result.sources || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Sorry, I encountered an error processing your question. Please try again.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '1000px', mx: 'auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ask Handbook
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280' }}>
            Chat with your handbook AI assistant
          </Typography>
        </Box>
      </motion.div>

      {/* Messages Container */}
      <Paper
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          p: 3,
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 35px,
              rgba(37, 99, 235, 0.02) 35px,
              rgba(37, 99, 235, 0.02) 70px
            )
          `,
        }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
              layout
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  mb: 3,
                  alignItems: 'flex-end',
                  gap: 1,
                }}
              >
                {/* AI Avatar */}
                {message.type === 'ai' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                        flexShrink: 0,
                      }}
                    >
                      <AIIcon />
                    </Avatar>
                  </motion.div>
                )}

                {/* Message Bubble */}
                <motion.div style={{ maxWidth: '75%' }} layout>
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: '16px',
                      background:
                        message.type === 'user'
                          ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
                          : message.isError
                          ? 'rgba(239, 68, 68, 0.1)'
                          : '#F3F4F6',
                      color: message.type === 'user' ? '#FFFFFF' : '#111827',
                      border:
                        message.type === 'user'
                          ? 'none'
                          : message.isError
                          ? '1px solid rgba(239, 68, 68, 0.3)'
                          : '1px solid #E5E7EB',
                      boxShadow:
                        message.type === 'user'
                          ? '0 4px 12px rgba(37, 99, 235, 0.3)'
                          : 'none',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {message.content}
                    </Typography>

                    {/* Timestamp and Actions */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1.5,
                        pt: 1,
                        borderTop:
                          message.type === 'user'
                            ? '1px solid rgba(255, 255, 255, 0.2)'
                            : 'none',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            message.type === 'user'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : '#9CA3AF',
                        }}
                      >
                        {message.timestamp?.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>

                      {message.type === 'ai' && !message.isError && (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Copy">
                            <IconButton
                              size="small"
                              onClick={() => copyToClipboard(message.content)}
                              sx={{
                                color: '#6B7280',
                                '&:hover': { color: '#2563EB' },
                              }}
                            >
                              <CopyIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </Card>

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{ marginTop: 12, maxWidth: '75%' }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          color: '#6B7280',
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        📚 Sources
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {message.sources.map((source, idx) => (
                          <SourceCard key={idx} source={source} />
                        ))}
                      </Box>
                    </motion.div>
                  )}
                </motion.div>

                {/* User Avatar */}
                {message.type === 'user' && (
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                      flexShrink: 0,
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                )}
              </Box>
            </motion.div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  }}
                >
                  <AIIcon />
                </Avatar>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: '16px',
                    backgroundColor: '#F3F4F6',
                  }}
                >
                  <TypingIndicator />
                </Card>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </Paper>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-end',
          }}
        >
          <TextField
            ref={inputRef}
            fullWidth
            placeholder="Ask me anything about your handbooks..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            multiline
            maxRows={4}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
              },
            }}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Tooltip title="Send (Ctrl+Enter)">
              <span>
                <IconButton
                  onClick={handleSendMessage}
                  disabled={loading || !inputValue.trim()}
                  sx={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    color: '#FFFFFF',
                    '&:hover': {
                      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
                    },
                    '&:disabled': {
                      background: '#E5E7EB',
                      color: '#9CA3AF',
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </span>
            </Tooltip>
          </motion.div>
        </Box>
      </motion.div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ marginTop: 24 }}
        >
          <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 1.5 }}>
            Suggested questions:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[
              'Compare the both pdf and tell me which one is best',
              'What are the key policies in the handbook?',
              'Summarize the content for me',
            ].map((question, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  label={question}
                  onClick={() => {
                    setInputValue(question);
                    inputRef.current?.focus();
                  }}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                    border: '1px solid #E5E7EB',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#E5E7EB',
                      borderColor: '#2563EB',
                      color: '#2563EB',
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </motion.div>
      )}
    </Box>
  );
}
