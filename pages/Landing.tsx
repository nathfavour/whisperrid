import React from 'react';
import { Icons } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
  AppBar,
  Toolbar
} from '@mui/material';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#0f172a', minHeight: '100vh', color: 'white', fontFamily: 'Inter' }}>
      {/* Nav */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 32, height: 32, bgcolor: '#10b981', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icons.Verifications size={20} color="white" />
                    </Box>
                    <Typography variant="h6" fontWeight="bold">WhisperrID</Typography>
                </Box>
                
                <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {['Product', 'Solutions', 'Pricing'].map(item => (
                        <Typography key={item} variant="body2" sx={{ cursor: 'pointer', color: '#94a3b8', '&:hover': { color: 'white' }, fontWeight: 500 }}>
                            {item}
                        </Typography>
                    ))}
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button color="inherit" sx={{ textTransform: 'none', color: '#e2e8f0', '&:hover': { color: 'white' } }}>Contact Sales</Button>
                    <Button 
                        onClick={() => navigate('/login')}
                        variant="contained" 
                        sx={{ 
                            bgcolor: '#10b981', 
                            borderRadius: 10, 
                            textTransform: 'none', 
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                            '&:hover': { bgcolor: '#059669' }
                        }}
                    >
                        Get Started
                    </Button>
                </Stack>
            </Toolbar>
        </Container>
      </AppBar>

      {/* Hero */}
      <Box sx={{ pt: 20, pb: 10, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <Box sx={{ 
            position: 'absolute', 
            top: '20%', 
            left: '50%', 
            transform: 'translate(-50%, -20%)', 
            width: 600, 
            height: 600, 
            bgcolor: 'rgba(16, 185, 129, 0.2)', 
            borderRadius: '50%', 
            filter: 'blur(120px)', 
            zIndex: 0 
        }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" fontWeight="800" sx={{ mb: 3, letterSpacing: -1 }}>
            Seamlessly onboard users with <Box component="span" sx={{ 
                background: 'linear-gradient(to right, #34d399, #a7f3d0)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
            }}>WhisperrID</Box>
          </Typography>
          <Typography variant="h6" color="#94a3b8" sx={{ mb: 6, maxWidth: 700, mx: 'auto', lineHeight: 1.6, fontWeight: 400 }}>
            A modular, API-first KYC frontend for document & biometric verification, AML/PEP screening, and trust scoring. Designed for flexibility and global compliance.
          </Typography>
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="contained" 
            size="large"
            sx={{ 
                bgcolor: '#10b981', 
                borderRadius: 50, 
                px: 5, 
                py: 2,
                fontSize: '1.1rem',
                textTransform: 'none', 
                fontWeight: 'bold',
                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                '&:hover': { bgcolor: '#059669', transform: 'scale(1.02)' },
                transition: 'all 0.2s'
            }}
          >
            Get Started for Free
          </Button>

          <Box sx={{ mt: 10, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
             <Box component="img" src="https://picsum.photos/1200/600" sx={{ width: '100%', display: 'block', opacity: 0.9 }} />
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: 12, bgcolor: 'rgba(15, 23, 42, 0.5)' }}>
          <Container maxWidth="lg">
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Why WhisperrID?</Typography>
                  <Typography color="#94a3b8">Comprehensive suite of features to streamline your KYC process.</Typography>
              </Box>

              <Grid container spacing={4}>
                  <FeatureCard 
                    icon={Icons.Verifications} 
                    title="Robust Security" 
                    desc="Advanced encryption and fraud detection mechanisms to protect user data and prevent fraudulent activities."
                  />
                  <FeatureCard 
                    icon={Icons.Liveness} 
                    title="Biometric Verification" 
                    desc="Utilize biometric data, such as facial recognition and fingerprint scanning, for enhanced identity verification."
                  />
                  <FeatureCard 
                    icon={Icons.User} 
                    title="User-Friendly Interface" 
                    desc="Intuitive design and clear instructions guide users through the verification process, minimizing friction."
                  />
              </Grid>
          </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="md" sx={{ py: 12 }}>
          <Box sx={{ 
              borderRadius: 6, 
              p: 8, 
              textAlign: 'center', 
              background: 'linear-gradient(to right, #064e3b, #0f172a)', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              position: 'relative',
              overflow: 'hidden'
          }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>Ready to streamline your KYC?</Typography>
                  <Typography color="#cbd5e1" sx={{ mb: 5, maxWidth: 500, mx: 'auto' }}>Start using WhisperrID today and experience the difference.</Typography>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="contained" 
                    size="large"
                    sx={{ 
                        bgcolor: '#10b981', 
                        borderRadius: 50, 
                        px: 4, 
                        textTransform: 'none', 
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#059669' }
                    }}
                  >
                    Get Started
                  </Button>
              </Box>
          </Box>
      </Container>
    </Box>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <Grid item xs={12} md={4}>
        <Box sx={{ 
            p: 4, 
            height: '100%', 
            borderRadius: 4, 
            border: '1px solid rgba(255,255,255,0.05)', 
            bgcolor: '#0f172a',
            transition: 'all 0.2s',
            '&:hover': { transform: 'translateY(-5px)', borderColor: 'rgba(16, 185, 129, 0.3)' } 
        }}>
            <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 2, 
                bgcolor: 'rgba(16, 185, 129, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 3 
            }}>
                <Icon size={24} color="#34d399" />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{title}</Typography>
            <Typography variant="body2" color="#94a3b8" sx={{ lineHeight: 1.6 }}>{desc}</Typography>
        </Box>
    </Grid>
);