module.exports = (sequelize, Sequelize) => {
  const userLog = sequelize.define("userLog", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull : false,
      autoIncrement: true
    }, 
   bill_id:{
    type: Sequelize.INTEGER,
    defaultValue : 0
   },
    group_name:{
      type: Sequelize.STRING,
      allowNull:true
    }, 
    for_user_id:{
      type: Sequelize.INTEGER,
      allowNull:true,
      defaultValue : 0
    },
    file:{
      type: Sequelize.STRING,
      allowNull:true,defaultValue:''
      
    },
    paid_by_username:
    {
      type: Sequelize.STRING,
      allowNull:true
      
    },
    paid_amount: {
      type: Sequelize.INTEGER,
      allowNull:true,
      defaultValue : 0
      
    },
    lent_amount:{
      type: Sequelize.INTEGER,
      allowNull:true,
      defaultValue : 0
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull:true
      
    },
    date: {
      type: Sequelize.INTEGER,
      allowNull:true,
      defaultValue:0
      
    },
    month: {
      type: Sequelize.STRING,
      allowNull:true,
      defaultValue:''
      
    },
    bill_name: {
      type: Sequelize.STRING,
      allowNull:true,
      defaultValue:''
      
    },
    notes: {
      type: Sequelize.STRING,
      allowNull:true,
      defaultValue:''
      
    }
  },
  {timestamps: false});

  return userLog;
};
