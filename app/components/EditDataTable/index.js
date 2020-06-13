import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/BorderColor';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { ACTIONS_SAGA, ACTIONS_REDUCER } from '../../redux/shared';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import  "../../styles/custom.css"


const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  }
});

class CrudTableDemo extends React.Component {
  state = {
    columns: [
      {
        name: 'companyID',
        label: 'Id',
        options: {
          filter: true,
          display: 'false'
        }
      },
      {
        name: 'companyName',
        label: 'Company Name',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      },
      {
        name: 'logo',
        label: 'Logo',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            // if (edited) {
            //   return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />
            // } else {
            //   return (value)
            // }
            if (edited) {
              return (
                <input
                  type="file"
                  name="logo"
                  onChange={event => updateValue(event.target.files)}
                />
              );
            }
            return (<img src={value} style={{width:"50px", height:"auto"}} alt="logo" />);
          }
        }
      },
      {
        name: 'officeNoAndBuilding',
        label: 'Office Number',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      }, {
        name: 'city',
        label: 'City',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      },
      {
        name: 'country',
        label: 'Country',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      }, {
        name: 'email',
        label: 'Email',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      }, {
        name: 'phone',
        label: 'Phone',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      }, {
        name: 'mobile',
        label: 'Mobile',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      }, {
        name: 'contactName',
        label: 'Contact Name',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      }, {
        name: 'contactTitle',
        label: 'contact Title',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />;
            }
            return (value);
          }
        }
      },
      {
        name: 'edited',
        label: 'Actions',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log(value);
            console.log(tableMeta);
            if (!value) {
              return (
                <div style={{minWidth:"110px"}}>
                  <IconButton
                    onClick={() => updateValue(true)}
                    aria-label="Edit"
                  ><EditIcon /></IconButton>
                  <IconButton
                    //onClick={() => eventDel(this)}
                    // className={classes.button}
                    onClick={() => this.DeleteCompany(tableMeta.rowData)}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton></div>
              )
            } else {
              return (
                <div style={{minWidth:"110px"}}>
                <IconButton
                // onClick={() => eventDone(this)}
                color="secondary"
                aria-label="Done"
                onClick={() => {
                  updateValue(false);
                  this.UpsertCompany(tableMeta.rowData);
                }}
              >
                <DoneIcon /></IconButton>
                <IconButton
                  onClick={() => this.DeleteCompany(tableMeta.rowData)}
                  // className={classes.button}
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </IconButton></div>
              )
            }
          }
        }
      }
    ],
  }
  UpsertCompany(values) {
    var cols = {
      'CompanyId': '',
      'CompanyName': '',
      'logo': '',
      'OfficeNoAndBuilding': '',
      'City': '',
      'Country': '',
      'Email': '',
      'Phone': '',
      'Mobile': '',
      'ContactName': '',
      'ContactTitle': ''
    }
    var i = 0;
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        cols[key] = values[i];
      }
      i++;
    };
    this.props.upsertCompany(cols);
  }
  DeleteCompany(values){
    const id = values[0];
    this.props.deleteCompnayData(id);
  }
  componentDidMount() {
    this.props.fetchData();
  }

  shouldComponentUpdate(next) {
    if (!_.isEqual(this.props.app.customers, next.app.customers)) {
      return true;
    }
    return false;
  }

  render() {
    const { columns } = this.state;
    const { classes, app, setCompnayData } = this.props;

    const customers = _.get(app, 'customers');
    console.log('RRRRRRRRRRRRRRRRRRRRRRR');
    console.log('RRRRRRRRRRRRRRRRRRRRRRR');
    console.log('RRRRRRRRRRRRRRRRRRRRRRR');
    console.log(customers);

    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: false,
      rowsPerPage: 10,
      page: 0
    };
    return (
      <div className={classes.table}>
          
          <MUIDataTable
            title={<div>
              Companies<Button style={{ marginLeft: '5px' }} color="secondary" onClick={() => setCompnayData()}>Add Company</Button>
            </div>}
            data={customers}
            columns={columns}
            options={options}
          />
      </div>
    );
  }
}

CrudTableDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  app: state.getIn(['app'])
});

const mapDispatchToProps = dispatch => ({
  fetchData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_COMPANY_DATA, value }),
  upsertCompany: (value) => dispatch({ type: ACTIONS_SAGA.UPSERT_COMPANY_DATA, value }),
  setCompnayData: (value) => dispatch({ type: ACTIONS_SAGA.SET_COMPANY_DATA }),
  deleteCompnayData: (value) => dispatch({ type: ACTIONS_SAGA.DELETE_COMPANY_DATA, value }),
});

const CrudTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTableDemo);

export default withStyles(styles)(CrudTableMapped);
