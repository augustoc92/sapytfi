import AulaPorDentro from './AulaPorDentro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { guardarExamen, getExamen, intentoExamen, deleteExamen, getPreguntas, putPreguntasExamenes } from '../../redux/modules/profesor/action'
import { getMaterialAula, deleteFile, guardarMaterial } from '../../redux/modules/aula/action'
import { getAlumno } from '../../redux/modules/alumno/action'
import { getAula, getAlumnosXAula, cerrarCuatrimetre, getCuatrimestres } from '../../redux/modules/aula/action'
import { getExamenNota } from '../../redux/modules/alumno/action'


const mapStateToProps = state => {
    return ({
        examen: state.profesor.examen,
        material: state.aula.material,
        preguntasExamen: state.profesor.preguntasExamenes,
        examenesAlumnos: state.alumno.examenesAlumnos,
        userObj: state.ui.userObj,
        alumnosXAula: state.aula.alumnoXAula,
        aulasFinalizadas: state.aula.aulasFinalizadas,
        alumnos: state.alumno.data,
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    guardarExamen,
    getExamen,
    getMaterialAula,
    deleteExamen,
    deleteFile,
    guardarMaterial,
    getPreguntas,
    putPreguntasExamenes,
    getExamenNota,
    getAlumnosXAula,
    getAlumno,
    cerrarCuatrimetre,
    getCuatrimestres
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaPorDentro)

