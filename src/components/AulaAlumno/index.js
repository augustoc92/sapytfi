import AulaAlumno from './AulaAlumno';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getExamen, intentoExamen } from '../../redux/modules/profesor/action';
import { tomarExamen, getExamenNota } from '../../redux/modules/alumno/action';
import { getMaterialAula, deleteFile, guardarMaterial } from '../../redux/modules/aula/action'


const mapStateToProps = state => {
    return ({
        examen: state.profesor.examen,
        examenesAlumnos: state.alumno.examenesAlumnos,
        userObj: state.ui.userObj,
        material: state.aula.material,
        userObj: state.ui.userObj
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExamen,
    intentoExamen,
    getMaterialAula,
    deleteFile,
    guardarMaterial,
    tomarExamen,
    getExamenNota
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaAlumno)

