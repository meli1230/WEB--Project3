const express = require('express');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./db');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        const user = rows[0];
        done(null, user);
    } catch (error) {
        done(error);
    }
});
app.use('/', routes);
app.get('/edit-event/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const [eventRows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
        const event = eventRows[0];
        if (!event) {
            return res.status(404).send('Event not found');
        }
        res.render('edit-event', { event });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the event.');
    }
});

app.post('/edit-event/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { title, speaker, price, description } = req.body;
        await pool.query(
            'UPDATE events SET title = ?, speaker = ?, price = ?, description = ? WHERE id = ?',
            [title, speaker, price, description, eventId]
        );
        res.redirect('/events'); // Adjust the redirection as per your application's logic
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the event.');
    }
});

app.get('/delete-event/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        await pool.query('DELETE FROM events WHERE id = ?', [eventId]);
        res.redirect('/events'); // Adjust the redirection as per your application's logic
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the event.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});