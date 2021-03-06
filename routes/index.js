
/*
 * GET home page.
 */

var subject_list    = require('../subjects');
var models          = require('../models');
var adduser         = require('../models/adduser');

exports.index = function(req, res){
  res.render('index', { subjects: subject_list });
};

exports.create_account = function (req, res) {
    res.render('create_account');
};

exports.send_login = function (req, res) {
    adduser.add(req.body, function(err) {
        if(err){
            res.send(err);
        }
        else {
            res.send('Email sent.Login using your usn and pass sent');
        }
    });
};

exports.note_submit = function(req, res) {
	models.create(req.body, function(err) {
		if (err) {
			res.end("Oops! There was an error submitting your note. Please try again<br><a href='/'>Go back</a>");
		} else {
			res.end("Your note was Successfully saved!");
		}
	});
};

exports.search = function(req, res) {
    qryparams = {}
    for (param in req.query)
    {
        if(typeof req.query[param] === 'string' && param !== 'content') {
            qryparams[param] = req.query[param].toUpperCase();
        }
        else {
            qryparams[param] = req.query[param];
        }
    }   
	console.log(qryparams);
	models.retrieve(qryparams, function(err, notes) {
		if (err) {
			res.end("No notes found for the requested user");
		};
		res.json(notes);
		res.end();
	});
};
