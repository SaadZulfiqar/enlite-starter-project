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

class CompanyMainSlider extends React.Component {
  state = {
    columns: [
      {
        name: 'companyMainImageID',
        label: 'Id',
        options: {
          filter: true,
          display: 'false'
        }
      },
      {
        name: 'companyID',
        label: 'companyID',
        options: {
          filter: true,
          display: 'false'
        }
      },
      {
        name: 'image',
        label: 'Image',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return (
                <input
                  type="file"
                  name="logo"
                  onChange={event => updateValue(event.target.files)}
                />
              );
            }
            console.log(value);
            return (<img src={value} style={{width:"100px", height:"auto"}} alt="logo" />);
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
                  this.UpsertCompanyMainSlider(tableMeta.rowData);
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
  UpsertCompanyMainSlider(values) {
    var cols = {
      'companyMainImageID': '',
      'CompanyId': '',
      'image':'',
    }
    var i = 0;
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        cols[key] = values[i];
      }
      i++;
    };
    debugger;
    this.props.upsertCompanyMainSlider(cols);
  }
  DeleteCompany(values){
    const id = values[0];
    this.props.deleteCompnayMainSliderData(id);
  }
  componentDidMount() {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$ COMPONENT DID MOUNT $$$$$$$$$$$$$$$$$$');
    this.props.fetchData();
  }

  shouldComponentUpdate(next) {
    if (!_.isEqual(this.props.mainSlider.companySlider, next.mainSlider.companySlider)) {
      return true;
    }
    return false;
  }

  render() {
    const { columns } = this.state;
    const { classes, mainSlider, setSliderData } = this.props;

    const companySlider = _.get(mainSlider, 'companySlider');
    console.log('RRRRRRRRRRR RENDER CALLED! RRRRRRRRRRRR');
    console.log('RRRRRRRRRRR RENDER CALLED! RRRRRRRRRRRR');
    console.log('RRRRRRRRRRR RENDER CALLED! RRRRRRRRRRRR');
    console.log(companySlider);
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
            Main Slider:
              <Button
              variant="contained"
              style={{ marginLeft: '5px' }}
              color="secondary"
              onClick={() => setSliderData()}>
              Add Image</Button>
          </div>}
            data={companySlider}
            columns={columns}
            options={options}
          />
      </div>
    );
  }
}

CompanyMainSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  mainSlider: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mainSlider: state.getIn(['mainSlider'])
});

const mapDispatchToProps = dispatch => ({
  fetchData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_COMPANY_MAIN_SLIDER, value }),
  setSliderData: (value) => dispatch({ type: ACTIONS_SAGA.SET_COMPANY_MAIN_SLIDER }),
  upsertCompanyMainSlider: (value) => dispatch({ type: ACTIONS_SAGA.UPSERT_COMPANY_MAIN_SLIDER, value}),
  deleteCompnayMainSliderData: (value) => dispatch({ type: ACTIONS_SAGA.DELETE_COMPANY_MAIN_SLIDER_DATA, value }),
  // fetchData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_COMPANY_MAIN_SLIDER, value }),
  // upsertCompany: (value) => dispatch({ type: ACTIONS_SAGA.UPSERT_COMPANY_DATA, value }),
  // setSliderData: (value) => dispatch({ type: ACTIONS_SAGA.SET_COMPANY_MAIN_SLIDER }),
  
});

const CompanyMainSliderMmainSlidered = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyMainSlider);

export default withStyles(styles)(CompanyMainSliderMmainSlidered);
