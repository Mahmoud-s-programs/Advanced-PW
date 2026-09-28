import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { JourneyProvider } from './world/JourneyContext';
import { useJourney } from './world/useJourney';
import ForestScene from './world/ForestScene';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tech from './components/Tech';
import Works from './components/Works';
import Experience from './components/Experience';
import Feedbacks from './components/Feedbacks';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import CinematicJourney from './world/CinematicJourney';

function Portfolio() {
  const { reducedMotion } = useJourney();
  return <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
    <a className="skip-link" href="#main">Skip to content</a>
    <ForestScene />
    <CinematicJourney />
    <Navbar />
    <main id="main" tabIndex="-1">
      <Hero /><About /><Tech /><Works /><Experience /><Feedbacks /><Contact />
    </main>
    <CustomCursor />
  </MotionConfig>;
}

export default function App() {
  return <BrowserRouter><JourneyProvider><Portfolio /></JourneyProvider></BrowserRouter>;
}
