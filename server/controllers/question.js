const User = require("../models/user");

exports.saveQuestion = async (req, res) => {
    const userLastName = await User.findOneAndUpdate(
        { email: req.user.email },
        { question: req.body.question }
    ).exec();

    res.json({ ok: true, userLastName });
};

exports.questions = async (req, res) => {

    let userLastName = await User.find({})
        .select('question')
        .exec();
    res.json(userLastName);
};
