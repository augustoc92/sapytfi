import Aula from './Aula';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAula, addAula, deleteAula, putAula, getAlumnosXAula } from '../../redux/modules/aula/action'
import { getProfesor } from '../../redux/modules/profesor/action'
import { getAlumno } from '../../redux/modules/alumno/action'
import { getMateria } from '../../redux/modules/materia/action'
import { getCarrera, getAlumnosXCarrera, getMateriaXCarrera } from '../../redux/modules/carrera/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    return ({
        data: state.aula.data,
        profesor: state.profesor.data,
        carrera: state.carrera.data,
        materia: state.materia.data,
        materiaXCarrera: state.carrera.materiaXCarrera,
        alumnoXCarrera: state.carrera.alumnoXCarrera,
        alumnoXAula: state.aula.alumnoXAula,
        alumno: state.alumno.data,
        collapsed: state.ui.collapsed,
        selectedRow: state.ui.selectedRow,
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAula,
    addAula,
    getAlumnosXAula,
    deleteAula,
    putAula,
    getMateria,
    getProfesor,
    getCarrera,
    getAlumnosXCarrera,
    getMateriaXCarrera,
    getAlumno,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Aula)

