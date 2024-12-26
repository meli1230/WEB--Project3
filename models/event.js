const pool = require('../db');

const createEvent = async (event) => {
    const {title, speaker, price, description} = event;
    const [result] = await pool.query('INSERT INTO events (title, speaker, price, description) VALUES (?, ?, ?, ?)', [title, speaker, price, description]);
    return result.insertId;
};

const getAllEvents = async () => {
    const [rows] = await pool.query('SELECT * FROM events');
    return rows;
};

const getEventById = async (eventId) => {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    return rows[0];
}

const updateEvent = async (eventId, updatedEvent) => {
    const {title, speaker, price, description} = updatedEvent;
    await pool.query('UPDATE events SET title = ?, speaker = ?, price = ?, description = ? WHERE id = ?', [title, speaker, price, description]);
    return true;
};

const deleteEvent = async (eventId) => {
    await pool.query('DELETE FROM events WHERE id = ?', [eventId]);
    return true;
};

module.exports = {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent};