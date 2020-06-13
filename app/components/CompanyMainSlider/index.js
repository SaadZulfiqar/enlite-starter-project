import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/BorderColor';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ACTIONS_SAGA, ACTIONS_REDUCER } from '../../redux/shared';
import "../../styles/custom.css"


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
          //display: 'false',
          customBodyRender: (value, tableMeta, updateValue) =>{
            return (<FormControl  style={{ overflow: "hidden" }}>
              <Select
                value={this.props.app.customers[0].companyID}
                onChange={this.handleChange}
                input={<Input name="age" id="age-simple" />}
                autoWidth>
                {this.props.app.customers.map((option, index) => <MenuItem value={option.companyID} key={index.toString()}>{option.companyName}</MenuItem>)}
              </Select>
            </FormControl>)
          }
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
                <div>
                  <input
                    type="file"
                    name="logo"
                    onChange={event => { updateValue(event.target.files) }} />
                  <img src={`${value}`}
                    width="100px" height="auto" />
                </div>
              );
            }
            console.log(value);
            return (<img src={value} style={{ width: "100px", height: "auto" }} alt="logo" />);
          }
        }
      },
      {
        name: 'edited',
        label: 'Actions',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (!value) {
              return (
                <div style={{ minWidth: "110px" }}>
                  <IconButton
                    onClick={() => updateValue(true)}
                    aria-label="Edit"
                  ><EditIcon /></IconButton>
                  <IconButton
                    onClick={() => this.DeleteCompany(tableMeta.rowData)}
                    aria-label="Delete">
                    <DeleteIcon />
                  </IconButton></div>
              )
            } else {
              return (
                <div style={{ minWidth: "110px" }}>
                  <IconButton
                    color="secondary"
                    aria-label="Done"
                    onClick={() => {
                      updateValue(false);
                      this.UpsertCompanyMainSlider(tableMeta.rowData);
                    }}>
                    <DoneIcon /></IconButton>
                  <IconButton
                    onClick={() => this.DeleteCompany(tableMeta.rowData)}
                    aria-label="Delete">
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
      'image': '',
    }
    var i = 0;
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        cols[key] = values[i];
      }
      i++;
    };
    this.props.upsertCompanyMainSlider(cols);
  }
  DeleteCompany(values) {
    const id = values[0];
    this.props.deleteCompnayMainSliderData(id);
  }
  
  componentDidMount() {
    this.props.fetchCompanies();
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
    const { classes, mainSlider, setSliderData, app } = this.props;
    
    const companySlider = _.get(mainSlider, 'companySlider');
    const companies = _.get(app, 'customers');
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
  mainSlider: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  mainSlider: state.getIn(['mainSlider']),
  app: state.getIn(['app'])
});

const mapDispatchToProps = dispatch => ({
  fetchData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_COMPANY_MAIN_SLIDER, value }),
  setSliderData: (value) => dispatch({ type: ACTIONS_SAGA.SET_COMPANY_MAIN_SLIDER }),
  upsertCompanyMainSlider: (value) => dispatch({ type: ACTIONS_SAGA.UPSERT_COMPANY_MAIN_SLIDER, value }),
  deleteCompnayMainSliderData: (value) => dispatch({ type: ACTIONS_SAGA.DELETE_COMPANY_MAIN_SLIDER_DATA, value }),
  fetchCompanies: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_COMPANY_DATA, value }),
});

const CompanyMainSliderMmainSlidered = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyMainSlider);

export default withStyles(styles)(CompanyMainSliderMmainSlidered);
