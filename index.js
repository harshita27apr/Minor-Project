const express = require("express");
const app = express();
const mongoose = require('./db/mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
app.use(bodyParser.json(),cors());
const saltRounds = 10;

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
        html : req.body.description
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error) res.end("error");
        else res.end("sent");
    })
})
});

app.post('/notice' , function(req,res) {
    var not = new Notice ({
        title : req.body.title,
        description : req.body.description,
        crecheEmail : req.body.email
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
        crecheEmail : req.body.email
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
        html : "<b>Hello Dear,<br>We would love to inform you that your ward's admission has been successfully registered under the National Creche Program. Your ward's childhood and safety is of our utmost importance and so we would like you to please visit our official page and fill out your details.<br>Your login details are as follows :<br>ID - " + req.body.email + "<br>OTP - " + req.body.password + "<br>We will inform you about you child's activities and notices on our official site, so please stay tuned<br>For any queries revert please contact us or revert on this mail id - " + req.body.crecheEmail + "<hr>Regards<br>National Creche Team"
    }
    var mailOptionsFaculty = {
        from : '"National Creche" <national.creche@gmail.com>',
        to : req.body.email,
        subject : "Registration Successful",
        html : "Hello Dear,<br>With reference to your interview, we would like to inform you that you have been selected for the job offered. It is mandatory that you login on our home page with the following details<br>ID : " + req.body.email + "<br>OTP : " + req.body.password + "<br>All the details submitted and filled in this form must be genuine. You are solely responsible for the details claimed by you.<br>For any queries revert please contact us or revert on this mail id - " + req.body.crecheEmail + "<hr>Regards<br>National Creche Team"
    }
});

app.post('/crechelist',function(req,res){
    Creche.find({},{description:1,cname:1},function(err,r){
        if(err) console.log("Error");
        else if(r) res.send(r);
    });
});

app.get('/noticelist' ,(req , res) => {
    Notice.find().then((notices) => {
        res.send(notices);
    } ,(e) => {
        res.status(400).send(e);
    })
});

app.get('/complainlist' ,(req , res) => {
    Complain.find().then((complain) => {
        res.send(complain);
    } ,(e) => {
        res.status(400).send(e);
    })
});

app.post('/childrenlist',function(req,res){
    Parent.find({},function(err,r){
        if(err) console.log("Error");
        else if(r) res.send(r);
    });
});

app.post('/facultylist',function(req,res){
    Faculty.find({},function(err,r){
        if(err) console.log("Error");
        else if(r) res.send(r);
    });
});

app.post('/govregister',(req ,res) => { 
    Government.find({ email : req.body.email}).then((gov) => {
        if (gov.length < 1) {
            return res.status(401).json({message: "Auth failed"});
        }
        console.log(gov[0])
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
                    else if(result) return res.json({"result":true , "name":r.cname , "email":r.email});
                    else return res.json({"result":false});
                });
            }
        });
    }
});

app.listen(3000,(err, res) => {
    if(err) return console.log("Unable to set up server",err);
    else console.log("Server is up on port 3000");
});
