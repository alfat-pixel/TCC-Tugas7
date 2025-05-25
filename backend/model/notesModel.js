import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize

const Notes = db.define("notesalfat",{
    
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

},{
    timestamps: true,
});

db.sync().then(() => console.log("Database tersinkron"))
export default Notes