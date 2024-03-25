import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import AwardeeTableRow from '../awardee-table-row';
import AwardeeTableHead from '../awardee-table-head';
import AwardeeTableToolbar from '../awardee-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

export default function AwardeePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [apidata, setApiData] = useState([]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  function getAwardees() {
    axios
      .get('https://localhost:7197/api/Awardees')
      .then((response) => {
        console.log(response.data);
        setApiData(response.data);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data, { autoClose: 1000 });
        }
        console.log(err);
      });
  }

  /*useEffect(() => {
    axios
      .get('https://localhost:7197/api/Awardees')
      .then((response) => {
        console.log(response.data);
        setApiData(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 1000 });
        console.log(err.response.data);
      });
  }, []); */

  useEffect(() => {
    getAwardees();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = apidata.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: apidata,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Awardees</Typography>

        <Link to="/createAwardee">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Awardee
          </Button>
        </Link>
      </Stack>

      <Card>
        <AwardeeTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <AwardeeTableHead
                order={order}
                orderBy={orderBy}
                rowCount={apidata.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'telephoneNumber', label: 'Telephone No.' },
                  { id: 'emailAddress', label: 'Email' },
                  { id: 'areaofSpecialization', label: 'Area of Specialization', align: 'center' },
                  { id: 'amount', label: 'Amount' },
                  { id: '' },
                ]}
              />
              <TableBody key={1}>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <AwardeeTableRow
                      key={row.id}
                      id={row.awardeeId}
                      documentId={row.documentId}
                      name={row.lastName + ' ' + row.firstName}
                      getAwardees={getAwardees}
                      telephoneNumber={row.phoneNumber}
                      emailAddress={row.email}
                      amount={row.amount}
                      areaOfSpecialization={row.areaOfSpecialization}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, apidata.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={apidata.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
