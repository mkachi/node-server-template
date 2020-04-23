import config from '../configs'
import Sequelize, { ModelAttributes, ModelOptions, Model } from 'sequelize'

const info = config.database
const orm = new Sequelize.Sequelize(info.database, info.username, info.password, {
  port: info.port,
  host: info.host,
  dialect: info.type,
  define: {
    createdAt: info.timestamp.createAt,
    updatedAt: info.timestamp.updateAt,
  },
})

export const createDAO = (tableName: string, attributes: ModelAttributes, options?: ModelOptions): typeof Model => {
  let daoOptions = options
  if (daoOptions == null) {
    daoOptions = {
      timestamps: false,
    }
  }
  daoOptions.freezeTableName = true

  const result = orm.define(tableName, attributes, daoOptions)
  return result
}

export type DAO = typeof Sequelize.Model
export default orm
