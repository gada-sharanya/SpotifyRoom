import React, { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import { Grid,Button,Typography } from "@material-ui/core";
import { CreateRoomPageWithRouter } from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";


const Room = (props) => {
  const { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = React.useState(2);
  const [guestCanPause, setGuestCanPause] = React.useState(false);
  const [isHost, setIsHost] = React.useState(false);
  const navigate = useNavigate();
  const [showSettings,setshowSettings] = useState(false);
  const [spotifyAuthenticated,setspotifyAuthenticated]=useState(false);
  const [song,setSong]=useState({});
 


  // Rest of your component code


  const getDetails = () =>{
    fetch("/api/get-room"+"?code="+roomCode)
    .then((response)=>
    {
      if(!response.ok){
        props.leaveRoomCallback();
        navigate('/');
      }
      return response.json();
    })
    .then((data)=>
    {setVotesToSkip(data.votes_to_skip),
      setGuestCanPause(data.guest_can_pause),
      
      setIsHost(data.is_host)
    })
    
  };

  const authenticateSpotify = () =>{
    fetch('/spotify/is-authenticated').then((response)=>response.json())
    .then((data)=>{
      setspotifyAuthenticated(data.status);
      if(!data.status){
        fetch('/spotify/get-auth-url').then((response)=>response.json()).then((data)=>{
          window.location.replace(data.url);
        })
      }
    })
  };

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSong(data);
      //  console.log(data);
        
      })
      .catch((error) => {
        console.error("Error fetching current song:", error);
        // Handle the error here, such as setting a default song state
        // or showing an error message to the user.
      });
  };
  

  useEffect(() => {
    getDetails();
    const interval = setInterval(getCurrentSong, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(getCurrentSong, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  
  useEffect(() => {
    if (isHost) {
      authenticateSpotify();
    }
    getCurrentSong();
  }, [isHost]);
 
  useEffect(() => {
    console.log("song", song);
  }, [song]);

  const leaveButtonPresses = () =>{
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type":"application/json"}
    };
    fetch('/api/leave-room',requestOptions).then((_response)=>{
        props.leaveRoomCallback();
        navigate('/');
    })
  };

  const updateShowSettings = (value) =>{
    setshowSettings(value);
  }

  const renderSettings = () => {
    return(
      <Grid container spacing={1}>  
        <Grid item xs={12} align="center">
          <CreateRoomPageWithRouter 
          update={true} 
          votesToSkip={votesToSkip} 
          guestCanPause={guestCanPause} 
          roomCode={roomCode}
          updateCallback = {getDetails}
          >

          </CreateRoomPageWithRouter>
        </Grid>
        <Grid item xs={12} align="center">  
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={()=>{updateShowSettings(false)}}>
          Close
          </Button>
        </Grid>
      </Grid>

    );
  };

  const renderSettingButton = () => {
      return(
          <Grid item xs={12} align="center">
              <Button variant="contained" color="primary" onClick={()=>{updateShowSettings(true)}}>
                Settings 
              </Button>
          </Grid>
        
      );
  };

  return (

  
    <div>
      {showSettings ? renderSettings() : (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
        </Grid>
        
        <MusicPlayer {...song}></MusicPlayer>
        {/* {song.image_url} */}
        {isHost?renderSettingButton():null}

        <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPresses}>
          Leave Room
          </Button>
        </Grid>
      </Grid>
      )}
      </div>


  
  );
};

export default Room;


/*

  <div>
      <h3>{roomCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause.toString()}</p>
      <p>Host: {isHost.toString()}</p>
    </div>
 */