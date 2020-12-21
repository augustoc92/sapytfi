import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'
import MateriaForm from './MateriaForm'
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

const validate = (values) => {
  const errors = {}
  const requiredFields = ['lugar', 'duracion', 'nombre']
  requiredFields.forEach((field) => {
    if (!values[field]) errors[field] = 'Required'
  })
  return errors
}

const onSubmit = (values, dispatch, props) => {
  // Aca va el ok
  // const { collapsed } = props
  // if (values.id) dispatch({}})
  // else dispatch(addItem(values))
  // dispatch(reset('materia_form'))
  // dispatch(toggleSideBar(collapsed))
}

const formConfig = {
  form: 'materia_form',
  onSubmit,
  validate,
  enableReinitialize: true,
}

export default connect(mapStateToProps)(reduxForm(formConfig)(MateriaForm))
