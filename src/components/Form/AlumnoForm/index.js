import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AlumnoForm from './AlumnoForm'
import {
  toggleSideBar
} from '../../../redux/modules/ui/actions'

const mapStateToProps = (state) => {
  const { selectedRow } = state.ui
  return ({
    selectedRow,
    initialValues: {
      ...selectedRow,
    }
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSideBar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)((AlumnoForm))
