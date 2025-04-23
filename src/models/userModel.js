import sequelize from '../config/db.js'; // Import sequelize as a default export
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

// Define the User model
const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,  // 👈 Add this line,
    defaultScope: {
        attributes: { exclude: ['password'] }  // Exclude password by default
    },
});

// Hash password before saving the user
User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10); // Hash the password
    }
});

User.beforeUpdate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10); // Hash the password before update
    }
});

export default User;
