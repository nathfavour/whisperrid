import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { VerificationCase, VerificationStatus } from '../types';
import { generateRiskAssessment } from '../services/geminiService';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Divider,
  CircularProgress,
  useTheme,
  Chip
} from '@mui/material';

const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mb: 1, '&:last-child': { borderBottom: 0, mb: 0 } }}>
        <Typography variant="caption" display="block" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="body2" fontWeight="medium" color="text.primary">
            {value}
        </Typography>
    </Box>
);

export const CaseReview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const caseData = location.state?.caseData as VerificationCase;
  
  const [activeTab, setActiveTab] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!caseData) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography>Case not found.</Typography>
            <Button onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>Return to Dashboard</Button>
        </Box>
      );
  }

  const handleGenerateAI = async () => {
    setIsAnalyzing(true);
    const result = await generateRiskAssessment(caseData);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', animation: 'fadeIn 0.5s' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: 'action.hover' }}>
                <Icons.ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
            </IconButton>
            <Avatar src={caseData.user.avatar} sx={{ width: 64, height: 64 }} />
            <Box>
                <Typography variant="h5" fontWeight="bold">
                    {caseData.user.firstName} {caseData.user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Case ID: #{caseData.id} • Submitted on {caseData.date}
                </Typography>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
             <Button 
                variant="outlined" 
                color="error" 
                startIcon={<Icons.Reject size={18} />}
                sx={{ borderRadius: 2 }}
             >
                Reject
             </Button>
             <Button 
                variant="contained" 
                color="success" 
                startIcon={<Icons.Check size={18} />}
                sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
             >
                Approve
             </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleChangeTab} aria-label="case tabs">
          <Tab icon={<Icons.User size={18} />} iconPosition="start" label="Overview" />
          <Tab icon={<Icons.Document size={18} />} iconPosition="start" label="Documents" />
          <Tab icon={<Icons.Liveness size={18} />} iconPosition="start" label="Liveness" />
          <Tab icon={<Icons.Activity size={18} />} iconPosition="start" label="Activity" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {/* Left Col - Main Info */}
        <Grid item xs={12} lg={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Overview Panel */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>User Information</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Full Name" value={`${caseData.user.firstName} ${caseData.user.lastName}`} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Date of Birth" value={caseData.dob} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Email" value={caseData.user.email} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Phone" value="+1 (555) 123-4567" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Country of Residence" value={caseData.country} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Address" value={caseData.address} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>Verification Details</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Verification Type" value={caseData.template} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Document Type" value={caseData.documentType} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Document Number" value={caseData.documentNumber} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoRow label="Expiry Date" value="2028-12-31" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                
                <Card sx={{ overflow: 'hidden' }}>
                    <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Documents Submitted</Typography>
                    </Box>
                    <CardContent sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {[1, 2].map((i) => (
                             <Box 
                                key={i}
                                sx={{ 
                                    width: 200, 
                                    height: 140, 
                                    bgcolor: 'background.default', 
                                    borderRadius: 2, 
                                    border: 1, 
                                    borderColor: 'divider',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': { borderColor: 'primary.main', '& img': { opacity: 0.8 } }
                                }}
                            >
                                <Box 
                                    component="img" 
                                    src={`https://picsum.photos/30${i}/200?blur=2`} 
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, transition: 'opacity 0.2s' }} 
                                />
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                    <Icons.Document size={24} color={theme.palette.text.primary} />
                                    <Typography variant="caption" fontWeight="bold" sx={{ mt: 1, color: 'text.primary' }}>{i === 1 ? 'Front of ID' : 'Back of ID'}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </Grid>

        {/* Right Col - Risk & Status */}
        <Grid item xs={12} lg={4}>
             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Status Card */}
                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">Current Status</Typography>
                            <Chip 
                                label={caseData.status} 
                                color={caseData.status === VerificationStatus.APPROVED ? 'success' : caseData.status === VerificationStatus.REJECTED ? 'error' : 'warning'}
                                size="small"
                                sx={{ fontWeight: 'bold' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Reviewer</Typography>
                            <Typography variant="body2" fontWeight="medium">System Auto-Check</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                            <Typography variant="body2" fontWeight="medium">{caseData.date}</Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        width: 200, 
                        height: 200, 
                        bgcolor: 'primary.main', 
                        opacity: 0.05, 
                        borderRadius: '50%', 
                        transform: 'translate(30%, -30%)',
                        pointerEvents: 'none'
                    }} />
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Icons.Verifications size={20} color={theme.palette.primary.main} />
                                <Typography variant="h6" fontWeight="bold">Risk Assessment</Typography>
                            </Box>
                            <Typography variant="h4" fontWeight="bold">
                                {caseData.riskScore}<Typography component="span" variant="caption" color="text.secondary">/100</Typography>
                            </Typography>
                        </Box>

                        <Box sx={{ width: '100%', height: 8, bgcolor: 'divider', borderRadius: 4, mb: 3, overflow: 'hidden' }}>
                             <Box 
                                sx={{ 
                                    width: `${caseData.riskScore}%`, 
                                    height: '100%', 
                                    bgcolor: caseData.riskScore > 80 ? 'success.main' : caseData.riskScore > 50 ? 'warning.main' : 'error.main' 
                                }} 
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                             <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                                <Typography variant="body2">AML/PEP Screening</Typography>
                                <Chip label="PASSED" color="success" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 'bold' }} />
                             </Box>
                             <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                                <Typography variant="body2">Document Authenticity</Typography>
                                <Chip label="VERIFIED" color="success" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 'bold' }} />
                             </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {!aiAnalysis && !isAnalyzing && (
                            <Button 
                                fullWidth 
                                variant="contained" 
                                sx={{ 
                                    background: 'linear-gradient(45deg, #4f46e5, #9333ea)', 
                                    color: 'white',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                                }}
                                onClick={handleGenerateAI}
                                startIcon={<Icons.AI size={18} />}
                            >
                                Generate AI Risk Report
                            </Button>
                        )}

                        {isAnalyzing && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, py: 2, color: 'text.secondary' }}>
                                <CircularProgress size={20} color="primary" />
                                <Typography variant="body2">Analyzing verification data...</Typography>
                            </Box>
                        )}

                        {aiAnalysis && (
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.1)' : 'rgba(79, 70, 229, 0.05)',
                                border: 1,
                                borderColor: 'rgba(79, 70, 229, 0.2)',
                                animation: 'fadeIn 0.5s'
                            }}>
                                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6366f1', mb: 1, fontWeight: 'bold' }}>
                                    <Icons.AI size={16} /> WhisperrID AI Insight
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {aiAnalysis}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
             </Box>
        </Grid>
      </Grid>
    </Box>
  );
};