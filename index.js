const express = require("express");
const app = express();
const mongoose = require('./db/mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
app.use(bodyParser.json(),cors());
const saltRounds = 10;
var lodash = require('lodash');

var {Government} = require('./models/government');
var {Parent} = require('./models/parent');
var {Creche} = require('./models/creche');
var {Faculty} = require('./models/faculty');
var {Notice} = require('./models/notice');
var {Complain} = require('./models/complains');

app.post('/contact',function(req,res){
    nodemailer.createTestAccount((err, account) => {
    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "national.creche@gmail.com", 
            pass: "creche123"
        } });
    var mailOptions={
        to : "national.creche@gmail.com",
        from : "national.creche@gmail.com",
        subject : "Contact Admin",
        html : "From <b>" + req.body.name + ",</b><br>" + req.body.description + "<br><br>The following request has been received from <br><b>" + req.body.email + "</b><br><br>Revert back on behalf of National Creche."
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error) res.end("error");
        else res.json({"result":true});
    })
})
});

app.patch('/edit' , (req,res) => {
    var body = lodash.pick(req.body ,['name','email','mobile','address']);

    Parent.findOneAndUpdate( {"email" : req.body.email}, {$set : body} , {new : true}).then((user) => {
        if(!user) {
            return res.send(404).send();
        }
    console.log(user);
    res.send(user)
    }).catch((e) => {
        console.log(e);
    }); 

})

app.post('/notice' , function(req,res) {
    var not = new Notice ({
        title : req.body.title,
        description : req.body.description,
        crecheEmail : req.body.crecheEmail
    });
    not.save().then((doc) => {
        res.send(doc);
    } , (e) => {
        res.status(400).send(e)
    });
})

app.post('/complain' , function(req,res) {
    var comp = new Complain ({
        subject : req.body.subject,
        description : req.body.description,
        crecheEmail : req.body.crecheEmail,
        parentEmail : req.body.parentEmail
    });
    comp.save().then((doc) => {
        res.send(doc);
    } , (e) => {
        res.status(400).send(e)
    });
})

app.post('/checkregister',function(req ,res){
    if(req.body.radio == "Government") {
    Government.find({ email : req.body.email}).then((gov) => {
        if (gov.length < 1) {
            return res.status(401).json({message: "Auth failed"});
        }
        var g = gov[0];
        if(g.password == req.body.password) {
            bcrypt.hash(req.body.npassword, saltRounds,  (err, hash) => {
                if (err) {
                  return res.status(500).json({error: err});
                } 
                else {
                g.password = hash;
                g.save();
                res.json({"result" : true})
                }
        })
        }
        })
    }
    if(req.body.radio == "Creche") {
        Creche.find({ email : req.body.email}).then((cre) => {
        if (cre.length < 1) {
            return res.status(401).json({message: "Auth failed"});
        }
        var c = cre[0];
        if(c.password == req.body.password) {
            bcrypt.hash(req.body.npassword, saltRounds,  (err, hash) => {
                if (err) {
                  return res.status(500).json({error: err});
                } 
                else {
                c.password = hash;
                c.save();
                res.json({"result" : true})
                }
        })
    }
    })
    }
    if(req.body.radio == "Parent") {
    Parent.find({ email : req.body.email}).then((par) => {
        if (par.length < 1) {
            return res.status(401).json({message: "Auth failed"});
        }
        var p = par[0];
        if(p.password == req.body.password) {
            bcrypt.hash(req.body.npassword, saltRounds,  (err, hash) => {
                if (err) {
                  return res.status(500).json({error: err});
                } 
                else {
                    p.password = hash;
                    p.save();
                    res.json({"result" : true})
                }
            })
            }
        })
    }
})

app.post('/sendRegisterMail',function(req,res){
    if(req.body.db == 'creche'){
        Creche.findOne({email:req.body.email},function(err,r){
            if(err) console.log("Error : Creche FindOne\n",err);
            else if(r) return res.json({"result":true});
            else{
                var creche = new Creche;
                creche.email = req.body.email;
                creche.password = req.body.password;
                creche.save();
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error) res.end("Error : SMTP Transport Creche\n",error);
                });
                return res.json({"result":true});
            }
        });
    }
    else if(req.body.db == 'admin'){
        Government.findOne({email:req.body.email},function(err,r){
            if(err) console.log("Error : Government FindOne\n",err);
            else if(r) return res.json({"result":true});
            else{
                var gov = new Government;
                gov.email = req.body.email;
                gov.password = req.body.password;
                gov.save();
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error) res.end("Error : SMTP Transport Government\n",error);
                });
                return res.json({"result":true});
            }
        });
    }
    else if(req.body.db == "children"){
        Parent.findOne({email:req.body.email},function(err,r){
            if(err) console.log("Error : Children FindOne\n",err);
            else if(r) return res.json({"result":true});
            else{
                var child = new Parent;
                child.email = req.body.email;
                child.password = req.body.password;
                child.crecheEmail = req.body.crecheEmail;
                child.crecheName = req.body.crecheName
                child.save();
                smtpTransport.sendMail(mailOptionsChild,function(error,response){
                    if(error) console.log("Error : SMTP Transport Children\n",error);
                });
            }
        });
    }
    else if(req.body.db == "faculty"){
        Faculty.findOne({email:req.body.email},function(err,r){
            if(err) console.log("Error : Faculty FindOne\n");
            else if(r) res.json({"result":true});
            else{
                var fac = new Faculty;
                fac.email = req.body.email;
                fac.name = req.body.name;
                fac.mobile = req.body.mobile;
                fac.address = req.body.address;
                fac.aadhar = req.body.aadhar;
                fac.crecheEmail = req.body.crecheEmail;
                fac.crecheName = req.body.crecheName;
                fac.save();
                smtpTransport.sendMail(mailOptionsFaculty,function(error,response){
                    if(error) console.log("Error : SMTP Transport Faculty\n",error);
                });
            }
        });
    }
    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "national.creche@gmail.com", 
            pass: "creche123"
        } });
    var mailOptions={
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Registration Successful",
        html : '<b>Hello dear,<br>This is to bring to your attention that your registration for National Creche has been successful. Your Id and OTP(One Time Password) is as follows<br>ID  :' + req.body.email + '<br>Password : ' + req.body.password + '<br>Please Note : You are solely responsible for all the entries that are made. If at any point you are found to have entered false entries then strict actions will be taken againt you.<hr>Regards,<br>National Creche Team<b>'
    }
    var mailOptionsChild = {
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Registration Successful",
        html : "<b>Hello Dear,<br>We would love to inform you that your ward's admission has been successfully registered under the National Creche Program. Your ward's safety is our utmost importance. We would like you to please visit our official page and fill out your details.<br>Your login details are as follows :<br>ID - " + req.body.email + "<br>OTP - " + req.body.password + "<br>We will inform you about your child's activities and notices on our official site, so please stay tuned<br>For any queries please revert or contact us on this mail id - " + req.body.crecheEmail + "<hr>Regards<br>National Creche Team"
    }
    var mailOptionsFaculty = {
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Registration Successful",
        html : "Hello Dear,<br>With reference to your interview, we would like to inform you that you have been selected for the job offered. It is mandatory that you login on our home page with the following details<br>ID : " + req.body.email + "<br>OTP : " + req.body.password + "<br>All the details submitted and filled in this form must be genuine. You are solely responsible for the details claimed by you.<br>For any queries revert please contact us or revert on this mail id - " + req.body.crecheEmail + "<hr>Regards<br>National Creche Team"
    }
});

app.post('/crechelist' ,(req , res) => {
    Creche.find().then((cre) => {
        res.send(cre);
    } ,(e) => {
        res.status(400).send(e);
    })
});

app.post('/noticelist' ,function(req,res){
    Notice.find({ crecheEmail : req.body.email},function(err,r){
        if(err) console.log("Notice List Error");
        else res.json({"result":r});
    })
});

app.post('/complainlist' ,function(req,res){
    Complain.find({crecheEmail:req.body.crecheEmail},function(err,r){
        if(err) console.log("Error in Comaplain List ",err);
        else res.send(r);
    });
});

app.post('/childrenlist',function(req,res){
    Parent.find({ crecheEmail : req.body.email},function(err,r){
        if(err) console.log("Error");
        else if(r) res.send(r);
    });
});

app.post('/facultylist',function(req,res){
    Faculty.find({ crecheEmail : req.body.email},function(err,r){
        if(err) console.log("Error");
        else if(r) res.send(r);
    });
});

app.post('/govregister',(req ,res) => { 
    Government.find({ email : req.body.email}).then((gov) => {
        if (gov.length < 1) {
            return res.status(401).json({message: "Auth failed"});
        }
        var g = gov[0];
        g.name = req.body.name;
        g.address = req.body.address;
        g.mobile = req.body.mobile;
        g.designation = req.body.designation;
        g.department = req.body.department;
        g.aadhar = req.body.aadhar        
        g.save();
    })    
});

app.post('/parentregister',(req ,res) => { 
    Parent.find({ email : req.body.email}).then((parent) => {
        if (parent.length < 1) {
            return res.status(401).json({message: "Auth failed"});
        }
        var p = parent[0];
        p.name = req.body.name;
        p.address = req.body.address;
        p.mobile = req.body.mobile;
        p.cname = req.body.cname;
        p.cage= req.body.cage;
        p.aadhar = req.body.aadhar;
        p.caadhar = req.body.caadhar;        
        p.save();
    })    
});

app.post('/crecheregister',function(req ,res){
    Creche.find({ email : req.body.email}).then((cre) => {
        if (cre.length < 1) {
            return res.status(401).json({message: "Auth failed"});
        }
        var c = cre[0];
        c.name = req.body.name;
        c.address = req.body.address;
        c.mobile = req.body.mobile;
        c.cname = req.body.cname;
        c.aadhar = req.body.aadhar;
        c.description = req.body.description;        
        c.save();
    })    
});

app.post('/login',function(req,res){
    if(req.body.radio == 'Government'){
        Government.findOne({email:req.body.email},function(err,r){
            if(err) return console.log("Error : ",err);
            else if(r){
                bcrypt.compare(req.body.password,r.password,function(error,result){
                    if(error) console.log("Error : ",error);
                    else if(result) return res.json({"result":true , "name":r.name , "email":r.email});
                    else return res.json({"result":false});
                });
            }
        });
    }
    else if(req.body.radio == 'Creche'){
        Creche.findOne({email:req.body.email},function(err,r){
            if(err) console.log("Error : ",err);
            else if(r){
                bcrypt.compare(req.body.password,r.password,function(error,result){
                    if(error) console.log("Error : ",error);
                    else if(result) return res.json({"result":true , "name":r.cname , "email":r.email});
                    else return res.json({"result":false});
                });
            }
        });
    }
    else{
        Parent.findOne({email:req.body.email},function(err,r){
            if(err) console.log("Error : ",err);
            else if(r){
                bcrypt.compare(req.body.password,r.password,function(error,result){
                    if(error) console.log("Error : ",error);
                    else if(result) return res.json({"result":true , "name":r.cname , "email":r.email , "crecheEmail" : r.crecheEmail });
                    else return res.json({"result":false});
                });
            }
        });
    }
});

app.post('/childrendetail' ,(req,res) => {
    Parent.find({ email : req.body.email}).then((par) => {
        var p = par[0];
        res.send(p);
    } ,(err) => {
        res.status(400).send(err);
    })
});

app.post('/facultydetail' ,(req,res) => {
    Faculty.find({ email : req.body.email}).then((fac) => {
        var f = fac[0];
        res.send(f);
    } ,(err) => {
        res.status(400).send(err);
    })
});

app.post('/getCreche' ,(req,res) => {
    Creche.find({ email : req.body.email}).then((cre) => {
        var c = cre[0];
        res.send(c);
    } ,(err) => {
        res.status(400).send(err);
    })
});

app.post('/sendAttendanceMail', function(req,res){
    console.log(req.body);
    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "national.creche@gmail.com", 
            pass: "creche123"
        }
    });

    var mailOptionsEntry = {
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Student Received at National Creche.",
        html : "Hello dear Parent,<br>We would like to confirm that your child is present for today's creche schedule. We will keep you posted with every activities of your child<br>Reagrds,<br>National Creche Team"
    }
    var mailOptionExit = {
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Student leaving the premises.",
        html : "Hello dear PArent,<r>We would like to inform to you about the departure of your child from The National Creche.<br>For any querries please revert to this mail or contact us about the same. <br>Reagards,<br>National Creche Team"
    }
    var healthAttendance = {
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Health Checkup Drive at National Creche.",
        html : "Hello dear Parents,<br>I would like to bring to your notice that a health checkup was organised by the creche for all the students. It is my humble request that you please give the feedback about the same. Please make sure <b>to collect your ward's medical reports</b> as soon as possible.<br>Regards,<br>National Creche Team"
    }
    var immunAttendance = {
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Immunization Drive at National Creche.",
        html : "Hello dear Parents,<br>The Immunization Drive at the National Creche has been concluded. Your child has been given all the necessary vaccines as per your request. Please collect the reeipts for the same as soon as possible.<br>Regards,<br>National Creche Team"
    }

    if( req.body.mail == 'entry' ) {
        smtpTransport.sendMail(mailOptionsEntry,function(error,response){
            if(error) console.log("Error : SMTP Transport MailOptionsEntry\n",error);
        });
    }
    else if( req.body.mail == 'exit' ){
        smtpTransport.sendMail(mailOptionsExit,function(error,response){
            if(error) console.log("Error : SMTP Transport MultipleOptionsExit\n",error);
        });
    }
    else if( req.body.mail == 'health' ){
        smtpTransport.sendMail(mailOptionsFaculty,function(error,response){
            if(error) console.log("Error : SMTP Transport HealthAttendance\n",error);
        });
    }
    else if( req.body.mail == 'immune' ){
        smtpTransport.sendMail(mailOptionsFaculty,function(error,response){
            if(error) console.log("Error : SMTP Transport ImmunizationAtendance",error);
        });
    }
});

app.listen(3000,(err, res) => {
    if(err) return console.log("Unable to set up server",err);
    else console.log("Server is up on port 3000");
});
