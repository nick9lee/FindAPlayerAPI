const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Nick1:findAPlayer1@cluster0.jnx3c.mongodb.net/findAPlayer", { useUnifiedTopology: true,useNewUrlParser: true});

const userSchema = {
  UID: String,
  CID: String,
  Fname: String,
  Lname: String,
  Email: String,
  Password: String,
  Gender: String,
  Addr: String,
  Date_Joined: String
};

const chatSchema = {
  CID: String,
  Date_Created: String
};

const messageSchema = {
  UID: String,
  CID: String,
  TimeStamp: String,
  Body: String
};

const commentSchema = {
  Time_Added: String,
  UID: String,
  Body: String,
  PID: String
};

const replySchema = {
  UID: String,
  Comment_time: String,
  Time_added: String,
  Body: String
};

const postSchema = {
  PID: String,
  Title: String,
  Time_posted: String,
  Body: String,
  Resolved_status: String,
  Coach_ID: String,
  UID: String,
  SID: String
};

const plays_sportSchema = {
  UID: String,
  SID: String
};

const sportSchema = {
  SID: String,
  Name: String
};

const roleSchema = {
  SID: String,
  Name: String,
  Description: String,
  Experience: String
};

const plays_roleSchema = {
  UID: String,
  RoleID: String
};

const ratingSchema = {
  UID: String,
  RoleID: String,
  Body: String,
  Time_added: String
};

//dealing with posts -----------------------------------------------------------------------------------
const post = mongoose.model("post", postSchema);

app.route("/posts")

.get(function(req,res){
  post.find(function(err, foundPost){
    if(!err){
      res.send(foundPost);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new post

  const newPost = new post({
    PID: req.body.PID,
    Title: req.body.Title,
    Time_posted: req.body.Time_posted,
    Body: req.body.Body,
    Resolved_status: req.body.Resolved_status,
    Coach_ID: req.body.Coach_ID,
    UID: req.body.UID,
    SID: req.body.SID
  });

  newPost.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

//getting post by pid
app.route("/posts/:postPID")

.get(function(req,res){
  post.findOne({PID: req.params.postPID}, function(err, foundPost){
    if(foundPost){
      res.send(foundPost);
    } else {
      res.send("post not found");
    }
  });
})

.patch(function(req, res){
  post.updateOne(
    {PID: req.params.postPID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  post.deleteOne(
    {PID: req.params.postPID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

//getting post by UID
app.route("/posts/:postPID/:flag1")

.get(function(req,res){
  post.find({UID: req.params.postPID}, function(err, foundPost){
    if(foundPost){
      res.send(foundPost);
    } else {
      res.send("post not found");
    }
  });
})

.patch(function(req, res){
  post.updateOne(
    {UID: req.params.postPID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  post.deleteOne(
    {UID: req.params.postPID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

//getting post by SID
app.route("/posts/:postPID/:flag1/:flag2")

.get(function(req,res){
  post.find({SID: req.params.postPID}, function(err, foundPost){
    if(foundPost){
      res.send(foundPost);
    } else {
      res.send("post not found");
    }
  });
})

.patch(function(req, res){
  post.updateOne(
    {SID: req.params.postPID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  post.deleteOne(
    {SID: req.params.postPID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});


//dealing with ratings ----------------------------------------------------------------------

const rating = mongoose.model("rating", ratingSchema);

app.route("/ratings")

.get(function(req,res){
  rating.find(function(err, foundrating){
    if(!err){
      res.send(foundrating);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){

  const newrating = new rating({
    UID: req.body.UID,
    RoleID: req.body.RoleID,
    Body: req.body.Body,
    Time_added: req.body.Time_added
  });

  newrating.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

app.route("/ratings/:ratingUID/:ratingRoleID")

.get(function(req,res){
  rating.findOne({UID: req.params.ratingUID, RoleID: req.params.ratingRoleID}, function(err, foundRating){
    if(foundRating){
      res.send(foundRating);
    } else {
      res.send("role not found");
    }
  });
})

.patch(function(req, res){
  rating.updateOne(
    {UID: req.params.ratingUID, RoleID: req.params.ratingRoleID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  rating.deleteOne(
    {UID: req.params.ratingUID, RoleID: req.params.ratingRoleID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

//dealing with plays_role --------------------------------------------------------------------

const plays_role = mongoose.model("plays_role", plays_roleSchema);

app.route("/plays_roles")

.get(function(req,res){
  plays_role.find(function(err, foundPR){
    if(!err){
      res.send(foundPR);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){

  const newPR = new plays_role({
    UID: req.body.UID,
    RoleID: req.body.RoleID,
  });

  newPR.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

app.route("/plays_roles/:prUID")

.get(function(req,res){
  plays_role.findOne({UID: req.params.prUID}, function(err, foundPR){
    if(foundPR){
      res.send(foundPR);
    } else {
      res.send("role not found");
    }
  });
})

.patch(function(req, res){
  plays_role.updateOne(
    {UID: req.params.prUID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  plays_role.deleteOne(
    {UID: req.params.prUID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

//dealing with roles =---------------------------------------------------------------------

const role = mongoose.model("role", roleSchema);

app.route("/roles")

.get(function(req,res){
  role.find(function(err, foundRole){
    if(!err){
      res.send(foundRole);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){

  const newRole = new role({
    SID: req.body.SID,
    Name: req.body.Name,
    Description: req.body.Description,
    Experience: req.body.Experience
  });

  newRole.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

app.route("/roles/:roleSID")

.get(function(req,res){
  role.findOne({SID: req.params.roleSID}, function(err, foundrole){
    if(foundrole){
      res.send(foundrole);
    } else {
      res.send("role not found");
    }
  });
})

.patch(function(req, res){
  role.updateOne(
    {SID: req.params.roleSID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  role.deleteOne(
    {SID: req.params.roleSID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

//dealing with sports -------------------------------------------------------------------------

const sport = mongoose.model("sport", sportSchema);

app.route("/sports")

.get(function(req,res){
  sport.find(function(err, foundSport){
    if(!err){
      res.send(foundSport);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new post

  const newsport = new sport({
    SID: req.body.SID,
    Name: req.body.Name
  });

  newsport.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

app.route("/sports/:sportSID")

.get(function(req,res){
  sport.findOne({SID: req.params.sportSID}, function(err, foundsport){
    if(foundsport){
      res.send(foundsport);
    } else {
      res.send("sport not found");
    }
  });
})

.patch(function(req, res){
  sport.updateOne(
    {SID: req.params.sportSID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  sport.deleteOne(
    {SID: req.params.sportSID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});
//dealing with plays_sports ------------------------------------------------------------------------

const plays_sport = mongoose.model("plays_sport", plays_sportSchema);

app.route("/plays_sports")

.get(function(req,res){
  plays_sport.find(function(err, foundPS){
    if(!err){
      res.send(foundPS);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new post

  const newPS = new plays_sport({
    UID: req.body.UID,
    SID: req.body.SID
  });

  newPS.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

app.route("/plays_sports/:psUID")

.get(function(req,res){
  plays_sport.findOne({UID: req.params.psUID}, function(err, foundPS){
    if(foundPS){
      res.send(foundPS);
    } else {
      res.send("plays_sport not found");
    }
  });
})

.patch(function(req, res){
  plays_sport.updateOne(
    {UID: req.params.psUID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  plays_sport.deleteOne(
    {UID: req.params.psUID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

//dealing with replies --------------------------------------------------------------------------------

const reply = mongoose.model("reply", replySchema);

app.route("/replies")

.get(function(req,res){
  reply.find(function(err, foundReply){
    if(!err){
      res.send(foundReply);
    } else {
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new reply

  const newReply = new reply({
    UID: req.body.UID,
    Comment_time: req.body.Comment_time,
    Time_added: req.body.Time_added,
    Body: req.body.Body
  });

  newReply.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

app.route("/replies/:replyUID/:replyComment_time/:replyTime_added")

.get(function(req,res){
  reply.findOne({UID: req.params.replyUID, Comment_time: req.params.replyComment_time, Time_added: req.params.replyTime_added}, function(err, foundreply){
    if(foundreply){
      res.send(foundreply);
    } else {
      res.send("reply not found");
    }
  });
})

//change one or more fields of chat with matching CID
.patch(function(req, res){
  reply.updateOne(
    {UID: req.params.replyUID, Comment_time: req.params.replyComment_time, Time_added: req.params.replyTime_added},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){    //delete single chat
  reply.deleteOne(
    {UID: req.params.replyUID, Comment_time: req.params.replyComment_time, Time_added: req.params.replyTime_added},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});




//dealing with all comments --------------------------------------------
const comment = mongoose.model("comment", commentSchema);

app.route("/comments")

.get(function (req,res){      //getting all comments
  comment.find(function(err, foundComment){
    if(!err){
      res.send(foundComment);
    } else{
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new comment

  const newComment = new comment({
    Time_Added: req.body.Time_Added,
    UID: req.body.UID,
    Body: req.body.Body,
    PID: req.body.PID
  });

  newComment.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

// methods dealing with single comment
app.route("/comments/:commentTime_Added")

.get(function(req,res){
  comment.findOne({Time_Added: req.params.commentTime_Added}, function(err, foundComment){
    if(foundComment){
      res.send(foundComment);
    } else {
      res.send("comment not found");
    }
  });
})


.patch(function(req, res){
  comment.updateOne(
    {Time_Added: req.params.commentTime_Added},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){    //delete single comment
  comment.deleteOne(
    {Time_Added: req.params.commentTime_Added},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

// message - methods dealing with all messageSchema
const message = mongoose.model("message", messageSchema);

app.route("/messages")

.get(function (req,res){      //getting all messages
  message.find(function(err, foundMessage){
    if(!err){
      res.send(foundMessage);
    } else{
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new message

  const newMessage = new message({
    UID: req.body.UID,
    CID: req.body.CID,
    TimeStamp: req.body.TimeStamp,
    Body: req.body.Body
  });

  newMessage.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

app.route("/messages/:messageUID/:messageCID/:messageTime")

.get(function(req,res){
  message.findOne({UID: req.params.messageUID, CID: req.params.messageCID, TimeStamp: req.params.messageTime}, function(err, foundMessage){
    if(foundMessage){
      res.send(foundMessage);
    } else {
      res.send("chat not found");
    }
  });
})


.patch(function(req, res){
  message.updateOne(
    {UID: req.params.messageUID, CID: req.params.messageCID, TimeStamp: req.params.messageTime},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){    //delete single chat
  message.deleteOne(
    {UID: req.params.messageUID, CID: req.params.messageCID, TimeStamp: req.params.messageTime},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});

//chats - methods dealing with all chats ---------------------------------------------

const chat = mongoose.model("chat", chatSchema);

app.route("/chats")

.get(function (req,res){      //getting all chats
  chat.find(function(err, foundChat){
    if(!err){
      res.send(foundChat);
    } else{
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new chat

  const newChat = new chat({
    CID: req.body.CID,
    Date_Created: req.body.Date_Created
  });

  newChat.save(function(err){
    if(!err){
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

// methods dealing with single chat
app.route("/chats/:chatCID")

.get(function(req,res){
  chat.findOne({CID: req.params.chatCID}, function(err, foundChat){
    if(foundChat){
      res.send(foundChat);
    } else {
      res.send("chat not found");
    }
  });
})

//change one or more fields of chat with matching CID
.patch(function(req, res){
  chat.updateOne(
    {CID: req.params.chatCID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){    //delete single chat
  chat.deleteOne(
    {CID: req.params.chatCID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});


//users - methods dealing with all users-----------------------------------------------
const user = mongoose.model("user", userSchema);
//TODO

app.route("/users")

.get(function (req,res){      //getting all users
  user.find(function(err, foundUser){
    if(!err){
      res.send(foundUser);
    } else{
      res.send(err);
    }
  });
})

.post(function(req,res){    //posting new user

  const newUser = new user({
    UID: req.body.UID,
    CID: req.body.CID,
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    Email: req.body.Email,
    Password: req.body.Password,
    Gender: req.body.Gender,
    Addr: req.body.Addr,
    Date_Joined: req.body.Date_Joined
  });

  newUser.save(function(err){
    if(!err){
      res.send("Successfully saved");
    } else {
      res.send(err);
    }
  });

});

//users - methods dealing with individual users
app.route("/users/:userUID")

//get single user based off UID
.get(function(req,res){
  user.findOne({UID: req.params.userUID}, function(err, foundUser){
    if(foundUser){
      res.send(foundUser);
    } else {
      res.send("user not found");
    }
  });
})

//change one or more fields of user with matching _UID
.patch(function(req, res){
  user.updateOne(
    {UID: req.params.userUID},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successful");
      } else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  user.deleteOne(
    {UID: req.params.userUID},
    function(err){
      if(!err){
        res.send("success");
      } else {
        res.send(err);
      }
    }
  );
});





app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
