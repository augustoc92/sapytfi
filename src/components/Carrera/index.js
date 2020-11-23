import Carrera from './Carrera';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCarrera } from '../../redux/modules/carrera/action'
import { toggleSideBar, selectRow } from '../../redux/modules/ui/actions'
import getColumns from '../../redux/selectors/getColumns'

const mapStateToProps = state => {
    const cols = getColumns(state, 'carrera')
    return ({
        data: state.carrera.data,
        collapsed: state.ui.collapsed,
        cols
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getCarrera,
    toggleSideBar,
    selectRow
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Carrera)

