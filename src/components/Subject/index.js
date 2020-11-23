import Subject from './Subject';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMateria } from '../../redux/modules/materia/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    const cols = getColumns(state, 'materia')
    return ({
        data: state.materia.data,
        collapsed: state.ui.collapsed,
        cols
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getMateria,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Subject)

