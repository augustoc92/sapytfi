import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSideBar, selectRow } from '../../../redux/modules/ui/actions';
import getColumns from '../../../redux/selectors/getColumns'
import CRUDTable from './CRUDTable'

const mapStateToProps = state => {
    return ({
        collapsed: state.ui.collapsed
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(CRUDTable)

