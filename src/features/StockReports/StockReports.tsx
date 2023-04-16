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
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentPage, setReportsPerPage, setDisplayColumns, setCurrentReports } from '../../store/slice';
import ParamsSelect from '../../components/ParamsSelect/ParamsSelect';
import { useGetReportsQuery } from '../../services/reportsApi';
import { stockReportsSelector } from '../../store/selectors';
import { COLUMNS, SELECTED_COMPANY, ROWS_PER_PAGE_OPTIONS } from './constants';
import { getFormattedDate } from './utils';

import { CellText, Layout, Preloader } from './styled';

export const StockReports = () => {
  const dispatch = useDispatch();
  const state = useSelector(stockReportsSelector);

  const { data, isError, isLoading } = useGetReportsQuery(SELECTED_COMPANY);

  React.useEffect(() => {
    const endIndex = state.currentPage * state.reportsPerPage;
    dispatch(setCurrentReports(data?.slice(endIndex - state.reportsPerPage, endIndex) ?? []));
  }, [state.currentPage, state.reportsPerPage, data, dispatch]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newReports = [...state.currentReports];
    const [reorderedItem] = newReports.splice(result.source.index, 1);
    newReports.splice(result.destination.index, 0, reorderedItem);
    dispatch(setCurrentReports(newReports));
  };

  const handleDisplayColumnsChange = (e: SelectChangeEvent<typeof state.selectedColumns>) => {
    if (Array.isArray(e.target.value)) {
      dispatch(setDisplayColumns(e.target.value));
    }
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
          <ParamsSelect onChange={handleDisplayColumnsChange} params={state.selectedColumns} />
        </Box>
      </Paper>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 900, tableLayout: 'fixed' }}>
            <colgroup>
              <col width="25%" />
            </colgroup>
            <TableHead>
              <TableRow>
                {state.selectedColumns.map((param) => (
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
                    {state.currentReports?.map((report, i) => (
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
                                state.selectedColumns.includes(column.value) && (
                                  <TableCell key={column.id} size="small">
                                    <CellText>{getFormattedDate(report[column.id], column.type)}</CellText>
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
          component="div"
          count={data.length}
          rowsPerPage={state.reportsPerPage}
          page={state.currentPage - 1}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageChange={(e, newPage) => {
            dispatch(setCurrentPage(newPage + 1));
          }}
          onRowsPerPageChange={(e) => {
            dispatch(setReportsPerPage(parseInt(e.target.value, 10)));
            dispatch(setCurrentPage(1));
          }}
        />
      </Paper>
    </Layout>
  );
};
