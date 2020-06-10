import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { ACTIONS_SAGA } from '../../redux/shared';

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
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class CrudTableDemo extends React.Component {
  state = {
    columns: [
      {
        name: "id",
        label: "Id",
        options: {
          filter: true,
          display: 'false'
        }
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />
            } else {
              return <p>{value}</p>
            }
          }
        }
      },
      {
        name: "title",
        label: "Title",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { columnIndex, rowData, rowIndex } = tableMeta;
            const edited = rowData[rowData.length - 1];
            if (edited) {
              return <TextField id="standard-basic" value={value} onChange={event => updateValue(event.target.value)} />
            } else {
              return <p>{value}</p>
            }
          }
        }
      },
      {
        name: "edited",
        label: "Actions",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Fragment>
                <Button variant="outlined" color="secondary" onClick={() => updateValue(true)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => updateValue(false)}>
                  Save
                </Button>
              </Fragment>
            );
          }
        }
      }
    ],
    data: [
      { id: 1, name: 'chris', title: 'software engineer', edited: false },
      { id: 2, name: 'ali', title: 'software engineer', edited: false },
    ]
  }

  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    const { columns, data } = this.state;
    const { classes, customers } = this.props;

    console.log(this.props);

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
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

CrudTableDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  console.log(state.toJS());
  return {
    force: state.getIn(['app']), // force state from reducer
    customers: state.getIn(['app', 'customers'])
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_COMPANY_DATA, value })
});

const CrudTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTableDemo);

export default withStyles(styles)(CrudTableMapped);