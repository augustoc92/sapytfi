import NavBar from './NavBar';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => {
    return ({
        user: state.ui.user,
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

