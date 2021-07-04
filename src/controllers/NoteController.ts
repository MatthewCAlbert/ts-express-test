import express from "express";
import Note from "../models/Note";

const NoteController = {
  all(req: express.Request, res: express.Response){
    const user_id = req.user._id;
    Note.find({author_id: user_id})
    .then((notes)=>{
      res.status(200).json({success: true, data: notes});
    })
    .catch(err=>res.status(500).json({success: false, error: err}));
  },

  create(req: express.Request, res: express.Response){
    const user_id = req.user._id;
    const {title, content} = req.body;
    let notes = new Note({
      author_id: user_id,
      title: title,
      content: content
    });
    notes.save()
    .then((notes)=>{
      res.status(200).json({success: true, data: notes});
    })
    .catch(err=>res.status(500).json({success: false, error: err}));
  },

  show(req: express.Request, res: express.Response){
    const { id } = req.params;
    const user_id = req.user._id;
    Note.findOne({author_id: user_id, _id: id})
    .then((notes)=>{
      res.status(200).json({success: true, data: notes});
    })
    .catch(err=>res.status(500).json({success: false, error: err}));
  },

  destroy(req: express.Request, res: express.Response){
    const { id } = req.params;
    const user_id = req.user._id;
    Note.findOneAndDelete({author_id: user_id, _id: id})
    .then((notes)=>{
      res.status(200).json({success: true});
    })
    .catch(err=>res.status(500).json({success: false, error: err}));
  },
  
  update(req: express.Request, res: express.Response){
    const { id } = req.params;
    const {title, content} = req.body;
    const user_id = req.user._id;
    Note.findOneAndUpdate({author_id: user_id, _id: id},{
      title: title, content: content
    })
    .then((notes)=>{
      res.status(200).json({success: true, data: notes});
    })
    .catch(err=>res.status(500).json({success: false, error: err}));
  },
}

export default NoteController;