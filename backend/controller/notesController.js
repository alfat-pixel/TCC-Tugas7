import Notes from "../model/notesModel.js";

// GET
async function getNotes(req, res) {
    try {
        const notes = await Notes.findAll()
        res.status(200).json(notes);
    } catch (error) {
        console.error(error.message);
    }
}

//GET NOTE BY ID
async function getNoteById(req, res) {
    try {
        const { id } = req.params;
        const note = await Notes.findByPk(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}


//POST
async function createNotes(req, res) {
    try {
        const inputResult = req.body
        const newNotes = await Notes.create(inputResult)
        res.status(200).json(newNotes);
    } catch (error) {
        console.error(error.message);
    }
}

//PUT
async function updateNotes(req, res){
    try {
        const {id} = req.params;
        const {title, content} = req.body; // Ambil title & content dari request
        const notes = await Notes.findByPk(id);

        if (!notes) {
            return res.status(404).json({message:"Note not found"});
        }

        await Notes.update(
            { title: title || notes.title, content: content || notes.content }, 
            { where: { id } }
        );

        res.status(200).json({message:"Notes updated successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}


//DELETE
async function deleteNotes(req, res) {
    try {
        const {id} = req.params
        const notes = await Notes.findByPk(id)

        if(!notes){
            return res.status(404).json({message:"Note not found"})
        }
        await Notes.destroy({where: {id}})
        res.status(200).json({message:"Notes deleted successfully"})

    } catch (error) {
        console.error(error.message);
    }
}

export {getNotes, createNotes, updateNotes,deleteNotes, getNoteById}