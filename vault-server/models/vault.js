const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Vault extends Model {
        static associate(models){}
    }

    Vault.init({
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
            
        },
        name: DataTypes.STRING,
        passcode: DataTypes.INTEGER,
        content: DataTypes.STRING
    },{
        sequelize,
        modelName: 'Vault'
    });
    return Vault;
};