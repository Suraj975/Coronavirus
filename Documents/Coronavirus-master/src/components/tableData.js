import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function TableData({ countryWiseData }) {
let sortedlist = countryWiseData && countryWiseData.filter(item => item.cases > 0).sort((b, a) => a.cases - b.cases)
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell align="right">Cases</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
            <StyledTableCell align="right">Active</StyledTableCell>
            <StyledTableCell align="right">Critical</StyledTableCell>
            <StyledTableCell align="right">Today Cases</StyledTableCell>
            <StyledTableCell align="right">Today Recovered</StyledTableCell>
            <StyledTableCell align="right">Today Deaths</StyledTableCell>
            <StyledTableCell align="right">Population</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedlist.map(data => {
            return (
              <StyledTableRow key={data.countryInfo["_id"]}>
                <StyledTableCell component="th" scope="row">
                  <div style={{display:"flex", alignItems:"center"}}>
                    <div style={{fontSize:'20px', fontWeight:"bold"}}>{data.country}</div>
                    <div style={{marginLeft:'10px'}}>
                      <img
                        src={data.countryInfo["flag"]}
                        width="25px"
                        height="15px"
                        alt="country"
                      />
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{data.cases}</StyledTableCell>
                <StyledTableCell align="right">
                  {data.recovered}
                </StyledTableCell>
                <StyledTableCell align="right">{data.deaths}</StyledTableCell>
                <StyledTableCell align="right">{data.active}</StyledTableCell>
                <StyledTableCell align="right">{data.critical}</StyledTableCell>
                <StyledTableCell align="right">
                  {data.todayCases}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.todayRecovered}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.todayDeaths}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.population}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// const TableData = ({ value }) => {
//     let sortedlist = value && value.filter(item => item.cases > 0).sort((b, a) => a.deaths - b.deaths)
//     return (
//         <div style={{ marginLeft: "40px", marginRight: "40px" }}>
//             <p style={{ color: "white", textDecoration: "underline", fontSize: "17px" }}>Coronavirus Summary Data Points</p>
//             <div style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#282a2f", borderStyle: "inset" }}>
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", color: "white", alignContent: "center", marginLeft: "7px", marginRight: "9px", fontSize: "20px" }}>
//                     <div style={{ marginTop: "16px" }}>Cases</div>
//                     <div style={{ marginTop: "16px" }}>Deaths</div>
//                     <div style={{ marginTop: "16px" }}>Recovered</div>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}>
//                     {sortedlist && sortedlist.map((item, index) => {
//                         return (
//                             <Fragment key={index} >
//                                 <table style={{ display: "flex", flexDirection: "column", paddinTop: "10px", fontSize: "15px", backgroundColor: "darkred" }}>
//                                     <th style={{ width: "110px", color: "white", marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>{item.country}</th>
//                                     <tr align="center" style={{ marginTop: "10px", border: "1px solid black" }}>
//                                         <td style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}>{item.cases}</td>
//                                     </tr>
//                                     <tr align="center" style={{ marginTop: "10px", border: "1px solid black" }}>
//                                         <td style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}>{item.deaths}</td>
//                                     </tr>
//                                     <tr align="center" style={{ marginTop: "10px", border: "1px solid black" }}>
//                                         <td style={{ color: "white", marginTop: "10px" }}>{item.recovered}</td>
//                                     </tr>
//                                 </table>
//                             </Fragment>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>)
// }

// const TableData = ({ value }) => {
//     let sortedlist = value && value.filter(item => item.cases > 0).sort((b, a) => a.deaths - b.deaths);

// }
