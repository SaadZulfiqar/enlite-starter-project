import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/BorderColor';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { ACTIONS_SAGA } from '../../redux/shared';
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

class Project extends React.Component {
  state = {
    columns: [
      {
        name: 'projectID',
        label: 'ProjectID',
        options: {
          filter: true,
          display: 'false'
        }
      },
      {
        name: 'clientID',
        label: 'Client',
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
        name: 'projectRefNo',
        label: 'Project Ref No',
        options: {
          filter: false,
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
        name: 'departmentID',
        label: 'Department',
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
        name: 'projectName',
        label: 'Project Name',
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
        name: 'projectStatus',
        label: 'Project Status',
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
        name: 'totalProjectBudget',
        label: 'Total Project Budget',
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
        name: 'startingDate',
        label: 'Starting Date',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  clearable
                  format="DD/MM/YYYY"
                  value={value}
                  onChange={event => updateValue(event.toDate())}
                  animateYearScrolling={false}
                />
              </MuiPickersUtilsProvider>
            }
            return (new Date(value).toLocaleDateString());
          }
        }
      }, {
        name: 'deadline',
        label: 'Deadline',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  clearable
                  format="DD/MM/YYYY"
                  value={value}
                  onChange={event => updateValue(event.toDate())}
                  animateYearScrolling={false}
                />
              </MuiPickersUtilsProvider>
            }
            return (new Date(value).toLocaleDateString());
          }
        }
      }, {
        name: 'completionDate',
        label: 'Completion Date',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  clearable
                  format="DD/MM/YYYY"
                  value={value}
                  onChange={event => updateValue(event.toDate())}
                  animateYearScrolling={false}
                />
              </MuiPickersUtilsProvider>
            }
            return (new Date(value).toLocaleDateString());
          }
        }
      }, {
        name: 'contractID',
        label: 'Contract',
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
            if (!value) {
              return (
                <div style={{ minWidth: "110px" }}>
                  <IconButton
                    onClick={() => updateValue(true)}
                    aria-label="Edit"
                  ><EditIcon /></IconButton>
                  <IconButton
                    onClick={() => this.delete(tableMeta.rowData)}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton></div>
              )
            } else {
              return (
                <div style={{ minWidth: "110px" }}>
                  <IconButton
                    // onClick={() => eventDone(this)}
                    color="secondary"
                    aria-label="Done"
                    onClick={() => {
                      updateValue(false);
                      this.upsert(tableMeta.rowData);
                    }}
                  >
                    <DoneIcon /></IconButton>
                  <IconButton
                    onClick={() => this.delete(tableMeta.rowData)}
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

  upsert(values) {
    var cols = {
      'ProjectID': '',
      'ClientID': '',
      'ProjectRefNo': '',
      'DepartmentID': '',
      'ProjectName': '',
      'ProjectStatus': '',
      'TotalProjectBudget': '',
      'StartingDate': '',
      'Deadline': '',
      'CompletionDate': '',
      'ContractID': ''
    }
    var i = 0;
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        cols[key] = values[i];
      }
      i++;
    };
    this.props.upsertProjectData(cols);
  }

  shouldComponentUpdate(next) {
    if (!_.isEqual(this.props.project.projects, next.project.projects)) {
      return true;
    }
    return false;
  }

  delete(values) {
    const id = values[0];
    this.props.deleteProjectData(id);
  }

  componentDidMount() {
    this.props.fetchProjectData();
  }

  render() {
    const { columns } = this.state;
    const { classes, project, setProjectData } = this.props;
    const projects = _.get(project, 'projects');
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
            Projects<Button style={{ marginLeft: '5px' }} color="secondary" onClick={() => setProjectData()}>Add Project</Button>
          </div>}
          data={projects}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

Project.propTypes = {
  classes: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.getIn(['project'])
});

const mapDispatchToProps = dispatch => ({
  fetchProjectData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_PROJECT_DATA, value }),
  setProjectData: (value) => dispatch({ type: ACTIONS_SAGA.SET_PROJECT_DATA }),
  upsertProjectData: (value) => dispatch({ type: ACTIONS_SAGA.UPSERT_PROJECT_DATA, value }),
  deleteProjectData: (value) => dispatch({ type: ACTIONS_SAGA.DELETE_PROJECT_DATA, value }),
});

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Project));
