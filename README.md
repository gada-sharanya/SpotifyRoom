# House Party Music Player

House Party Music Player is a collaborative full stack web application developed with React.js and Django. It enables users to create and join rooms for a shared music playback experience. By integrating with the Spotify Web API, this application offers real-time music control and authentication.

## Features

- Create and join rooms: The landing page features two buttons, "Create a Room" and "Join a Room", allowing users to establish their own music rooms or enter existing ones using valid room codes.

- Spotify authentication: When setting up a room, the application interfaces with the Spotify Web API's authentication endpoint. Users can authenticate via their Spotify accounts, granting them hosting privileges and music control capabilities within the room.

- Customizable room settings: Room hosts can specify the number of votes needed to skip a song and determine whether guests have play/pause control or are restricted from modifying playback.

- Real-time music playback control: Leveraging the Spotify Web API's endpoints, users have the ability to play, pause, and skip tracks in real-time, fostering a seamless collaborative music listening experience.

- Display of song information: The application fetches current song details from the Spotify Web API and presents them within the application, including title, artist, and album information.

## Technologies Used

- Frontend: React.js
- Backend: Django
- Spotify Web API: Utilized for music playback control and user authentication

## How to Use

1. Clone the repository and navigate to the project directory.
2. Install required dependencies using the provided package managers.
3. Configure your Spotify Web API credentials within the application.
4. Run both the React.js frontend and Django backend servers.
5. Access the application via your web browser and create or join rooms to enjoy synchronized music playback.


1. HOME PAGE
![home_page](https://github.com/gada-sharanya/SpotifyRoom/assets/48100680/a039c372-bd3c-4b1f-9a93-bd55652c7854)

2. CREATE ROOM PAGE
![create_room](https://github.com/gada-sharanya/SpotifyRoom/assets/48100680/72f642c7-ad82-4d77-8dee-8f35495002ff)

3. JOIN ROOM PAGE
![join_room](https://github.com/gada-sharanya/SpotifyRoom/assets/48100680/dcac4050-67b9-47cf-88c7-49e9e52b5a5c)

4. ROOM SETTINGS PAGE
![settings_page](https://github.com/gada-sharanya/SpotifyRoom/assets/48100680/607c8be5-51dd-465d-be25-3f332b82da36)

5. ROOM PAGE
![room_page](https://github.com/gada-sharanya/SpotifyRoom/assets/48100680/18e379cb-9275-4d0d-81e4-27f2abac82fd)

