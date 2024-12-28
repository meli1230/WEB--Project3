//DEFINES THE ROUTES, ENSURES ACCESS AND CONNECTS TO THE DATABASE TO PERFORM CRUD OPERATIONS

const express = require('express'); //import the express framework for building the web server
const bcrypt = require('bcrypt'); //import bcrypt for password hashing
const passport = require('passport'); //import passport for authentication
const pool = require('../db'); //import the database connectin pool
const router = express.Router(); //create an express router instance for defining routes
const { getEventsSortedByPrice } = require('../models/event'); //import function that sorts by price

function isLoggedIn(req, res, next) {
    //Middleware to check if user is logged in
    if(req.isAuthenticated()) {
        return next(); //allow the request to proceed if logged in
    }
    res.redirect('/login'); //else, redirect to login page
}

/*
* / -> specifies the root path
* req -> request (incoming HTTP request; contains data sent by the client, such as query parameters, form data etc
* res -> response (outgoing HTTP response; used to send data back to the client, such as HTML or a redirect
* */

router.get('/', (req, res) => {
   res.render('index', {user: req.user}); //render the index view, passing the logged-in user's details
});

//Route for registration page
router.get('/register', (req, res) => {
    //route to render registration page
    res.render('register');
});

router.post('/register', async (req, res) => {
    //route to handle the registration process
    try {
        const {username, password} = req.body; //extract username and password from the request
        const hashedPassword = await bcrypt.hash(password, 10); //hash the password with bcrypt
        const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]); //insert username and password into the db
        if (result.affectedRows === 1) { //check if insertion was successful
            res.redirect('/login'); //redirect to the login page
        } else { //if it failed
            throw new Error("Registration failed."); //throw error
        }
    } catch (error) {
        console.error("Error during registration: ", error); //log the error
        res.render('register', {error: "Registration failed."}); //render registration page with an error message
    }
});
router.get('/login', (req, res) => {
    //route to render the login page
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    //route to handle the login process using passport
    successRedirect: '/', //redirect to home page upon successful login
    failureRedirect: '/login', //redirect back to the login page if login fails
}));

router.get('/logout', (req, res) => {
    //route to handle user logout
    req.logOut((err) => { //log the user out
        if (err) { //if an error occurred
            console.error(err); //log the error
        }
        res.redirect('/'); //else, redirect to home page
    });
});
router.get('/manage-events', isLoggedIn, async (req, res) => {
    //route to render and manage events and users
    try {
        const [userRows] = await pool.query('SELECT * FROM users'); //fetch all users from the db
        const users = userRows; //store the fetched users
        const [eventRows] = await pool.query('SELECT * FROM events'); //fetch all events from the db
        const events = eventRows; //store the fetched events
        res.render('manage-events', {users, events}); //render manage-events page
    } catch (error) {
        console.error(error); //log the error, if existing
        res.status(500).send('Error fetching events and users');
    }
});

router.get('/events/sort', async (req, res) => {
    //route to fetch events sorted by price
    try {
        const { order } = req.query; //retrieve the sorting order ('ASC' or 'DESC')
        const sortedEvents = await getEventsSortedByPrice(order || 'ASC'); //default to ascending order
        res.render('manage-events', { events: sortedEvents }); //render the view with sorted events
    } catch (error) {
        console.error(error); //log error if existing
        res.status(500).send('Failed to fetch events');
    }
});

router.get('/view-event/:id', isLoggedIn, async (req, res) => {
    //route to view details of a specific event
    const eventId = req.params.id; //extract the event ID from the URL
    try {
        const [eventRows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]); //fetch the event details by ID
        const event = eventRows[0]; //get the first result (event object)
        res.render('view-event', { event }); //render the view-event page with the event details
    } catch (error) {
        console.error('Error fetching event details:', error); //log error if existing
        res.status(500).send('An error occurred while fetching the event details.');
    }
});

router.get('/add-event', isLoggedIn, (req, res) => {
    //route to render the add-event page
    res.render('add-event');
});
router.post('/add-event', isLoggedIn, async (req, res) => {
    //route to handle adding a new event
    try {
        const {title, speaker, price, description} = req.body; //extract the event details from the request
        await pool.query('INSERT INTO events (title, speaker, price, description) VALUES (?, ?, ?, ?)', [title, speaker, price, description]); //insert the event into the db
        res.redirect('/manage-events'); //redirect to the manage-event page after adding the event
    } catch (error) {
        console.error(error); //log error if existing
        res.status(500).send('Error adding event');
    }
});
router.get('/edit-event/:id', isLoggedIn, async (req, res) => {
    //route to render the edit-event page for a specific event
    const eventId = req.params.id; //get the event ID from the URL
    try {
        const [eventRows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]); //fetch the event details by the ID
        const event = eventRows[0]; //get tge first result (event object)
        res.render('edit-event', {event}); //render the edit-event view with the event details
    } catch (error) {
        console.error(error); //log error if existing
        res.status(500).send('Error fetching event details');
    }
});
router.post('/edit-event/:id', isLoggedIn, async (req, res) => {
    //handle updating and event
    const eventId = req.params.id; //get the event ID from the URL
    const {title, speaker, price, description} = req.body; //extract the updated event details from the request body
    try {
        await pool.query('UPDATE events SET title = ?, speaker = ?, price = ?, description = ? WHERE id = ?', [title, speaker, price, description, eventId]); //update the event
        res.redirect('/manage-events'); //redirect to the manage-event page
    } catch (error) {
        console.error(error); //log error if existing
        res.status(500).send('Error updating event');
    }
});
router.get('/delete-event/:id', isLoggedIn, async (req, res) => {
    //route to render the delete-event page
    const eventId = req.params.id; //get the event ID from the URL
    try {
        const [eventRows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]); //fetch the event details by ID
        const event = eventRows[0]; //get the first result
        res.render('delete-event', {event}); //render the delete-event view
    } catch (error) {
        console.error(error); //log error if existing
        res.status(500).send('Error fetching event details');
    }
});
router.post('/delete-event/:id', isLoggedIn, async (req, res) => {
    //route to handle deleting an event
    const eventId = req.params.id; //get the event ID from the URL
    try {
        await pool.query('DELETE FROM events WHERE id = ?', [eventId]); //delete the event from the database
        res.redirect('/manage-events'); //redirect to the manage-events page after deleting the event
    } catch (error) {
        console.error(error); //log error if existing
        res.status(500).send('Error deleting event');
    }
});

module.exports = router; //export the router to be used in the main app