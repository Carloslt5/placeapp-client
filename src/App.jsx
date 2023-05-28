import './App.css'
import AppRoutes from './components/routes/AppRoutes'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
