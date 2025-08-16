import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import CheckboxTreePage from './tasks/checkbox-tree/CheckboxTreePage'
import NotFound from './tasks/checkbox-tree/NotFound'
import Home from './Home'

function App() {

  return (
    <div>
     
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/checkbox-tree">Checkbox Tree</Link>
          </li>
          
        </ul>
      </nav>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkbox-tree" element={<CheckboxTreePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
