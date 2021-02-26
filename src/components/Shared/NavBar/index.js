import NavBar from './NavBar';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changePass } from '../../../redux/modules/ui/actions'


const mapStateToProps = state => {
    return ({
        user: state.ui.user,
        userObj: state.ui.userObj
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePass
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

