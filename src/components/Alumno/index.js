import Alumno from './Alumno';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlumno } from '../../redux/modules/alumno/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    const cols = getColumns(state, 'alumno')
    return ({
        data: state.alumno.data,
        collapsed: state.ui.collapsed,
        cols
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAlumno,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Alumno)

