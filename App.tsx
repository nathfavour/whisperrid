import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Avatar, 
  useMediaQuery,
  PaletteMode
} from '@mui/material';
import { Sidebar } from './components/Sidebar';
import { Icons } from './components/Icons';
import { Dashboard } from './pages/Dashboard';
import { VerificationsList } from './pages/VerificationsList';
import { CaseReview } from './pages/CaseReview';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';

// Brand Colors
const brandColor = '#10b981';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: brandColor,
    },
    secondary: {
      main: '#6366f1', // Indigo
    },
    background: {
      default: mode === 'dark' ? '#0f172a' : '#f8fafc',
      paper: mode === 'dark' ? '#1e293b' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f8fafc' : '#0f172a',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
    },
    divider: mode === 'dark' ? '#334155' : '#e2e8f0',
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { textTransform: 'none' as const, fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'dark' ? 'none' : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: `1px solid ${mode === 'dark' ? '#334155' : '#e2e8f0'}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#0f172a' : '#ffffff',
          borderRight: `1px solid ${mode === 'dark' ? '#334155' : '#e2e8f0'}`,
        }
      }
    }
  },
});

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState<PaletteMode>('dark');
  const isMobile = useMediaQuery('(max-width:900px)');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const drawerWidth = 260;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar 
          width={drawerWidth} 
          mobileOpen={sidebarOpen} 
          setMobileOpen={setSidebarOpen} 
        />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden'
          }}
        >
          <AppBar 
            position="sticky" 
            elevation={0}
            sx={{ 
              backgroundColor: 'background.default',
              borderBottom: 1,
              borderColor: 'divider',
              backdropFilter: 'blur(8px)',
              background: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', itemsCenter: 'center' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
                >
                  <Icons.Menu />
                </IconButton>
                {isMobile && (
                  <Typography variant="h6" noWrap component="div" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                    WhisperrID
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
                  {mode === 'dark' ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
                </IconButton>
                <IconButton sx={{ color: 'text.secondary' }}>
                  <Badge color="error" variant="dot">
                    <Icons.Bell size={20} />
                  </Badge>
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, borderLeft: 1, borderColor: 'divider', pl: 2 }}>
                   <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right' }}>
                      <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>Alex Admin</Typography>
                      <Typography variant="caption" color="text.secondary">Security Officer</Typography>
                   </Box>
                   <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.875rem' }}>A</Avatar>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const AppRoutes = () => {
    const location = useLocation();
    const isPublic = location.pathname === '/' || location.pathname === '/login';
    
    // We need a separate theme provider for public pages if they don't share the main layout's theme
    // For simplicity, we wrap everything in a default dark theme for landing page, but MainLayout has its own.
    // Let's reuse a basic ThemeProvider for public routes
    const publicTheme = createTheme(getDesignTokens('dark'));

    if (isPublic) {
        return (
          <ThemeProvider theme={publicTheme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
        );
    }

    return (
        <MainLayout>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/verifications" element={<VerificationsList />} />
                <Route path="/cases/:id" element={<CaseReview />} />
                <Route path="/reports" element={<Box p={4}><Typography variant="h5">Reports Module - Coming Soon</Typography></Box>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </MainLayout>
    );
};

export default function App() {
  return (
    <HashRouter>
        <AppRoutes />
    </HashRouter>
  );
}