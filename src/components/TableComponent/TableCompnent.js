import React, { useEffect } from 'react'
import { Box, IconButton, Table,TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, TableHead, Paper, useTheme,} from '@mui/material'
import PropTypes from 'prop-types'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import * as S from './styles'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange, request, rows } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {!request && (
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="Primeira pagina"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      )}
      <IconButton
        onClick={handleBackButtonClick}
        aria-label="Pagina anterior"
        disabled={page === 0}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        aria-label="Proxima pagina"
        disabled={
          request
            ? rows.length < rowsPerPage
            : page >= Math.ceil(count / rowsPerPage) - 1
        }
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      {!request && (
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Ultima pagina"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      )}
    </Box>
  )
}

const TableComponet = ({ headers, rows, request, handlerRequest, setData }) => {
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  let mounted = true


  useEffect(() => {
    async function getData() {
      if (request) {
        if (mounted) {
          const res = await handlerRequest(page, rowsPerPage)
          setData(res)
        }
      }
    }

    getData()
    return () => (mounted = false)
  }, [rowsPerPage, page])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    mounted = true
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }



  return (
    <S.Container>
      <TableContainer component={Paper} sx={{ marginTop: '60px',  }}>
        <Table
          sx={{ minWidth: 300,  }}
          aria-label="Linhas por pagina: pagination table"
          size="medium"
        >
          <TableHead >
            <TableRow >
              {headers.map((header) => {
                return (
                  <TableCell
                    sx={{ fontSize: '14px', fontWeight: '300' }}
                    key={header.id}
                    {...header.props}
                  >
                    {header.label}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody >
            {(rowsPerPage > 0
              ? request
                ? rows
                : rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
              : rows
            ).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                  {headers.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell
                        key={column.id}
                        {...column.props}
                        sx={{ fontSize: '16px', fontWeight: '400' }}
                      >
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}

            {!request && emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

            {request && (
              <TableRow style={{ height: 64.8 * (rowsPerPage - rows.length)}}>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25 ]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                labelRowsPerPage="Itens por pagina"
                onPageChange={handleChangePage}
                labelDisplayedRows={() => `pagina  ${page + 1}`}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={(subProps) => (
                  <TablePaginationActions
                    {...subProps}
                    request={request}
                    rows={rows}
                  />
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </S.Container>
  )
}

export default TableComponet