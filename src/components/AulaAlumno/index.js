import AulaAlumno from './AulaAlumno';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getExamen, intentoExamen } from '../../redux/modules/profesor/action';
import { getMaterialAula, deleteFile, guardarMaterial } from '../../redux/modules/aula/action'


const mapStateToProps = state => {
    return ({
        examen: state.profesor.examen,
        userObj: state.ui.userObj,
        material: state.aula.material,
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExamen,
    intentoExamen,
    getMaterialAula,
    deleteFile,
    guardarMaterial
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaAlumno)

