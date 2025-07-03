import React, { useState} from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import useSound from 'use-sound';
import { useRef } from 'react';
//import StarfieldAnimation from 'react-starfield-animation';


/**
 * ----------------------------------------------------------------------------------------------------------------
 *                                          ViSUAL and AUDIO ASSETS: 
 * 
 *                                                    START
 * 
 * software_ver: 2.01.00 (denoting included sound functionality)
 * importing 16 sounds from path: public/sounds [sound files in alphabetical order]
 * Sound variables declaration...
 * ----------------------------------------------------------------------------------------------------------------
 */

// an array of template literals...
const logs = [
  `Captain's Log, Stardate 5623.4
  Acting Captain Spock Recording
  
  Following the temporary reassignment of Captain Kirk to diplomatic duty on Melvarus IV, I have assumed command of the USS Enterprise. It is... not unpleasant.
  
  We are en route to the Hektar Nebula to investigate a series of gravimetric anomalies detected by Starfleet probes. Early readings suggest that the region is undergoing quantum filament disruptions—irregular, but fascinating. Lieutenant Commander Scott described it as "the space equivalent of a bad hair day." I did not inquire further.
  
  Ensign Chekov attempted evasive maneuvers during a routine navigation drill and managed to invert the ship's inertial dampeners. Though no injuries were sustained, Doctor McCoy referred to the resulting turbulence as "a Vulcan amusement ride." I find the concept illogical. Amusement is irrelevant to gravitational chaos.
  
  Crew morale remains high, albeit noisy. Dr. McCoy insists that I "loosen up"—a recommendation he has repeated 14.2 times per week since I assumed command. I assured him that my facial expression was, in fact, one of serene contentment. He did not believe me. He never does.
  
  As we approach the outer rim of the Hektar Nebula, I have ordered all senior officers to prepare for unexpected sensor interference, power fluctuations, and metaphysical phenomena. The last time we encountered a spatial anomaly of this magnitude, Lieutenant Uhura briefly spoke fluent Klingon, and Captain Kirk aged backward for three hours. It is imperative that we remain... flexible. Within reason.
  
  End log.
  🖖`,
  `Captain's Log, Stardate 5432.1
  Captain James T. Kirk Recording
  
  We've entered orbit around the mysterious planet Sigma Iotia II. Initial scans show technology levels equivalent to Earth's 1920s, but with some... interesting adaptations of advanced technology they clearly don't understand.
  
  Mr. Spock has identified what appears to be a primitive computer system running what he describes as "a remarkably accurate simulation of chess, if chess involved disruptors and orbital bombardments." I've ordered the landing party to proceed with extreme caution. The Prime Directive is in full effect, though McCoy insists that someone has already broken it, given the technology we're seeing.
  
  I've assigned Lieutenant Uhura to analyze their communication systems, which seem to be based on some very creative interpretations of subspace technology. She reports that their primary means of communication involves small handheld devices that they refer to as "communicators," but which appear to be used primarily for sending pictures of what they're eating.
  
  Mr. Scott has locked himself in engineering, muttering something about "criminal misuse of perfectly good antimatter containment fields." I'll check on him after the landing party returns.
  
  End log. 🖖`,

  `Captain's Log, Stardate 5897.6
Acting Captain Nyota Uhura Recording

With both Captain Kirk and Commander Spock attending the interplanetary linguistics conference on Vulcan, and Dr. McCoy refusing the "honor" (his words), command of the Enterprise has temporarily fallen to me. 

We're currently conducting routine mapping of the Beta Quadrant's outer rim when we picked up a most peculiar signal—what appears to be an ancient Earth distress call, but with Klingon opera music playing in the background. Mr. Chekov insists this is impossible, while Ensign T'Lara has calculated a 97.8% probability that we're dealing with a temporal anomaly.

The crew has been surprisingly supportive of my temporary command, though Lt. Commander Scott did ask if this meant he could finally install that experimental warp coil he's been talking about. I told him he could—right after I finish reading the 3,000-page safety manual he wrote for it last year. He hasn't brought it up since.

Dr. McCoy just stopped by to tell me I'm doing "a damn fine job, for a comm officer." I'll take that as high praise coming from him.

End log.
🖖`,

`Captain's Log, Stardate 5781.
            Acting Captain Spock Recording

            With Captain Kirk stranded on the surface of Sigma Draconis VI(having beamed down to "mediate" a dispute
            between two factions who, it turns out, were merely debating the proper seasoning
        for plomeek soup), I have resumed command.The crew’s reaction was...mixed.Lieutenant Uhura smiled.Dr.McCoy groaned.Mr.Scott immediately asked if this meant he could "recalibrate the warp core without all the paperwork."

        We are currently towing a derelict Ferengi cargo vessel emitting erratic tachyon pulses.Initial scans suggest the ship’s hold contains 47 cases of what Mr.Chekov insists is "vintage Romulan ale," but which Dr.McCoy’s tricorder identifies as "barely potable engine coolant." The Ferengi crew abandoned ship after apparently losing a game of Tongo mid-warp.Curious.

        Dr.McCoy has just informed me that "command looks good" on me, though he qualified this by adding, "like a hat on a giraffe." I fail to see the relevance of Earth ungulates to starship operations.

        End log.
        🖖`,
        `Captain's Log, Stardate 5914.5
        Captain James T.Kirk Recording
    I’ve retaken command from Spock after a particularly grueling diplomatic summit on Vulcan, where I was
    required to attend seven hours of debate on whether the word "illogical" is, itself, logical. 
    
    Mr.Spock seemed to enjoy it. I nearly chewed my own arm off. We’ve intercepted a distress call from a Klingon
    science vessel trapped in a temporal eddy. Their captain, Kor, claims they’ve been reliving the same 20 minutes
   
    for three weeks.Unfortunately, their solution—"shooting the anomaly with more torpedoes"—only made it worse. Mr.Spock suggests we
    try harmonics.Dr.McCoy suggests we "let them figure it out."
    Ensign Chekov just reported that the ship’s chronometers are now displaying next week’s duty rosters.Lt.Uhura has started
   
    receiving comms from herself.And Mr.Scott, in a stroke of either genius or madness, has begun
    referring to the warp core as "she who must not be disturbed."
    I’ve ordered coffee.Black.Triple strength. End log. 🖖`,

  `Captain's Log, Stardate 6023.7

Dr. Leonard McCoy, Acting Captain

[muttering] I don’t know how this happened either. Kirk’s planetside with some kind of space flu, Spock’s meditating to "rebalance his katra," and Starfleet, in its infinite wisdom, decided I was next in the chain of command. The things I do for this crew...

We’re orbiting a "sentient nebula" that’s been composing what Lt. Uhura describes as "cosmic jazz." It’s also been rearranging our nacelles into what Mr. Scott calls "geometrically improbable shapes." I’ve ordered a full medical scan of everyone who’s been on the engineering deck, just in case.

Mr. Chekov insists the nebula is trying to communicate via balalaika music. Spock, when asked, said it was "fascinating" and then went back to his incense. I’ve threatened to declare the entire sector a no-fly zone for "artistic reasons."

God help us all.

End log.`,

`Captain's Log, Stardate 6158.9

Lt. Nyota Uhura, Acting Captain

With the senior officers all incapacitated by an accidental exposure to Rigellian chocolate (note: never let Dr. McCoy "improve" alien desserts), command has fallen to me. The crew’s response has been surprisingly supportive, though Ensign Chekov keeps asking if this means we can have a "girl power" theme in the mess hall.

We’ve encountered a subspace anomaly that’s translating all spoken language into haiku. Engineering reports are now unintentionally poetic ("The warp core is hot / Like a summer day in hell / Please send coolant now"). Even the ship’s computer has developed a flair for the dramatic.

Mr. Spock, despite his alleged Vulcan immunity to toxins, has been observed humming show tunes in the turbolift. Dr. McCoy is too busy giggling at his own hyposprays to object.

I’ve ordered the universal translators offline. Let’s see how long they last.

End log.🖖`,

`
Captain's Log, Stardate 6293.1

Acting Captain Spock Recording

Captain Kirk is currently detained on Starbase 12 after an incident involving a tribble, a Klingon ambassador, and a zero-gravity jukebox. I have once again assumed command. Dr. McCoy’s exact words: "Heaven help us."

We are studying a planet where the inhabitants communicate entirely through interpretive dance. Lt. Uhura is thriving. Mr. Chekov has somehow offended the locals by attempting the "Macarena." The universal translator insists their most sacred ritual translates to "flossing in the 23rd century."

Mr. Scott reports that the ship’s dilithium crystals have developed a "jazzy new rhythm." I have advised him to refrain from anthropomorphizing critical propulsion components. He responded by handing me a pair of maracas and winking.

I have ordered a full diagnostic of the crew’s neural pathways.

End log.🖖`

];

// Star Trek styling
const StyledApp = styled(Box)({
  background: '#000033',
  minHeight: '100vh',
  padding: '20px',
  color: '#cccccc',
  fontFamily: '"Courier New", monospace',
});

const LogDisplay = styled(Card)({
  background: '#000044',
  border: '1px solid #444488',
  margin: '20px 0',
});

// Functional Component...
function App() {
  const [currentLog, setCurrentLog] = useState(logs[0]);
  const [isMuted, setIsMuted] = useState(false);

  // Track the currently playing sound
  const currentSoundRef = useRef(null);


  // sound array... (length == 16) 
  const soundPaths = [
    '/sounds/blippy.mp3',
    '/sounds/bleep_1.mp3',
    '/sounds/comms-chirp.mp3',
    '/sounds/auto-destruct.mp3',
    '/sounds/kirk_intro_dialog.mp3',
    '/sounds/klingon-vessel-msg.mp3',
    '/sounds/life-forms-skit.mp3',
    '/sounds/spock-vulcan-mind-probe.mp3',
    '/sounds/spock-incoming-msg.mp3',
    '/sounds/spock-greetings.mp3',
    '/sounds/standing-by.mp3',
    '/sounds/star-fleet-msg.mp3',
    '/sounds/star-trek-theme.mp3',
    '/sounds/transfer-complete.mp3',
    '/sounds/treky-whistle.mp3',
    '/sounds/tricorder-sound.mp3'
  ];
  
  // Sound Hooks...
  const [playBlippy, { stop: stopBlippy }] = useSound(soundPaths[0], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playBleep] = useSound(soundPaths[1], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playChirp] = useSound(soundPaths[2], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playDestruct] = useSound(soundPaths[3], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playKirkDialog] = useSound(soundPaths[4], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playKlingonVessel] = useSound(soundPaths[5], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playLifeFormsSkit] = useSound(soundPaths[6], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playSpockVulcanMindProbe] = useSound(soundPaths[7], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playSpockIncomingMsg] = useSound(soundPaths[8], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playSpockGreetings] = useSound(soundPaths[9], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playStandingBy] = useSound(soundPaths[10], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playStarFleetMsg] = useSound(soundPaths[11], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playStarTrekTheme] = useSound(soundPaths[12], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playTransferComplete] = useSound(soundPaths[13], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playTrekyWhistle] = useSound(soundPaths[14], { volume: 0.3, preload: true, soundEnabled: !isMuted });
  const [playTricorderSound] = useSound(soundPaths[15], { volume: 0.3, preload: true, soundEnabled: !isMuted });

  // array of the 16 sound hooks above...
  const soundPlayers = [
    playBlippy, 
    playBleep, 
    playChirp, 
    playDestruct, 
    playKirkDialog, 
    playKlingonVessel,
    playLifeFormsSkit,
    playSpockVulcanMindProbe,
    playSpockIncomingMsg,
    playSpockGreetings,
    playStandingBy,
    playStarFleetMsg,
    playStarTrekTheme,
    playTransferComplete,
    playTrekyWhistle,
    playTricorderSound
  ];

/**
 * ----------------------------------------------------------------------------------------------------------------
 *                                          ViSUAL and AUDIO ASSETS: 
 *                                                    END
 * ----------------------------------------------------------------------------------------------------------------
 */


const [lastStop, setLastStop] = useState(null);

const playRandomSound = () => {
  if (lastStop) lastStop();

  const randomIndex = Math.floor(Math.random() * soundPlayers.length);
  const playFn = soundPlayers[randomIndex];

  if (typeof playFn === 'function') {
    const stopFn = playFn(); // useSound returns play => which returns stop()
    setLastStop(() => stopFn);
  }
};


/*
  const playRandomSound = () => {
    if (currentSoundRef.current) {
      currentSoundRef.current.stop(); // Stop previous sound
    }

    const randomIndex = Math.floor(Math.random() * soundPlayers.length);
    const playFn = soundPlayers[randomIndex](); // play it!

    console.log("Chosen sound index:", randomIndex);
    console.log("Function type:", typeof playFn);

    if (typeof playFn === 'function') {
      playFn();
    } else {
      console.warn("Sound function is not a function:", playFn);
    }

    const sound = playFn(); // this returns a sound instance...
    currentSoundRef.current = sound;
  };
*/
  
  const toggleMute = () => {
    setIsMuted(prev => {
      const newState = !prev;
      if (newState && currentSoundRef.current) {
        currentSoundRef.current.stop();
      }
      return newState;
    });
  };


  // Start ambience when component mounts
  React.useEffect(() => {
    if (!isMuted) {
      const sound = playStarTrekTheme();
      currentSoundRef.current = sound;
    }
    
    return () => {
      if (currentSoundRef.current) {
        currentSoundRef.current.stop();
      }
    };
  }, []);
  
  
  const showRandomLog = () => {
    playRandomSound();
    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    setCurrentLog(randomLog);
  };
  
  return (
    <StyledApp>
      <Typography variant="h4" align="center" gutterBottom>
        Mart Bat Captain's Log Viewer
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Star Trek Enterprise - The Future of Planet Terra
      </Typography>
      
      <LogDisplay>
        <CardContent>
        <Typography variant="subtitle1" align="center">Current Log Entry</Typography>
          <Typography style={{ 
            whiteSpace: 'pre-line',
            color: '#fff'
          }}>
            {currentLog}
          </Typography>
        </CardContent>
      </LogDisplay>

      <Button 
        variant="contained" 
        onClick={showRandomLog}
        style={{ 
          background: '#224466',
          fontWeight: 'bold'
        }}
      >
        Click for new Log Entry
      </Button>
      <Typography align="center" sx={{ mt: 1 }}>
          Sound: {isMuted ? 'Muted 🔇' : 'Active 🔊'}
      </Typography>
      <Button 
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: '#112244',
          color: '#fff'
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </Button>  
    </StyledApp>
  );
}
export default App