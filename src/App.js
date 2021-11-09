import React from 'react';
import Home from "./features/posts/Home"
//import Post from './components/Post';
//import Header from './components/Header';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { RegisterForm2} from "./features/posts/RegisterForm2"
import Header from "./components/Header"
function App() {
  return (
    <Router>

      <Header/>
      <Routes>
      {console.log(process.env)}
      
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<RegisterForm2 />} />
      </Routes>
    </Router>
  );
}

export default App;
//<Header />
//        <Route path="/post/:postId/" component={Post} />