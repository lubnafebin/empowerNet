import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Stack, Pagination } from '@mui/material';
import { Delete, Edit, Visibility, Update } from '@mui/icons-material';


function createData(no, wardNo, ward, createdAt, ADSname, actions) {
    return { no, wardNo, ward, createdAt, ADSname, actions };
}

const rows = [
    createData(1, 10, 'xyz', '1 - 2 - 24', 'sam', ''),
    createData(2, 11, 'abc', '2 - 2 - 24', 'john', ''),
    createData(3, 12, 'def', '3 - 2 - 24', 'alice', ''),
    createData(4, 13, 'ghi', '4 - 2 - 24', 'bob', ''),
    createData(5, 14, 'jkl', '5 - 2 - 24', 'eve', ''),
    createData(6, 14, 'jkl', '5 - 2 - 24', 'eve', ''),
    createData(7, 14, 'jkl', '5 - 2 - 24', 'eve', ''),
    createData(8, 11, 'abc', '2 - 2 - 24', 'john', ''),
    createData(9, 11, 'abc', '2 - 2 - 24', 'john', ''),
    createData(10, 11, 'abc', '2 - 2 - 24', 'john', ''),
];

export const BasicTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4; // Number of rows per page

    // Determine rows to display
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = rows.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <div>

            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#051A34' }}>
                        <TableRow>
                            <TableCell align="right" sx={{ color: 'white' }}>No</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Ward No</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Ward</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Created At</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>ADS Name</TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.no} </TableCell>
                                <TableCell align="right">{row.wardNo}</TableCell>
                                <TableCell align="right">{row.ward}</TableCell>
                                <TableCell align="right">{row.createdAt}</TableCell>
                                <TableCell align="right">{row.ADSname}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        sx={{ marginRight: 1, backgroundColor: '#051A34' }}
                                    >
                                        Update ADS
                                    </Button>
                                    <IconButton sx={{ marginRight: 1, color: "#051A34" }}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton sx={{ color: "#051A34" }}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton sx={{ marginRight: 1, color: "#051A34" }}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)} // Total pages
                    page={currentPage}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    color="primary"
                    sx={{
                        backgroundColor: '#051A34',
                        borderRadius: '8px',
                        padding: '2px',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                        },
                    }}
                />
            </Stack>
        </div>
    );
};