import React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import { InputControl } from '../../../shared';

export const CreateWards = () => {
    return (
        <Stack
            width="100%"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                px={{ xs: "20px", md: "30px" }}
                py="40px"
                gap="16px"
                elevation={0}
                boxShadow="none"
                outline="0.5px solid #BCB6B6"
                sx={{
                    transition: "0.5s all",
                    width: "100%",
                    maxWidth: "500px",
                    backgroundColor: "#fff", // Background color for the form box
                    borderRadius: "8px", // Rounded corners for the form
                }}
            >
                {/* Header Inside the Box */}
                <Box
                    sx={{
                        backgroundColor: '#051A34',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: '10px',
                        px: '16px', // Add padding for spacing
                        borderRadius: "8px", // Rounded top corners
                    }}
                >
                    <Typography variant="h6">Create New Wards</Typography>
                    <Typography
                        variant="h7"
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            '&:hover': { color: '#ff0000' }, // Optional hover effect for the X
                        }}
                        onClick={() => {
                            console.log('Close button clicked'); // Add your close logic here
                        }}
                    >
                        X
                    </Typography>
                </Box>

                {/* Form Fields */}
                <InputControl 
                label="Ward Name" 
                placeholder="Enter ward name"
                 />
                <InputControl 
                label="Ward No" 
                placeholder="Enter ward number"
                 />

                {/* Buttons */}
                <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#051A34',
                            '&:hover': {
                                backgroundColor: '#03314B',
                            },
                            px: 3,
                        }}
                    >
                        Create
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#051A34',
                            color: '#051A34',
                            '&:hover': {
                                borderColor: '#03314B',
                                color: '#03314B',
                            },
                            px: 3,
                        }}
                    >
                        Close
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};




