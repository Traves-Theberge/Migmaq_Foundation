const supabase = require('../config/database');

exports.getComments = async (word_id) => {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('word_id', word_id)
        .order('created_at', { ascending: true });

    if (error) throw new Error('Error fetching comments');
    return data;
};

exports.addComment = async (comment) => {
    const { data, error } = await supabase
        .from('comments')
        .insert([comment]);

    if (error) throw new Error('Error adding comment');
    return data[0];
};
