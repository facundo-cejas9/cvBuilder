import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CVForm from './components/CvForm';
import PdfCreated from './components/TestHtml';


function App() {

  return (
    <Router>
    
      <Routes>
        <Route  path="/" element={<CVForm />} />
        <Route  path="/cv/:cvId" element={<PdfCreated />} />
      </Routes>
    </Router>
  )
}

export default App
