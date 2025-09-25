import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import CarGallery from './Pages/CarGallery'
import Footer from './Components/Footer'
import CarViewer from './hooks/CarViewer'
import Cart from './hooks/Cart'
import Steering from './hooks/Steering'
import Bio from './hooks/Bio'
import CarScroll from './hooks/CarScroll'
import StoriesSection from './hooks/StoriesSection'
import Sidebar from './hooks/cargallery/Sidebar'
import CarIllustrations from './Pages/CarIllustrations'
import VideoGallery from './Pages/VideoGallery'
import Search from './Pages/Search'
import ExploreEarth from './Pages/ExploreEarth'
import ComingSoon from './Pages/ComingSoon'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Help from './Pages/Help'
import Ocean from './Pages/Ocean'
import Forest from './Pages/Forest'
import Desert from './Pages/Desert'
import Sunset from './Pages/Sunset'
import Wildlife from './Pages/Wildlife'
import Adventure from './Pages/adventure'
import Landscape from './Pages/Landscape'
import Cities from './Pages/Cities'
import P_images from './Pages/P_images'
import Cartoons from './Pages/Cartoons'
import Coffee from './Pages/Coffee'
import Team from './Pages/Team'
import CustomCursor from './hooks/CustomCursor'



const App = () => {
  return (
    <>
      <Router>
        <Navbar />



        <Routes>
          <Route path="home" element={<><Home /> <Steering />
            <CarViewer />
            <Cart />
            <Bio />
            <CarScroll />
            <StoriesSection /></>} />
          <Route path="/" element={<><CarGallery /><Sidebar /></>} />
          <Route path="CarIllustrations" element={<><CarIllustrations /></>} />
          <Route path="VideoGallery" element={<><VideoGallery /></>} />
          <Route path="Search" element={<><Search /></>} />
          <Route path='ExploreEarth' element={<><ExploreEarth /></>} />
          <Route path='ComingSoon' element={<><ComingSoon /></>} />
          <Route path='About' element={<><About /></>} />
          <Route path='Blog' element={<><Blog /></>} />
          <Route path='Contact' element={<><Contact /></>} />
          <Route path='Help' element={<><Help /></>} />
          <Route path='Ocean' element={<><Ocean /></>} />
          <Route path='Forest' element={<><Forest /></>} />
          <Route path='Desert' element={<><Desert /></>} />
          <Route path='Sunset' element={<><Sunset /></>} />
          <Route path='Wildlife' element={<><Wildlife /></>} />
          <Route path='Adventure' element={<><Adventure /></>} />
          <Route path='Landscape' element={<><Landscape /></>} />
          <Route path='Cities' element={<><Cities /></>} />
          <Route path='P_images' element={<><P_images /></>} />
          <Route path='Cartoons' element={<><Cartoons /></>} />
          <Route path='Coffee' element={<><Coffee /></>} />
          <Route path='Team' element={<><Team /></>} />

        </Routes>
<CustomCursor/>



        <Footer />
        {/* <Show/> */}
      </Router>


    </>
  )
}

export default App