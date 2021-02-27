import Carrera from './Carrera';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCarrera, putCarrera, deleteCarrera, addCarrera, getMateriaXCarrera } from '../../redux/modules/carrera/action'
import { getMateria } from '../../redux/modules/materia/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    const cols = getColumns(state, 'carrera')
    return ({
        data: state.carrera.data,
        materias: state.materia.data,
        materiasCarrera: state.carrera.materiaXCarrera,
        materiasDeLaCarrera: state.carrera.materiasConCarreas,
        selectedRow: state.ui.selectedRow,
        cols
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getCarrera,
    getMateria,
    putCarrera,
    getMateriaXCarrera,
    deleteCarrera,
    addCarrera,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Carrera)

