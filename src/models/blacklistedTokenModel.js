import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const BlacklistedToken = sequelize.define('BlacklistedToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'blacklisted_tokens',
    timestamps: true, // adds createdAt and updatedAt
});

export default BlacklistedToken;
