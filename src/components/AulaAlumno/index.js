import AulaAlumno from './AulaAlumno';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getExamen } from '../../redux/modules/profesor/action';

const mapStateToProps = state => {
    return ({
        examen: state.profesor.examen
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExamen
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaAlumno)

