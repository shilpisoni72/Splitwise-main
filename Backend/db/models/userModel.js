module.exports = (sequelize, Sequelize) => {
  const userProfile = sequelize.define("userProfile", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull : false,
      autoIncrement: true
    },  
    group_name:{
      type: Sequelize.STRING
    },
    acceptInvite:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    userEmail:
    {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    userName: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    userPassword: {
      type: Sequelize.STRING,
      allowNull:false
    },
  total_friends : {
    type: Sequelize.INTEGER,
    allowNull : true
  },

  friend_username_1:
  {
    type: Sequelize.STRING,
    allowNull:true
  },
 
  friend_username_2:
  {
    type: Sequelize.STRING,
    allowNull:true
  },

  friend_username_3:
  {
    type: Sequelize.STRING,
    allowNull:true
  },

  friend_username_4:
  {
    type: Sequelize.STRING,
    allowNull:true
  },
  
  friend_username_5:
  {
    type: Sequelize.STRING,
    allowNull:true
  },
 
  friend_username_6:
  {
    type: Sequelize.STRING,
    allowNull:true
  },
  friend_username_7:
  {
    type: Sequelize.STRING,
    allowNull:true
  },
 
  friend_username_8:
  {
    type: Sequelize.STRING,
    allowNull:true
  },
 
  friend_username_9:
  {  type: Sequelize.STRING,
    allowNull:true
  }, 
   
    friend_username_10:
    {
     type: Sequelize.STRING,
    allowNull:true
  },
  total_balance:{
    type: Sequelize.INTEGER,
    allowNull: true
  }
  },
  {timestamps: false});

  return userProfile;
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
