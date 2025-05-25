import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ornament_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  carat: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  handmade_or_resale: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  age_group: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  holy_or_ceremonial: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_disable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: false,
});

export default Product;
