import { createSelector } from 'reselect'
import get from 'lodash/get'

const getList = (state, reduxModule) => {
    return state[reduxModule].data || [];
}

const getColumnsFromData = createSelector([
  getList,
], (
  list,
) => {
  const columnsToShow = []
  const columns = Object.keys(get(list, '[0]', {}))
  columns.forEach((item) => {
    const title = item.replace(/_/g, ' ')
      columnsToShow.push({
        title,
        dataIndex: item,
        key: item,
        width: 100,
      })
  })
  return columnsToShow
})

export default getColumnsFromData