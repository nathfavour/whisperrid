import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab
} from '@mui/material';

export const Settings: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 900, animation: 'fadeIn 0.5s' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Settings</Typography>
      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Manage your organization's settings and preferences.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Organization Profile" />
          <Tab label="API Keys" />
          <Tab label="Webhooks" />
          <Tab label="Team" />
        </Tabs>
      </Box>

      {value === 0 && (
        <Card>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>Organization Profile</Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            label="Organization Name" 
                            defaultValue="Acme Corp" 
                            fullWidth 
                            variant="outlined" 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Organization ID" 
                            defaultValue="org_123abc456def" 
                            fullWidth 
                            disabled 
                            variant="filled"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Organization Email" 
                            defaultValue="admin@acmecorp.com" 
                            fullWidth 
                            type="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Organization Address" 
                            fullWidth 
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 'bold' }}>
                        Save Changes
                    </Button>
                </Box>
            </CardContent>
        </Card>
      )}
    </Box>
  );
};