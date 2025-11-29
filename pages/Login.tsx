import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Divider,
  Link
} from '@mui/material';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
             <Card elevation={3} sx={{ maxWidth: 450, width: '100%', borderRadius: 3 }}>
                 <CardContent sx={{ p: 4 }}>
                     <Box sx={{ textAlign: 'center', mb: 4 }}>
                         <Typography variant="h5" fontWeight="bold" gutterBottom>Securely access your account</Typography>
                     </Box>
                     <form onSubmit={handleLogin}>
                         <Box sx={{ 
                             height: 120, 
                             bgcolor: '#f1f5f9', 
                             borderRadius: 2, 
                             display: 'flex', 
                             alignItems: 'center', 
                             justifyContent: 'center', 
                             border: '2px dashed #cbd5e1',
                             mb: 3
                         }}>
                             <Typography color="text.secondary" fontWeight="medium">QR Login / Biometrics</Typography>
                         </Box>
                         
                         <Divider sx={{ mb: 3 }}>
                             <Typography variant="caption" color="text.secondary">Or continue with email</Typography>
                         </Divider>

                         <TextField 
                            fullWidth 
                            label="Email address" 
                            variant="outlined" 
                            type="email" 
                            required 
                            sx={{ mb: 3 }}
                         />
                         
                         <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            size="large"
                            disabled={loading}
                            sx={{ 
                                bgcolor: '#0f172a', 
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'bold',
                                '&:hover': { bgcolor: '#1e293b' }
                            }}
                         >
                             {loading ? 'Authenticating...' : 'Sign In'}
                         </Button>
                     </form>
                     <Box sx={{ mt: 3, textAlign: 'center' }}>
                         <Typography variant="body2" color="text.secondary">
                             Don't have an account? <Link component="button" variant="body2" fontWeight="bold" sx={{ color: '#0f172a', textDecoration: 'none' }}>Sign up</Link>
                         </Typography>
                     </Box>
                 </CardContent>
             </Card>
        </Box>
    )
}