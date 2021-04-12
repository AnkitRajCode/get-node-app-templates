const express=require('express');
const router=express.Router();
const {displayAllController,displayCompletedController,displayUnfinishedController,displaySpecificController, displaySpecificControllers}=require('../controllers/todoController');

//for displaying all tasks
router.get('/all',displayAllController);

//for displaying finished task
router.get('/finished',displayCompletedController);

// for displaying unfinished task
router.get('/unfinished',displayUnfinishedController);

// for displaying details of specific task 
router.get('/:taskid',displaySpecificController);

module.exports=router;