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
import { ACTIONS_SAGA } from '../../redux/shared';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/BorderColor';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

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
        name: 'logoPath',
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
                  name="logoPath"
                  onChange={event => updateValue(event.target.files)} 
                />
              );
            }
            return (<img src={value} width="50px" height="50px" alt="logo" />);
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
            if(!value){
              return (
                <div>
                  <IconButton
                    onClick={() => updateValue(true)}
                    aria-label="Edit"
                  ><EditIcon /></IconButton>
                  <IconButton
                    //onClick={() => eventDel(this)}
                    // className={classes.button}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton></div>
                )
            } else {
              return (<div><IconButton
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
                  //onClick={() => eventDel(this)}
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
    data: [
      {
        companyID: 1,
        companyName: 'chris',
        officeNoAndBuilding: 'Senior software engineer',
        city: 'Senior software engineer',
        country: 'Senior software engineer',
        email: 'Senior software engineer',
        phone: 'Senior software engineer',
        mobile: 'Senior software engineer',
        contactName: 'Senior software engineer',
        contactTitle: 'Senior software engineer',
        edited: false
      },
      {
        companyID: 1,
        companyName: 'chris',
        officeNoAndBuilding: 'Senior software engineer',
        city: 'Senior software engineer',
        country: 'Senior software engineer',
        email: 'Senior software engineer',
        phone: 'Senior software engineer',
        mobile: 'Senior software engineer',
        contactName: 'Senior software engineer',
        contactTitle: 'Senior software engineer',
        edited: false
      },
    ]
  }
  UpsertCompany(values){
    var cols = {
      'CompanyId' : '',
      'CompanyName' : '',
      'logoPath': '',
      'OfficeNoAndBuilding': '',
      'City' : '',
      'Country' : '', 
      'Email' : '',
      'Phone' : '',
      'Mobile' : '',
      'ContactName' : '',
      'ContactTitle' : ''
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
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { columns, data } = this.state;
    const { classes, app } = this.props;

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
          title="Employee list"
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
  upsertCompany: (value) => dispatch({type: ACTIONS_SAGA.UPSERT_COMPANY_DATA, value})
});

const CrudTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTableDemo);

export default withStyles(styles)(CrudTableMapped);
