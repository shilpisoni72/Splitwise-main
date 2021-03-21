module.exports = (sequelize, Sequelize) => {
  const userGroup = sequelize.define("userGroup", {
    group_name:
    {
      type: Sequelize.STRING,
      allowNull:false,
      primaryKey: true
    },
    number_of_members:{
      type: Sequelize.INTEGER
    },
    member_username_1: {
      type: Sequelize.STRING,
      allowNull:true,
   
    },
    member_username_2: {
      type: Sequelize.STRING,
      allowNull:true,
   
    },
    member_username_3: {
      type: Sequelize.STRING,
      allowNull:true,
      
    },
    member_username_4: {
      type: Sequelize.STRING,
      allowNull:true,
      
    },
    member_username_5: {
      type: Sequelize.STRING,
      allowNull:true,
      
    }
  },
  {timestamps: false});

  return userGroup;
};

/*,
    profileAvatar:{
      type: Sequelize.STRING
    },
    userBal:{
      type: Number},
    userOws:{
      type: Number
    },
    userOwed:{
      type: Number
    }*/
