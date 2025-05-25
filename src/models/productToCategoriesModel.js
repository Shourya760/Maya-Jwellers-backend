import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


export const ProductToCategories = sequelize.define('product_to_categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
}, {
    timestamps: false,
});

export default ProductToCategories;