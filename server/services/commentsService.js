const supabase = require('../config/database');

// Function to fetch comments for a given wordId
exports.getComments = async (wordId) => {
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('word_id', wordId) // Filter comments by wordId
            .order('created_at', { ascending: true }); // Order comments by creation time

        if (error) throw error;
        return data; // Return the fetched comments
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// Function to add a new comment
exports.addComment = async (comment) => {
    try {
        // Set the created_at field to the current UTC time
        comment.created_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('comments')
            .insert([comment]) // Insert the new comment into the database
            .select(); // Select the inserted comment

        if (error) throw error;
        return data[0]; // Return the inserted comment
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};
