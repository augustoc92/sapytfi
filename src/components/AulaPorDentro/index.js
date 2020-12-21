import AulaPorDentro from './AulaPorDentro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => {
    return ({

    })
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AulaPorDentro)

