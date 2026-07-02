import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [stats, setStats] = useState({
    uploadedDocs: 1,
    pagesIndexed: 48,
    chunks: 245,
    questionsAsked: 12,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        darkMode,
        toggleDarkMode,
        selectedPage,
        setSelectedPage,
        stats,
        setStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
