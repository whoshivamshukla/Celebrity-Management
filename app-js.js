class CelebrityManager {
    constructor() {
        this.celebrities = [];
        this.events = [];
        this.currentUser = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Navigation
        document.getElementById('nav-home').addEventListener('click', () => this.showSection('home-section'));
        document.getElementById('nav-celebrities').addEventListener('click', () => this.showSection('celebrities-section'));
        document.getElementById('nav-events').addEventListener('click', () => this.showSection('events-section'));
        document.getElementById('nav-bookings').addEventListener('click', () => this.showSection('bookings-section'));
        document.getElementById('nav-login').addEventListener('click', () => this.showSection('login-section'));

        // Login Form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Add Celebrity Button
        document.getElementById('add-celebrity-btn').addEventListener('click', () => this.addCelebrity());

        // Add Event Button
        document.getElementById('add-event-btn').addEventListener('click', () => this.addEvent());

        // Booking Form
        document.getElementById('booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitBooking(e);
        });
    }

    showSection(sectionId) {
        // Hide all sections
        ['home-section', 'celebrities-section', 'events-section', 'bookings-section', 'login-section']
            .forEach(id => {
                const section = document.getElementById(id);
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
            });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        selectedSection.classList.remove('hidden-section');
        selectedSection.classList.add('active-section');
    }

    login() {
        const email = document.querySelector('#login-form input[type="email"]').value;
        const password = document.querySelector('#login-form input[type="password"]').value;

        // Simulate login (replace with actual authentication logic)
        if (email && password) {
            this.currentUser = { email };
            alert('Login Successful!');
            this.showSection('home-section');
        } else {
            alert('Invalid credentials');
        }
    }

    addCelebrity() {
        if (!this.currentUser) {
            alert('Please login first');
            return;
        }

        const name = prompt('Enter celebrity name:');
        const bio = prompt('Enter celebrity biography:');

        if (name && bio) {
            const celebrity = { id: Date.now(), name, bio };
            this.celebrities.push(celebrity);
            this.renderCelebrities();
        }
    }

    renderCelebrities() {
        const celebritiesList = document.getElementById('celebrities-list');
        celebritiesList.innerHTML = '';

        this.celebrities.forEach(celebrity => {
            const celebrityCard = document.createElement('div');
            celebrityCard.classList.add('celebrity-card');
            celebrityCard.innerHTML = `
                <h3>${celebrity.name}</h3>
                <p>${celebrity.bio}</p>
                <button onclick="app.deleteCelebrity(${celebrity.id})">Delete</button>
            `;
            celebritiesList.appendChild(celebrityCard);
        });
    }

    deleteCelebrity(id) {
        this.celebrities = this.celebrities.filter(celeb => celeb.id !== id);
        this.renderCelebrities();
    }

    addEvent() {
        if (!this.currentUser) {
            alert('Please login first');
            return;
        }

        const name = prompt('Enter event name:');
        const date = prompt('Enter event date:');
        const venue = prompt('Enter event venue:');

        if (name && date && venue) {
            const event = { id: Date.now(), name, date, venue };
            this.events.push(event);
            this.renderEvents();
        }
    }

    renderEvents() {
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = '';

        this.events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p>Date: ${event.date}</p>
                <p>Venue: ${event.venue}</p>
                <button onclick="app.deleteEvent(${event.id})">Delete</button>
            `;
            eventsList.appendChild(eventCard);
        });
    }

    deleteEvent(id) {
        this.events = this.events.filter(event => event.id !== id);
        this.renderEvents();
    }

    submitBooking(e) {
        const name = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;
        const request = e.target.querySelector('textarea').value;

        if (name && email && request) {
            alert('Booking request submitted successfully!');
            e.target.reset();
        } else {
            alert('Please fill in all fields');
        }
    }
}

// Initialize the application
const app = new CelebrityManager();
