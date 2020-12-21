import Profesor from './Profesor';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProfesor, addProfesor, deleteProfesor, putProfesor } from '../../redux/modules/profesor/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    const cols = getColumns(state, 'materia')
    return ({
        data: state.profesor.data,
        collapsed: state.ui.collapsed,
        selectedRow: state.ui.selectedRow,
        cols
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getProfesor,
    addProfesor,
    deleteProfesor,
    putProfesor,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Profesor)

