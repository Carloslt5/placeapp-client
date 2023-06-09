import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import UserMessage from './components/UserMessage/UserMessage'
import Chat from './components/Chat/Chat'


function App() {

  return (

    <div className="App">
      <Navigation />
      <Chat />
      <AppRoutes />
      <UserMessage />
      <Footer />
    </div>

  )

}


export default App
