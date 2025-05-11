import sequelize from '../config/db.js'; // Import sequelize as a default export
import { DataTypes } from 'sequelize';

// Define the User model
const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
});

export default Category;
