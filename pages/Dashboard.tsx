import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import { Icons } from '../components/Icons';
import { DashboardStats, VerificationCase, VerificationStatus } from '../types';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Alert,
  useTheme
} from '@mui/material';

const MOCK_STATS: DashboardStats = {
  todayVerifications: 1234,
  avgDecisionTime: '2m 30s',
  approvalRate: 92.8,
  pendingReview: 42
};

const CHART_DATA = [
  { name: 'Pending', value: 86, color: '#3b82f6' },
  { name: 'Approved', value: 345, color: '#10b981' },
  { name: 'Rejected', value: 16, color: '#ef4444' },
  { name: 'Review', value: 42, color: '#eab308' },
];

const INITIAL_RECENT_CASES: VerificationCase[] = [
  {
    id: '12345',
    user: { id: 'u1', firstName: 'Ethan', lastName: 'Harper', email: 'ethan@example.com', avatar: 'https://picsum.photos/32/32?random=1' },
    status: VerificationStatus.APPROVED,
    date: '2024-03-15',
    decisionTime: '2m 15s',
    template: 'Standard',
    riskScore: 98,
    country: 'USA',
    documentType: 'Passport',
    documentNumber: 'A1234567',
    address: '123 Maple Dr',
    dob: '1990-01-01'
  },
  {
    id: '67890',
    user: { id: 'u2', firstName: 'Olivia', lastName: 'Bennett', email: 'olivia@example.com', avatar: 'https://picsum.photos/32/32?random=2' },
    status: VerificationStatus.PENDING,
    date: '2024-03-15',
    decisionTime: '3m 05s',
    template: 'Enhanced',
    riskScore: 45,
    country: 'UK',
    documentType: 'Driver License',
    documentNumber: 'D9876543',
    address: '456 Oak Ln',
    dob: '1992-05-12'
  },
  {
    id: '11223',
    user: { id: 'u3', firstName: 'Liam', lastName: 'Carter', email: 'liam@example.com', avatar: 'https://picsum.photos/32/32?random=3' },
    status: VerificationStatus.REJECTED,
    date: '2024-03-14',
    decisionTime: '1m 45s',
    template: 'Standard',
    riskScore: 12,
    country: 'Canada',
    documentType: 'ID Card',
    documentNumber: 'C11223344',
    address: '789 Pine St',
    dob: '1988-11-23'
  },
  {
    id: '33445',
    user: { id: 'u4', firstName: 'Sophia', lastName: 'Davis', email: 'sophia@example.com', avatar: 'https://picsum.photos/32/32?random=4' },
    status: VerificationStatus.REVIEW,
    date: '2024-03-14',
    decisionTime: '2m 30s',
    template: 'Standard',
    riskScore: 95,
    country: 'USA',
    documentType: 'Passport',
    documentNumber: 'A9988776',
    address: '321 Elm St',
    dob: '1995-07-30'
  },
];

const StatCard = ({ title, value, subtext }: { title: string, value: string | number, subtext?: string }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary" fontWeight="medium" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        {value}
      </Typography>
      {subtext && (
        <Typography variant="caption" color="primary" fontWeight="medium" sx={{ mt: 1, display: 'block' }}>
          {subtext}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const StatusChip = ({ status }: { status: VerificationStatus }) => {
  let color: 'success' | 'error' | 'warning' | 'primary' | 'default' = 'default';
  
  switch (status) {
    case VerificationStatus.APPROVED: color = 'success'; break;
    case VerificationStatus.REJECTED: color = 'error'; break;
    case VerificationStatus.PENDING: color = 'primary'; break;
    case VerificationStatus.REVIEW: color = 'warning'; break;
    case VerificationStatus.COMPLETED: color = 'success'; break;
    case VerificationStatus.FAILED: color = 'error'; break;
  }

  return (
    <Chip 
      label={status} 
      size="small" 
      color={color} 
      variant="outlined" 
      sx={{ fontWeight: 'bold', borderRadius: 4 }} 
    />
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [recentCases, setRecentCases] = useState<VerificationCase[]>(INITIAL_RECENT_CASES);
  const [lastUpdatedId, setLastUpdatedId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentCases(prevCases => {
        const newCases = [...prevCases];
        const activeIndices = newCases
            .map((c, i) => (c.status === VerificationStatus.PENDING || c.status === VerificationStatus.REVIEW ? i : -1))
            .filter(i => i !== -1);
            
        if (activeIndices.length === 0) return prevCases;
        
        const randomIndex = activeIndices[Math.floor(Math.random() * activeIndices.length)];
        const targetCase = newCases[randomIndex];

        let change = Math.floor(Math.random() * 11) - 5;
        let newScore = Math.max(0, Math.min(100, targetCase.riskScore + change));
        
        newCases[randomIndex] = { ...targetCase, riskScore: newScore };
        setLastUpdatedId(targetCase.id);
        
        return newCases;
      });
      setTimeout(() => setLastUpdatedId(null), 800);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ animation: 'fadeIn 0.5s' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">Dashboard</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           <Box sx={{ position: 'relative', display: 'flex', width: 12, height: 12 }}>
             <Box sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.75, animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
             <Box sx={{ position: 'relative', width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main' }} />
           </Box>
           <Typography variant="body2" color="text.secondary">Live Updates</Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Today's Verifications" value={MOCK_STATS.todayVerifications} subtext="+12% from yesterday" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Avg. Decision Time" value={MOCK_STATS.avgDecisionTime} subtext="-5s improvement" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Approval Rate" value={`${MOCK_STATS.approvalRate}%`} subtext="Within healthy range" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Pending Review" value={MOCK_STATS.pendingReview} subtext="Requires attention" />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%', p: 2 }}>
             <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Verifications Status</Typography>
             <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary }} dy={10} />
                    <Tooltip 
                      cursor={{ fill: theme.palette.action.hover }}
                      contentStyle={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider, color: theme.palette.text.primary }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Status Breakdown</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {CHART_DATA.map((item) => (
                <Box key={item.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' }, cursor: 'pointer' }}>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                      <Typography variant="body2" color="text.secondary" fontWeight="medium">{item.name}</Typography>
                   </Box>
                   <Typography variant="body1" fontWeight="bold">{item.value}</Typography>
                </Box>
              ))}
            </Box>
            <Alert severity="warning" icon={<Icons.Alert size={20} />} sx={{ mt: 3 }}>
               Unusual spike in rejected applications from Region NA-East detected.
            </Alert>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight="bold">Recent Verifications</Typography>
          <Button onClick={() => navigate('/verifications')} size="small" sx={{ fontWeight: 'bold' }}>View All</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>USER</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>RISK SCORE</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>DATE</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>DECISION TIME</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentCases.map((item) => (
                <TableRow 
                  key={item.id} 
                  hover
                  sx={{ 
                    bgcolor: lastUpdatedId === item.id ? (theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.1)') : 'transparent',
                    transition: 'background-color 0.5s ease'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box 
                        component="img" 
                        src={item.user.avatar} 
                        sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'action.selected' }} 
                      />
                      <Typography variant="body2" fontWeight="medium">{item.user.firstName} {item.user.lastName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={item.status} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                       <Box sx={{ width: 64, height: 6, bgcolor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                          <Box 
                            sx={{ 
                              width: `${item.riskScore}%`, 
                              height: '100%', 
                              bgcolor: item.riskScore > 80 ? 'success.main' : item.riskScore > 50 ? 'warning.main' : 'error.main',
                              transition: 'width 0.5s ease'
                            }} 
                          />
                       </Box>
                       <Typography 
                          variant="caption" 
                          fontWeight="bold" 
                          sx={{ 
                            color: item.riskScore > 80 ? 'success.main' : item.riskScore > 50 ? 'warning.main' : 'error.main'
                          }}
                        >
                          {item.riskScore}
                        </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.decisionTime}</TableCell>
                  <TableCell align="right">
                    <Button 
                      onClick={() => navigate(`/cases/${item.id}`, { state: { caseData: item } })}
                      size="small"
                      sx={{ minWidth: 'auto', fontWeight: 'bold' }}
                    >
                      VIEW
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
};