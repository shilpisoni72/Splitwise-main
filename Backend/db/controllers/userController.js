const db = require("../models");
const userProfile = db.userProfile;
const userGroup = db.userGroup;
const userLog = db.userLog;
const op = db.Sequelize.Op;


// Create and Save a new Tutorial
exports.signUp = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    res.status(400).send({
      message: "User name cannot be empty!"
    });
    return;
  }

  // Create a Tutorial
  const profile = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.password
  };

  // Save Tutorial in the database
  userProfile.create(profile)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(req);
      res.status(500).send({
        message:
          err.message || "Could not create the user account! Please try again!"
      });
    });
};

// Find a single Tutorial with an id
exports.find = (req, res,colArray = null, findbyUserName = false, login = false) => {
  const userName = req.body.userName;
  const userPassword = req.body.password;
  const userId    = req.body.userId;

  console.log(req.body);
  let whereObj = findbyUserName ? (
    login? 
    {
      userName: userName,
      userPassword: userPassword 
    }
    : 
    {
      userName: userName
    }
  
  )
  :
  {
    id: userId
  };

  let findObj = colArray === null ?
  {
    where: whereObj
  }
  :
  {
      where: whereObj,
      attributes : colArray
  };
console.log(JSON.stringify(findObj));
  userProfile.findAll(
    findObj
  )
    .then(data => {
      console.log(data);
      res.cookie('loggedIn','true',{maxAge: 900000, httpOnly: false, path : '/'});
      res.send(data);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(
        {
        message: "User with this username doen't exist. Please make sure that username is correct. Please signup if you are a new user."
      });
    });
};

exports.findAllUsers = (req,res) => {
  userProfile.findAll()
    .then(data => {
      console.log(data);
      res.cookie('loggedIn','true',{maxAge: 900000, httpOnly: false, path : '/'});
      res.send(data);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(
        {
        message: "User with this username doen't exist. Please make sure that username is correct. Please signup if you are a new user."
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  //const userId = req.body.userId;
  const body = req.body;
  console.log(req.body)
  let id = parseInt(req.body.userId);
  userProfile.findOne({
    
    where: { id: id}
  }
  )
  .then(record => {
    console.log(JSON.stringify(record));
    return record.update({
      ...body
  })
})
    .then(data => {
      console.log(JSON.stringify(data));
        res.send(data)})
    .catch(err => {
      res.status(500).send({
        message: "Error updating user!Please try again."
      });
    });
};

// Update a Tutorial by the id in the request
exports.sendAcceptInvite = (req, res) => {
  //const userId = req.body.userId;
  const body = req.body;
  console.log(req.body)
  let userName = req.body.userName;
  userProfile.findOne({
    
    where: { userName: userName}
  }
  )
  .then(record => {
    console.log(JSON.stringify(record));
    return record.update({
      ...body
  })
})
    .then(data => {
      console.log(JSON.stringify(data));
        res.send(data)})
    .catch(err => {
      res.status(500).send({
        message: "Error updating user!Please try again."
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const userName = req.params.userName;

  userProfile.destroy({
    where: { userName: userName }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete the user! Maybe the user with this username does not exist!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete the user! Please try again."
      });
    });
};

exports.findGroups = (req,res) => {
  const group_name = req.body.group_name;
  userGroup.findAll({
    where : {
        group_name : group_name 
    }
  })
  .then(data => {
    res.send(data)
  })
  .catch(err =>{
    res.status(500).send(err.message)  })
}
exports.addGroup = (req,res) => {

  console.log("add group",req.body)
  const group = {
    group_name : req.body.group_name,
    member_username_1 : req.body.member_username_1,
    member_username_2 : req.body.member_username_2,
    member_username_3 : req.body.member_username_3,
    member_username_4 : req.body.member_username_4,
    member_username_5 : req.body.member_username_5,
    number_of_members : req.body.number_of_members

  }
  userGroup.create(group)
  .then(data => {
    console.log(data);
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Could not create the user account! Please try again!"
    });
  });
}

exports.getAllGroups = (req,res) => {
   const userName  = req.body.userName;
   console.log(userName);
   userGroup.findAll({
      where :{
        [op.or] : [
          {member_username_1 : userName} ,
          {member_username_2 : userName},
          {member_username_3 : userName},
          {member_username_4 : userName},
          {member_username_5 : userName}
        ]
      }
   })
   .then(data => {
     res.send(data)
   })
.catch(err => {
  res.status(500).send(err.message)
})
}

exports.getGroupDetails = (req,res) => {
  const group_name  = req.body.group_name;
  console.log(group_name);
  userGroup.findAll({
     where :{
      group_name :group_name
     }
  })
  .then(data => {
    console.log(data);
    res.send(data)
  })
.catch(err => {
 res.status(500).send(err.message)
})
}

exports.getLogs = (req,res) => {
  const userId = req.body.userId;

  userLog.findAll({where : {
    for_user_id : parseInt(userId)
  }})
  .then(data => {
    res.send(data)
  })
.catch(err => {
 res.status(500).send(err.message)
})
}

exports.insertLog = (req,res) => {
  const log = {
    year:             req.body.year,
    group_name: req.body.group_name,
    notes: req.body.notes,
    paid_by_username: req.body.paid_by_username,
    bill_id: req.body.bill_id,
    date:req.body.date,
    paid_amount: req.body.paid_amount,
    lent_amount: req.body.lent_amount,
    month: req.body.month,
    for_user_id: req.body.for_user_id,
    file:req.body.file,
    bill_name: req.body.bill_name

  };
  console.log(JSON.stringify(req.body));
  console.log("---------------------------",log);
  userLog.create(log)
  .then(data => {
    res.send(data)
  })
.catch(err => {
 res.status(500).send(err.message)
})
}


