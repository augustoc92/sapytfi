import Alumno from './Alumno';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlumno, addAlumno, putAlumno, deleteAlumno } from '../../redux/modules/alumno/action'
import { getCarrera } from '../../redux/modules/carrera/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    const cols = getColumns(state, 'alumno')
    return ({
        data: state.alumno.data,
        selectedRow: state.ui.selectedRow,
        carrera: state.carrera.data,
        collapsed: state.ui.collapsed,
        userObj: state.ui.userObj,
        cols
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAlumno,
    getCarrera,
    addAlumno,
    putAlumno,
    deleteAlumno,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Alumno)

