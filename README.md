# Party People

## Project Idea
Are you a party person? Have you ever been at home and wondered where the party's at? Well, we got the solution for you! Welcome to Party People! The website where you can see the best parties near you. And if none of them interest you, you can create your own event!

## User Stories
As a user, I want to be able to create my own account
As a user, I want to login to my account
As a user, I want to find events by location, category, date, etc
As a user, I want to see event details
As a user, I want to RSVP events
As a user, I want to see all the events I RSVP'ed to or am hosting
As a user, I want to create my own events
As a user(host), I want to be able to edit and delete my hosted event
As a user, I want to review the events I attended (stretch)
As a user(host), I want to review the attendees (stretch)

## MVP
- [x] See all events on the Home Page
- [x] Filter categories
- [x] Users can create an event
- [x] Creator of event(host) can edit and delete event
- [x] Users can attend/unattend event
- [x] Users can add profile picture
- [x] Users can add event image to their event

## STRETCH GOALS
- Styling change when filtering a specific category
- [x] Map API to show location
- [x] Geolocation
- [x] Hype buttons for events
- Comments on event's page
- Review Host/Attendees
- [x] Category Selection on Profile Page

## Client ROUTING CHART

| VERB | URL pattern | Action | Description |
|------|-------------|--------|-------------|
| GET  | / | Read   | show all events |
| POST | /register        | Create  | user sign up page |
| GET  | /login | Read  | check user |
| Get | /profile | Read   | display user info |
| POST | /events/new | Create | create event|
| GET  | /events/:id       | Read  | display event detail|
| PUT | event/:id | Update | update event posting |
| DELETE | /event/:id | Delete | delete event |


## Server ROUTING CHART

| VERB | URL pattern | Action | Description |
|------|-------------|--------|-------------|
| GET  | / | Read   | show all events |
| POST | /users/login | Read   | display login form |
| POST | /users/register | Create  | display sign up form |
| POST | /users/ | Create  | display sign up form |
| GET  | /users/:id | Read  | display user profile |
| PUT | /users/:id | Update | update User Profile |
| PUT | /users/:id/upload | update  | update user's photo |
| POST | /events | Create | create event|
| GET  | /events/:id       | Read  | display event|
| PUT | event/:id | Update | update event posting |
| PUT | event/:id/upload | Update | update event photo |
| DELETE | /event/:id | Delete | delete event |
| DELETE | /event/:eventId/:userId/unattend | Delete | delete user off attendance list |
| PUT | /event/:eventId/:userId/attend | Update | add user to attendance list |


## WIREFRAMES
![wireframe](https://cdn.discordapp.com/attachments/919468128432455700/956715039669239869/Capture.JPG)

## ERD
![eventtable](https://cdn.discordapp.com/attachments/919468128432455700/956715040008966224/Capture2.JPG)
![usertable](https://cdn.discordapp.com/attachments/919468128432455700/956715040273235998/Capture3.JPG)


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)


## tech used
### client
- react 
- react-bootstrap
- cryptoJS - encrypts user's login
- dayjs -
- axios
- react-router-dom
- react-map-gl
### server
- express - web framework 
- mongoose - mongodb database manager
- mongodb - nonrelational database
- dotenv -stores configuration in the environment separate fom code
- bcrypt - hashes users pw
- cors -
- jsonwebtoken
- multer
- cloudinary

- canva.com (wireframes)
- draw.io (ERD)
- TheCatApi - where i got the cat pictures
- axios - gets api info


## installation instructions
### server 
1. head over to https://github.com/brnguy/party-people-server 
2. fork and clone to your terminal, then run [npm i] to install:
[express] [bcrypt] [dotenv] [ejs] [env] [express] [cors] [jsonwebtoken] [multer] [cloudinary]
3. create a cloudinary account
2. open code
3. add the mongodb url, port, jwtsecret='(your secret here)', cloudinaryurl, cloudname into your .env file.
4. [sequelize db.seed:all] to run alt-text seed (54 prompts)
5. to get more images for creating more prompts, go to https://thecatapi.com/signup and sign up for key. You will get your key via email.
6. create .env file and add CAT_API_KEY=*******
7. nodemon on terminal to start


## sources used

- bootswatch
- https://css-tricks.com/responsive-images-css/
- alot alot of classnotes
- mdbootstrap.com
- https://guides.rubyonrails.org/routing.html#crud-verbs-and-actions
- and as always, yaak, paulina, my awesome cohort and instructors. \o/

## post project reflections

- i thought routes were just set up in a way you want to your urls.  i quickly found out i was very wrong.
- algorithms and datastructures are really relevant. i spent an obscene of time on one problem... no i won't tell you what it was. >.> maybe.
- refractoring is scary and causes a domino effect of damages on your sanity and code :D
- i think the importance of route naming was the biggest hurdle for me.
- also, i was trying to console log less but now i'm just going to consolelog even harder. :3
- i tried not to make it pink but i still made it pink >.>
- bonus: centering still sucks (╯°□°）╯︵ ┻━┻