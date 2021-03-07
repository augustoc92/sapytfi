import AulaPorDentro from './AulaPorDentro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { guardarExamen, getExamen, intentoExamen, deleteExamen } from '../../redux/modules/profesor/action'
import { getMaterialAula, deleteFile } from '../../redux/modules/aula/action'


const mapStateToProps = state => {
    return ({
        examen: state.profesor.examen,
        material: state.aula.material,
        userObj: state.ui.userObj
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    guardarExamen,
    getExamen,
    getMaterialAula,
    deleteExamen,
    deleteFile
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaPorDentro)

