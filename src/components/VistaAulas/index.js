import VistaAulas from './VistaAulas';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAula, getAlumnosXAula } from '../../redux/modules/aula/action'


const mapStateToProps = state => {
    return ({
        user: state.ui.user,
        userObj: state.ui.userObj,
        aula: state.aula.data,
        alumnosXAula: state.aula.alumnoXAula,
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAula,
    getAlumnosXAula
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(VistaAulas)

