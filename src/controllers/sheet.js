const User = require('../models/user')
const Topic = require('../models/topic');

exports.dsaSheet = async (req,res,next) => {
    try {
        let userId = req.user._id;
    
        const topics = await Topic.find(); 

        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        progress = user.progress || [];

        const topicsWithProgress = topics.map(topic => {
            const topicProgress = progress.filter(
                prog => prog.topicId.toString() === topic._id.toString()
            );

            let isProgress = topicProgress.map(prog => ({
                completed: prog.completed
            }));

            // Add progress information to the topic
            return {
                ...topic.toObject(), // Convert Mongoose document to plain object
                isComplete : isProgress.length > 0 ? true : false,
            };
        });

        return res.json({
            data : topicsWithProgress
        })
    } catch (error) {
        console.error('sheet data error:', error);
        next(error);
    }
}

exports.completeATopic = async (req,res,next) => {
    try {
        let userId = req.user._id;
        let {topicId, completed} = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        const topics = await Topic.findOne({_id: topicId}); 
        if(!topics){
            return res.json({
                data : []
            })
        }

        const userProgressIndex = user.progress.findIndex(
            (item) => item.topicId.toString() === topicId
        );
      
        if (userProgressIndex !== -1) {
            // If progress exists, update it
            user.progress[userProgressIndex].completed = completed;
        } else {
            // If progress does not exist, push a new progress record
            user.progress.push({
                topicId,
                completed
            });
        }
        await user.save();

        return res.json({
            message: "Topic completd successfully"
        })
    } catch (error) {
        console.error('sheet data error:', error);
        next(error);
    }
}