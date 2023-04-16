import * as React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import ParamsSelect from '../../components/ParamsSelect/ParamsSelect';
import { useGetReportsQuery } from '../../services/reportsApi';
import {
  COLUMNS,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_PARAMS,
  SELECTED_COMPANY,
  ROWS_PER_PAGE_OPTIONS,
} from './constants';
import { IReport } from './types';
import { CellText, Layout, Preloader } from './styled';

export const StockReports = () => {
  const [currentPage, setCurrentPage] = React.useState(DEFAULT_PAGE);
  const [reportsPerPage, setReportsPerPage] = React.useState(DEFAULT_PER_PAGE);
  const [displayColumns, setDisplayColumns] = React.useState<string[]>(DEFAULT_PARAMS);
  const [currentReports, setCurrentReports] = React.useState<IReport[]>([]);

  const { data, isError, isLoading } = useGetReportsQuery(SELECTED_COMPANY);

  React.useEffect(() => {
    const endIndex = currentPage * reportsPerPage;
    setCurrentReports(data?.slice(endIndex - reportsPerPage, endIndex) ?? []);
  }, [currentPage, reportsPerPage, data]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    setCurrentReports((prevState) => {
      const newReports = [...prevState];
      const [reorderedItem] = newReports.splice(result.source.index, 1);
      newReports.splice(result.destination!.index, 0, reorderedItem);

      return newReports;
    });
  };

  const handleDisplayColumnsChange = (e: SelectChangeEvent<typeof displayColumns>) => {
    if (Array.isArray(e.target.value)) {
      setDisplayColumns(e.target.value);
    }
  };

  const dateFormat = (stamp: any) => {
    const date = new Date(stamp);
    return date.toDateString();
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <Layout>
      <Paper>
        <Box display="flex" justifyContent="flex-end" marginBottom={2} padding={1}>
          <ParamsSelect onChange={handleDisplayColumnsChange} params={displayColumns} />
        </Box>
      </Paper>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 1000, tableLayout: 'fixed' }}>
            <colgroup>
              <col width="20%" />
            </colgroup>
            <TableHead>
              <TableRow>
                {displayColumns.map((param) => (
                  <TableCell key={param}>
                    <CellText>{param}</CellText>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="table">
                {(droppableProvided) => (
                  <TableBody {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                    {currentReports?.map((report, i) => (
                      <Draggable key={report.companyName} index={i} draggableId={report.companyName}>
                        {(draggableProvided, snapshot) => (
                          <TableRow
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={{
                              ...draggableProvided.draggableProps.style,
                              display: snapshot.isDragging ? 'table' : undefined,
                              background: snapshot.isDragging ? 'rgba(245,245,245, 0.75)' : undefined,
                            }}
                          >
                            {COLUMNS.map(
                              (column) =>
                                displayColumns.includes(column.value) && (
                                  <TableCell key={column.id} size="small">
                                    <CellText>
                                      {column.type === 'date' ? dateFormat(report[column.id]) : report[column.id]}
                                    </CellText>
                                  </TableCell>
                                )
                            )}
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage=""
          component="div"
          count={data.length}
          rowsPerPage={reportsPerPage}
          page={currentPage - 1}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageChange={(e, newPage) => {
            setCurrentPage(newPage + 1);
          }}
          onRowsPerPageChange={(e) => {
            setReportsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1);
          }}
        />
      </Paper>
    </Layout>
  );
};
