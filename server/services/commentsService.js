const supabase = require('../config/database');

exports.getComments = async (word_id) => {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('word_id', word_id)
        .order('created_at', { ascending: true });

    if (error) throw new Error('Error fetching comments');

    // Organize comments into a nested structure
    const commentsMap = {};
    data.forEach(comment => {
        commentsMap[comment.id] = { ...comment, replies: [] };
    });
    
    const rootComments = [];
    data.forEach(comment => {
        if (comment.parent_id) {
            commentsMap[comment.parent_id].replies.push(commentsMap[comment.id]);
        } else {
            rootComments.push(commentsMap[comment.id]);
        }
    });

    return rootComments;
};

exports.addComment = async (comment) => {
    const { data, error } = await supabase
        .from('comments')
        .insert([comment]);

    if (error) throw new Error('Error adding comment');
    return data[0];
};
