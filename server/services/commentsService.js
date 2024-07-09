const supabase = require('../config/database');

exports.getComments = async (wordId) => {
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('word_id', wordId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

exports.addComment = async (comment) => {
    try {
        const { data, error } = await supabase
            .from('comments')
            .insert([comment])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};