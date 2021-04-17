const Question = require('../models/quesions');
const User = require('../models/user');

exports.create = async (req, res) => {
    try {
        res.json(await new Question({ name: User.name, question: req.body.question, email: User.email }).save());
    } catch (err) {
        console.log(err);
    }
};