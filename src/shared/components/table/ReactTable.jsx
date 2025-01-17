import { ArrowDownward } from '@mui/icons-material';
import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  getExpandedRowModel,
} from '@tanstack/react-table';
import propTypes from 'prop-types';
import { DebouncedSearch } from '../inputs';
import React from 'react';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useNavigate } from 'react-router-dom';
import { EmptyDataPlaceholder } from '../placeholders';

export const ReactTable = ({
  columns,
  data,
  customHeader = null,
  disablePagination = false,
  disableDefaultSearch = false,
  hideHeader = false,
  rowClick = null,
  title = null,
  searchFullWidth = false,
  defaultPageSize = 25,
  loading = false,
  subRowsKey = 'subRows',
  getSelectedRows = null,
  defaultSelectedRows = null,
}) => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [expanded, setExpanded] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const theme = useTheme();
  const navigate = useNavigate();
  const {
    getState,
    setPageIndex,
    setPageSize,
    getHeaderGroups,
    getRowModel,
    getRowCount,
  } = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: defaultPageSize } },
    state: { globalFilter, expanded, rowSelection },

    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: disablePagination
      ? undefined
      : getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // expanded
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row[subRowsKey],

    // row selection
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  const {
    pagination: { pageIndex, pageSize },
  } = getState();
  const handlePageChange = (_, page) => {
    setPageIndex(page);
  };

  const handlePageSizeChange = (e) => {
    const size = e.target.value ? Number(e.target.value) : 5;
    setPageSize(size);
    handlePageChange(null, 0);
  };

  const handleTableSearch = (value) => {
    setGlobalFilter(String(value));
  };

  const totalRows = getRowCount();
  const filteredRows =
    totalRows && totalRows < defaultPageSize ? defaultPageSize : totalRows;

  React.useLayoutEffect(() => {
    if (defaultSelectedRows) {
      setRowSelection(defaultSelectedRows);
    }
  }, [defaultSelectedRows]);

  React.useEffect(() => {
    if (getSelectedRows) {
      const selectedRows = getState().rowSelection;
      getSelectedRows(selectedRows);
    }
  }, [getState().rowSelection]);

  return (
    <Paper
      variant="shadow"
      sx={{
        overflow: 'hidden',
        borderRadius: '16px',
      }}
      // boxShadow: '0px 0px 13px 0px rgba(0,0,0,0.02)',
      // outline: '1px solid rgba(0,0,0,0.03)',
    >
      <TableContainer
        sx={{
          // maxHeight: 'calc(100vh - 270px)',
          // overflow: 'auto',
          pb: disablePagination ? 5 : 0,
        }}
      >
        {customHeader ? (
          customHeader
        ) : (
          <Stack
            px="16px"
            py="14px"
            flexDirection="row"
            justifyContent={title ? 'space-between' : 'start'}
            display={
              !disableDefaultSearch && !title && hideHeader ? 'none' : 'flex'
            }
          >
            {typeof title === 'string' ? (
              <Typography component="h1" variant="h5" fontWeight={500}>
                {title}
              </Typography>
            ) : (
              title
            )}
            {!disableDefaultSearch && (
              <DebouncedSearch
                fullWidth={searchFullWidth ?? !title}
                onChange={handleTableSearch}
                value={globalFilter}
              />
            )}
          </Stack>
        )}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortable = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();
                  const defaultSort = isSorted === false;
                  const isSortedDesc = isSorted === 'desc';
                  const isSortedAsc = isSorted === 'asc';
                  const columnMetaData = header.column.columnDef.meta;
                  return (
                    <TableCell
                      component="th"
                      key={header.id}
                      {...{ onClick: header.column.getToggleSortingHandler() }}
                      {...columnMetaData}
                      padding={columnMetaData?.padding ?? 'none'}
                      sx={{
                        cursor: sortable ? 'pointer' : '',
                        ':hover .MuiSvgIcon-root': {
                          opacity: 0.5,
                        },
                      }}
                      scope="col"
                      align="right"
                    >
                      <Stack
                        component="span"
                        justifyContent={columnMetaData?.align}
                        alignItems="center"
                        flexDirection="row"
                        gap={0.5}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {sortable && (
                          <Tooltip title={isSorted} arrow placement="top-start">
                            <ArrowDownward
                              fontSize="small"
                              sx={{
                                height: '16px',
                                width: '16px',
                                opacity: defaultSort ? 0 : 1,
                                transform: isSortedAsc
                                  ? 'rotate(180deg)'
                                  : isSortedDesc
                                    ? 'rotate(0deg)'
                                    : 'rotate(180deg)',
                              }}
                            />
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading || totalRows === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={columns.length}>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <EmptyDataPlaceholder label="Empty rows" fontSize="14px" />
                  )}
                </TableCell>
              </TableRow>
            ) : (
              getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    cursor: rowClick ? 'pointer' : '',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  onClick={() =>
                    typeof rowClick === 'function'
                      ? rowClick(row.original)
                      : typeof rowClick === 'string'
                        ? navigate(rowClick)
                        : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellMetaData = cell.column.columnDef.meta;
                    return (
                      <TableCell
                        component="td"
                        key={cell.id}
                        {...cellMetaData}
                        padding={cellMetaData?.padding ?? 'none'}
                        align={cellMetaData?.align ?? 'left'}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {disablePagination ? null : (
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            50,
            { label: 'All', value: data.length },
          ]}
          component="div"
          count={filteredRows}
          rowsPerPage={pageSize}
          page={pageIndex}
          slotProps={{
            select: {
              inputProps: { 'aria-label': 'rows per page' },
            },
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePageSizeChange}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </Paper>
  );
};

ReactTable.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  columns: propTypes.array.isRequired,
  data: propTypes.array.isRequired,
  defaultPageSize: propTypes.number,
  loading: propTypes.bool,
  rowClick: propTypes.oneOfType([propTypes.string, propTypes.func]),
  disableDefaultSearch: propTypes.bool,
  disablePagination: propTypes.bool,
  customHeader: propTypes.node,
  subRowsKey: propTypes.string,
  getSelectedRows: propTypes.func,
  defaultSelectedRows: propTypes.object,
  hideHeader: propTypes.bool,
  searchFullWidth: propTypes.bool,
};
