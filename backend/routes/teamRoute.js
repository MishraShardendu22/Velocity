import express from 'express';
import TeamMember from '../models/TeamMember.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all team members (public route)
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true }).sort('order');
    res.json(teamMembers);
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get team members by category (public route)
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const teamMembers = await TeamMember.find({ 
      category, 
      isActive: true 
    }).sort('order');
    res.json(teamMembers);
  } catch (error) {
    console.error('Get team members by category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all team members for admin (protected route)
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort('order');
    res.json(teamMembers);
  } catch (error) {
    console.error('Get team members admin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new team member (protected route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const teamMember = new TeamMember(req.body);
    await teamMember.save();
    res.status(201).json({
      message: 'Team member created successfully',
      teamMember
    });
  } catch (error) {
    console.error('Create team member error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update team member (protected route)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({
      message: 'Team member updated successfully',
      teamMember
    });
  } catch (error) {
    console.error('Update team member error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete team member (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findByIdAndDelete(id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Soft delete team member (protected route)
router.patch('/:id/deactivate', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({
      message: 'Team member deactivated successfully',
      teamMember
    });
  } catch (error) {
    console.error('Deactivate team member error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reorder team members (protected route)
router.patch('/reorder', authenticateToken, async (req, res) => {
  try {
    const { reorderData } = req.body; // Array of {id, order}
    
    for (const item of reorderData) {
      await TeamMember.findByIdAndUpdate(item.id, { order: item.order });
    }

    res.json({ message: 'Team members reordered successfully' });
  } catch (error) {
    console.error('Reorder team members error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
