import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <div className='relative z-0 bg-gray-950'>
=======
      <div className='relative z-0 bg-gradient-to-r from-slate-900 to-slate-700'>
>>>>>>> e93a9f1c94dc60d5661ac894d9e44356b279130e
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
