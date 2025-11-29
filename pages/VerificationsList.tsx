import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { VerificationCase, VerificationStatus } from '../types';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
  IconButton,
  Chip,
  TablePagination
} from '@mui/material';

const MOCK_DATA: VerificationCase[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `${10000 + i}`,
  user: {
    id: `u${i}`,
    firstName: ['Noah', 'Emma', 'Liam', 'Olivia', 'Mason'][i % 5],
    lastName: ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones'][i % 5],
    email: `user${i}@example.com`,
    avatar: `https://picsum.photos/32/32?random=${i + 10}`
  },
  status: [VerificationStatus.APPROVED, VerificationStatus.PENDING, VerificationStatus.REJECTED, VerificationStatus.REVIEW][i % 4],
  date: '2024-03-15',
  template: i % 2 === 0 ? 'Standard' : 'Enhanced',
  riskScore: 85 + (i % 15),
  country: 'USA',
  documentType: 'Passport',
  documentNumber: `A${10000+i}`,
  address: '123 Test St',
  dob: '1990-01-01'
}));

export const VerificationsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = MOCK_DATA.filter(item => {
    const matchesSearch = item.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2, mb: 4 }}>
        <Box>
           <Typography variant="h4" fontWeight="bold" gutterBottom>Verifications</Typography>
           <Typography variant="body2" color="text.secondary">Manage and track all identity verification requests.</Typography>
        </Box>
        <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Icons.Plus size={20} />}
            sx={{ boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}
        >
            New Verification
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <TextField 
                placeholder="Search by ID, email, or name" 
                variant="outlined" 
                size="small"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icons.Search size={18} color="gray" />
                        </InputAdornment>
                    ),
                }}
            />
            <Box sx={{ display: 'flex', gap: 2, minWidth: { md: 400 } }}>
                <FormControl size="small" fullWidth>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="All">All Statuses</MenuItem>
                        <MenuItem value={VerificationStatus.APPROVED}>Approved</MenuItem>
                        <MenuItem value={VerificationStatus.PENDING}>Pending</MenuItem>
                        <MenuItem value={VerificationStatus.REJECTED}>Rejected</MenuItem>
                        <MenuItem value={VerificationStatus.REVIEW}>Review</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                    <Select defaultValue="All Dates" displayEmpty>
                        <MenuItem value="All Dates">All Dates</MenuItem>
                        <MenuItem value="Today">Today</MenuItem>
                        <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
      </Card>

      {/* List */}
      <Card>
        <TableContainer>
            <Table>
                <TableHead sx={{ bgcolor: 'background.default' }}>
                    <TableRow>
                        <TableCell padding="checkbox"><Checkbox color="primary" /></TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>NAME</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>EMAIL</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>TEMPLATE</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>DATE</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                        <TableRow key={item.id} hover>
                             <TableCell padding="checkbox"><Checkbox color="primary" /></TableCell>
                             <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{item.id}</TableCell>
                             <TableCell>
                                 <Typography variant="body2" fontWeight="medium">{item.user.firstName} {item.user.lastName}</Typography>
                             </TableCell>
                             <TableCell>{item.user.email}</TableCell>
                             <TableCell>
                                 <Chip 
                                    label={item.status} 
                                    size="small" 
                                    color={item.status === VerificationStatus.APPROVED ? 'success' : item.status === VerificationStatus.REJECTED ? 'error' : item.status === VerificationStatus.PENDING ? 'primary' : 'warning'}
                                    variant="outlined"
                                    sx={{ fontWeight: 'bold' }}
                                 />
                             </TableCell>
                             <TableCell>{item.template}</TableCell>
                             <TableCell>{item.date}</TableCell>
                             <TableCell align="right">
                                 <IconButton 
                                    size="small"
                                    onClick={() => navigate(`/cases/${item.id}`, { state: { caseData: item } })}
                                >
                                     <Icons.ChevronRight size={18} />
                                 </IconButton>
                             </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
};