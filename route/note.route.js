const express = require('express')
const Note = require('../model/user.model')
const noterouter= express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Create Note
noterouter.post('/api/notes', async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
      const newNote = new Note({ title, content });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Retrieve Notes
  noterouter.get('/api/notes', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Retrieve Single Note by ID
  noterouter.get('/api/notes/:id', async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update Note
  noterouter.put('/api/notes/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { title, content, updatedAt: Date.now() },
        { new: true }
      );
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(updatedNote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete Note
  noterouter.delete('/api/notes/:id', async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(deletedNote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports=noterouter