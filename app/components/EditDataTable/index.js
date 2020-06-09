import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CrudTable from '../Tables/CrudTable';
import styles from '../Tables/tableStyle-jss';
import {
  fetchAction,
  addAction,
  removeAction,
  updateAction,
  editAction,
  saveAction,
  closeNotifAction
} from '../../redux/actions/crudTbActions';

import { ACTIONS_SAGA } from '../../redux/shared';

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  },
  {
    name: 'logoPath',
    label: 'Logo',
    type: 'file',
    initialValue: '',
    // options: ['Aizaz', 'Electronics', 'Sporting Goods', 'Apparels', 'Other'],
    width: 'auto',
    hidden: false
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    initialValue: 'Company Name',
    // options: ['Aizaz', 'Electronics', 'Sporting Goods', 'Apparels', 'Other'],
    width: 'auto',
    hidden: false
  },
  {
    name: 'officeNoAndBuilding',
    label: 'Office Number',
    type: 'text',
    initialValue: 'This is testing',
    width: '100',
    hidden: false
  }, {
    name: 'city',
    label: 'City',
    type: 'text',
    initialValue: 'Enter City',
    width: 'auto',
    hidden: false
  }, {
    name: 'country',
    label: 'Country',
    type: 'text',
    initialValue: 'Enter Country',
    width: 'auto',
    hidden: false
  }, {
    name: 'email',
    label: 'Email',
    type: 'text',
    initialValue: 'email@email.com',
    width: 'auto',
    hidden: false
  }, {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'mobile',
    label: 'Mobile',
    type: 'text',
    initialValue: '',
    hidden: false
  }, {
    name: 'contactName',
    label: 'Contact Name',
    type: 'text',
    initialValue: '',
    hidden: false
  }, {
    name: 'contactTitle',
    label: 'Contact Title',
    type: 'text',
    initialValue: '',
    hidden: false
  }, {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    hidden: false,
    width: 'auto'
  },
];
const dataApi = [];

class CrudTableDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.props.fetchCompanyData();
  }

  render() {
    const {
      classes,
      fetchData,
      addEmptyRow,
      dataTable,
      removeRow,
      updateRow,
      editRow,
      finishEditRow,
      closeNotif,
      messageNotif,
    } = this.props;

    console.log(this.props);
    if (dataApi != undefined && (dataApi != null || dataApi != dataApi.length > 0)) {
      return (
        <div>
          {/* <Notification close={() => closeNotif(branch)} message={messageNotif} /> */}
          <input type="button" value="Click me" onClick={() => this.props.testSaga('in reducer from component through saga.')} />
          <div className={classes.rootTable}>
            <CrudTable
              dataInit={dataApi}
              anchor={anchorTable}
              title="Inventory Data"
              dataTable={dataTable}
              fetchData={fetchData}
              addEmptyRow={addEmptyRow}
              removeRow={removeRow}
              updateRow={updateRow}
              editRow={editRow}
              finishEditRow={finishEditRow}
              branch={branch}
            />
          </div>
        </div>
      );
    }
  }
}

CrudTableDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  dataTable: PropTypes.object.isRequired,
  addEmptyRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

// Reducer Branch
const branch = 'app';

const mapStateToProps = state => {
  console.log(state);
  return {
    force: state, // force state from reducer
    dataTable: state.getIn([branch, 'dataTable']),
    messageNotif: state.getIn([branch, 'notifMsg'])
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  addEmptyRow: bindActionCreators(addAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  updateRow: bindActionCreators(updateAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  finishEditRow: bindActionCreators(saveAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
  // testSaga: (value) => dispatch({ type: ACTIONS_SAGA.ADD_PROFILE, value }),
  fetchCompanyData: (value) => dispatch({ type: ACTIONS_SAGA.FETCH_COMPANY_DATA, value }),

});

const CrudTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTableDemo);

export default withStyles(styles)(CrudTableMapped);
