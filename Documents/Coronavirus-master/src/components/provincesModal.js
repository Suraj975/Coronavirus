import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 700
  }
}));

export default function ProvinceModal({setOpen, open, handleClose, countryData}) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
    <Fade in={open}>
    <TableContainer component={Paper} style={{maxHeight:"500px", width:"95%"}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Province ( {countryData && countryData[0].country} )</StyledTableCell>
            <StyledTableCell align="right">Confirmed</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
            <StyledTableCell align="right">Updated</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryData && countryData.map(data => {
            return (
              <StyledTableRow key={data.coordinates.latitude}>
                <StyledTableCell align="left">
                    {data.province || data.country}
                </StyledTableCell>
                <StyledTableCell align="left" style={{backgroundColor: data.stats.confirmed > 10000 ? "rgba(255, 0, 0, 0.6)" : "" }}>{data.stats.confirmed}</StyledTableCell>
                <StyledTableCell align="left">
                  {data.stats.recovered}
                </StyledTableCell>
                <StyledTableCell align="left">{data.stats.deaths}</StyledTableCell>
                <StyledTableCell align="left">{data.updatedAt}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
        </Fade>
      </Modal>
    </div>
  );
}