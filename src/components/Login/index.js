import LoginForm from './LoginForm';
import { connect } from 'react-redux'
import { getProfesor } from '../../redux/modules/profesor/action'
import { getAlumno } from '../../redux/modules/alumno/action'
import { loggear, getAdmin } from '../../redux/modules/ui/actions'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => {
    return ({
        profesor: state.profesor.data,
        alumno: state.alumno.data,
        admin: state.ui.admin
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getProfesor,
    getAlumno,
    getAdmin,
    loggear
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

