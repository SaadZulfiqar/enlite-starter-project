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
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
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

class ProjectMedia extends React.Component {
  state = {
    columns: [
      {
        name: 'projectMediaID',
        label: 'ProjectMediaID',
        options: {
          filter: true,
          display: 'false'
        }
      },
      {
        name: 'projectID',
        label: 'Project',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            const { project } = this.props;
            const projects = _.get(project, 'projects');

            let ddProjects = projects;
            if (edited) {
              ddProjects = projects.map(project => project);
              ddProjects.unshift({
                projectID: 0,
                projectName: 'Select'
              });
            }

            return (<FormControl style={{ overflow: "hidden" }}>
              <Select
                value={value}
                onChange={event => {
                  if (edited) {
                    updateValue(event.target.value)
                  }
                }}
                autoWidth>
                {ddProjects && ddProjects.map((option, index) => <MenuItem value={option.projectID} key={index}>{option.projectName}</MenuItem>)}
              </Select>
            </FormControl>)
          }
        }
      },
      {
        name: 'isPublished',
        label: 'Published',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <Switch
                checked={value}
                onChange={() => updateValue(!value)}
              />
            }
            return (value ? 'Published' : 'Non published');
          }
        }
      },
      {
        name: 'projectLocation',
        label: 'Project Location',
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
        name: 'brand',
        label: 'Brand',
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
        name: 'scopeOfWork',
        label: 'Scope Of Work',
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
      // {
      //   name: 'dateOfCompletion',
      //   label: 'Completion Date',
      //   options: {
      //     filter: true,
      //     customBodyRender: (value, tableMeta, updateValue) => {
      //       const { columnIndex, rowData, rowIndex } = tableMeta;
      //       const edited = rowData[rowData.length - 1];
      //       if (edited) {
      //         return <MuiPickersUtilsProvider utils={MomentUtils}>
      //           <KeyboardDatePicker
      //             clearable
      //             format="DD/MM/YYYY"
      //             value={value}
      //             onChange={event => updateValue(event.toDate())}
      //             animateYearScrolling={false}
      //           />
      //         </MuiPickersUtilsProvider>
      //       }
      //       return (new Date(value).toLocaleDateString());
      //     }
      //   }
      // }, 
      {
        name: 'projectDescription',
        label: 'Project Description',
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
      'ProjectMediaID': '',
      'ProjectID': '',
      'IsPublished': '',
      'ProjectLocation': '',
      'Brand': '',
      'ScopeOfWork': '',
      // 'DateOfCompletion': '',
      'ProjectDescription': ''
    }
    var i = 0;
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        cols[key] = values[i];
      }
      i++;
    };
    this.props.upsertProjectMediaData(cols);
  }

  shouldComponentUpdate(next) {

    const isProjectMedias = _.isEqual(this.props.projectMedia.projectMedias, next.projectMedia.projectMedias);
    const isProjects = _.isEqual(this.props.project.projects, next.project.projects);

    if (!isProjectMedias || !isProjects) {
      return true;
    }
    return false;
  }

  delete(values) {
    const id = values[0];
    this.props.deleteProjectMediaData(id);
  }

  componentDidMount() {
    this.props.fetchProjectMediaData();
    this.props.fetchProjectData();
  }

  render() {
    const { columns } = this.state;
    const { classes, projectMedia, setProjectMediaData } = this.props;
    const projectMedias = _.get(projectMedia, 'projectMedias');
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
            Projects Media<Button style={{ marginLeft: '5px' }} color="secondary" onClick={() => setProjectMediaData()}>Add Project Media</Button>
          </div>}
          data={projectMedias}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

ProjectMedia.propTypes = {
  classes: PropTypes.object.isRequired,
  projectMedia: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  projectMedia: state.getIn(['projectMedia']),
  project: state.getIn(['project'])
});

const mapDispatchToProps = dispatch => ({
  fetchProjectMediaData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_PROJECT_MEDIA_DATA, value }),
  setProjectMediaData: (value) => dispatch({ type: ACTIONS_SAGA.SET_PROJECT_MEDIA_DATA }),
  upsertProjectMediaData: (value) => dispatch({ type: ACTIONS_SAGA.UPSERT_PROJECT_MEDIA_DATA, value }),
  deleteProjectMediaData: (value) => dispatch({ type: ACTIONS_SAGA.DELETE_PROJECT_MEDIA_DATA, value }),
  fetchProjectData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_PROJECT_DATA })
});

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMedia));
