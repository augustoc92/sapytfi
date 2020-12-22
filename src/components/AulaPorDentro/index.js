import AulaPorDentro from './AulaPorDentro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { guardarExamen } from '../../redux/modules/profesor/action'


const mapStateToProps = state => {
    return ({

    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    guardarExamen
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaPorDentro)

