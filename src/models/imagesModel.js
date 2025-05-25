import sequalize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Image = sequalize.define('images', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'id',
        },
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false, // Enable timestamps
});


export default Image;
