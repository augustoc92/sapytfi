import AulaAlumno from './AulaAlumno';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getExamen, intentoExamen } from '../../redux/modules/profesor/action';

const mapStateToProps = state => {
    return ({
        examen: state.profesor.examen
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExamen,
    intentoExamen
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaAlumno)

