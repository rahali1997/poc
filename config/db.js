
import { Sequelize, DataTypes } from 'sequelize';



const sequelize = new Sequelize('poc', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
export const Product = sequelize.define("products", {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}
);
(async () => {
    try {
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Unable to create table products : ', error);
    }

})();

export const User = sequelize.define("users", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}
);
(async () => {
    try {
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Unable to create table users : ', error);
    }

})();

export default connectDB;