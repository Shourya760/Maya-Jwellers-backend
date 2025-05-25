import Product from "./productModel";
import Category from "./categoriesModel.js";
import ProductToCategories from "./productToCategoriesModel";
import Image from "./imagesModel.js";
import User from "./userModel.js";
import BlacklistedToken from "./blacklistedTokenModel.js";

// Setup many-to-many
Product.belongsToMany(Category,
    {
        through: ProductToCategories,
        as: 'categories',
        foreignKey: 'product_id',
        otherKey: 'categories_id'
    });
Category.belongsToMany(Product, {
    through: ProductToCategories,
    as: 'products',
    foreignKey: 'categories_id',
    otherKey: 'product_id'
});

// Setup hasMany
Product.hasMany(Image,
    {
        as: 'images',
        foreignKey: 'product_id'
    });
Image.belongsTo(Product,
    {
        foreignKey: 'product_id'
    });

// Export all models
const db = { Product, Category, ProductToCategories, Image, User, BlacklistedToken };
export default db;