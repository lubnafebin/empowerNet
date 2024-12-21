import { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Pagination,
  Typography,
} from "@mui/material";

export const BasicTable = ({
  title = null,
  headerAction = null,
  columns = [],
  rows = [],
}) => {
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
    <Stack gap={2}>
      {
        // Title and header action
        (headerAction || title) && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            minWidth={300}
          >
            {title && <Typography variant="h5">{title}</Typography>}
            <Stack ml='auto' >{headerAction}</Stack>
          </Stack>
        )
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#051A34" }}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} sx={{ color: "white" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column?.cell ? column.cell(row) : row[column.field]}
                  </TableCell>
                ))}
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
            backgroundColor: "#051A34",
            borderRadius: "8px",
            padding: "2px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            "& .MuiPaginationItem-root": {
              color: "white",
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

BasicTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      cell: PropTypes.func,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  headerAction: PropTypes.node,
};
