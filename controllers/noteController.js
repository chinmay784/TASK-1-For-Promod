const Note = require("../models/Note");

// CREATE
exports.createNote = async (req, res) => {
    try {
        const { title, body } = req.body;

        const note = await Note.create({
            user: req.user,
            title,
            body
        });

        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            // { new: true }
            { returnDocument: "after" }
        );

        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteNote = async (req, res) => {
    try {
        await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};