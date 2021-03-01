import AulaPorDentro from './AulaPorDentro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { guardarExamen, getExamen, intentoExamen } from '../../redux/modules/profesor/action'


const mapStateToProps = state => {
    return ({
        examen: state.profesor.examen
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    guardarExamen,
    getExamen
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaPorDentro)

