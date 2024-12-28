//DEFINES CRUD OPERATIONS RELATED TO EVENTS IN RELATION TO THE DATABASE

const pool = require('../db'); //import the database connection pool

const createEvent = async (event) => {
    //created an event in the database
    const {title, speaker, price, description} = event; //structure
    const [result] = await pool.query('INSERT INTO events (title, speaker, price, description) VALUES (?, ?, ?, ?)', [title, speaker, price, description]); //inserting into the db
        //pool.query -> executes the SQL INSERT to add the event to the database
        //? -> placeholders
        //[title, speaker, price, description] -> supplies the actual data for the placeholders
        //await -> waits for the query to complete before continuing
        //[result] -> extracts metadata about the query (id, new row, warnings, errors)
    return result.insertId; //contains information about the outcome of the query (id of the inserted row, number of rows affected and warnings
};

const getAllEvents = async () => {
    //retrieves all events from the database
    const [rows] = await pool.query('SELECT * FROM events'); //fetch all events
    return rows; //return the list of all events
};

const getEventById = async (eventId) => {
    //retrieve event by id
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    return rows[0];
}

const getEventsSortedByPrice = async (order = 'ASC') => {
    //fetch all events sorted by price
    const [rows] = await pool.query(`SELECT * FROM events ORDER BY price ${order}`);
    return rows;
};

const updateEvent = async (eventId, updatedEvent) => {
    //update and existing event
    const {title, speaker, price, description} = updatedEvent; //data to be updated with
    await pool.query('UPDATE events SET title = ?, speaker = ?, price = ?, description = ? WHERE id = ?', [title, speaker, price, description]);
    return true; //return true to indicate it was successful
};

const deleteEvent = async (eventId) => {
    //delete event by its ID
    await pool.query('DELETE FROM events WHERE id = ?', [eventId]);
    return true;
};

module.exports = {createEvent, getAllEvents, getEventById, getEventsSortedByPrice, updateEvent, deleteEvent};
    //export the CRUD functions so they can be used in other modules