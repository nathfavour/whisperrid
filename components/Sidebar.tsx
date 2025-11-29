import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  useTheme, 
  LinearProgress 
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from './Icons';

interface SidebarProps {
  width: number;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ width, mobileOpen, setMobileOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: Icons.Dashboard, path: '/dashboard' },
    { name: 'Verifications', icon: Icons.Verifications, path: '/verifications' },
    { name: 'Reports', icon: Icons.Reports, path: '/reports' },
    { name: 'Settings', icon: Icons.Settings, path: '/settings' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        height: 64, 
        display: 'flex', 
        alignItems: 'center', 
        px: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        cursor: 'pointer'
      }} onClick={() => navigate('/')}>
        <Box sx={{ 
          width: 32, 
          height: 32, 
          bgcolor: 'primary.main', 
          borderRadius: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mr: 1.5,
          boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
        }}>
          <Icons.Verifications size={20} color="white" />
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '-0.5px' }}>
          WhisperrID
        </Typography>
      </Box>

      <List sx={{ px: 2, mt: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNav(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'primary.50') : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  border: isActive ? 1 : 0,
                  borderColor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'primary.200') : 'transparent',
                  '&:hover': {
                    bgcolor: isActive 
                      ? (theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'primary.100') 
                      : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'),
                    color: isActive ? 'primary.main' : 'text.primary',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          p: 2, 
          borderRadius: 3, 
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
          border: 1,
          borderColor: 'divider',
          backgroundImage: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to bottom right, rgba(30, 41, 59, 1), rgba(15, 23, 42, 1))' 
            : 'linear-gradient(to bottom right, #f1f5f9, #e2e8f0)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ 
              width: 32, 
              height: 32, 
              borderRadius: '50%', 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'white',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Icons.AI size={16} color={theme.palette.primary.main} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">AI Powered</Typography>
              <Typography variant="caption" color="text.secondary">System Online</Typography>
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: 4, bgcolor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ width: '92%', height: '100%', bgcolor: 'primary.main', borderRadius: 2 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: width }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};