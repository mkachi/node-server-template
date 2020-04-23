import Sequelize from 'sequelize'
import { createDAO } from '../../utils/orm'

const Info = createDAO('info', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  value: {
    type: Sequelize.STRING(10),
  },
})

export default Info
