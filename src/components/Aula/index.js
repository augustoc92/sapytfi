import Aula from './Aula';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAula, addAula, deleteAula, putAula } from '../../redux/modules/aula/action'
import { getProfesor } from '../../redux/modules/profesor/action'
import { getMateria } from '../../redux/modules/materia/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    return ({
        data: state.aula.data,
        profesor: state.profesor.data,
        materia: state.materia.data,
        collapsed: state.ui.collapsed,
        selectedRow: state.ui.selectedRow,
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAula,
    addAula,
    deleteAula,
    putAula,
    getMateria,
    getProfesor,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Aula)

