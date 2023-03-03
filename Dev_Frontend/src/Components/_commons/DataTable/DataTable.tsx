import { createTheme, TablePagination, ThemeProvider } from '@mui/material';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { FunctionComponent, useEffect, useState } from 'react';
import { StripedDataGrid } from './styles';
import _ from 'lodash';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay/CustomNoRowsOverlay';
import { CustomTotalsComponent } from './CustomFooter/CustomFooter';

interface Props {
  columns: GridColDef[];
  rows: any[];
}

const DataTable: FunctionComponent<Props> = (props) => {
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [selectionObject, setSelectionObject] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { rows, columns } = props;

  const pages = Math.ceil(rows.length / rowsPerPage);
  console.log('pages: ' + pages)
  const startIndex = page * rowsPerPage;
  console.log('startIndex: ' + startIndex)
  const endIndex = startIndex + rowsPerPage;
  console.log('endIndex: ' + endIndex)
  const currentItens = rows.slice(startIndex, endIndex);

  useEffect(() => {
    const uniqRowsSelectionObj = _.uniqBy(rows, 'id');
    const uniqSelection = _.uniq(selectionModel);
    const arrSelectionObj = uniqRowsSelectionObj.map(r => {
      let id = uniqSelection.filter(id => r.id === id)?.[0];
      return uniqRowsSelectionObj.filter(r => r.id === id)[0];
    });
    const filterArr = arrSelectionObj.filter(a => a);
    setSelectionObject(filterArr);
  }, [selectionModel]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400, margin: '15px' }}>
        <StripedDataGrid
          rows={currentItens}
          columns={columns}
          checkboxSelection
          keepNonExistentRowsSelected
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) => setSelectionModel(newSelectionModel)}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            Pagination: (props) => <>
              <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Linhas por página"
                labelDisplayedRows={({ from, to, count }) => `Mostrar páginas ${from} à ${to} de um total de ${count} páginas`}
              />
              <CustomTotalsComponent totalRows={rows.length} />
            </>
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default DataTable;

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR
);