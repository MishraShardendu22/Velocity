import express from 'express';
import Project from '../models/Project.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all projects (public route)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort('order');
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get projects by category (public route)
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ 
      category, 
      isActive: true 
    }).sort('order');
    res.json(projects);
  } catch (error) {
    console.error('Get projects by category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all projects for admin (protected route)
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find().sort('order');
    res.json(projects);
  } catch (error) {
    console.error('Get projects admin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new project (protected route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update project (protected route)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete project (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Soft delete project (protected route)
router.patch('/:id/deactivate', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      message: 'Project deactivated successfully',
      project
    });
  } catch (error) {
    console.error('Deactivate project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reorder projects (protected route)
router.patch('/reorder', authenticateToken, async (req, res) => {
  try {
    const { reorderData } = req.body; // Array of {id, order}
    
    for (const item of reorderData) {
      await Project.findByIdAndUpdate(item.id, { order: item.order });
    }

    res.json({ message: 'Projects reordered successfully' });
  } catch (error) {
    console.error('Reorder projects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
