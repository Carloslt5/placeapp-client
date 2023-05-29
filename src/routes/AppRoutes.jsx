import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'


const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<h1>HOLA 🫂 🙃</h1>} />
            <Route path="/login" element={<h1>LOGIN 🫂 🙃</h1>} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/places" element={<h1>PLACES 🫂 🙃</h1>} />
            <Route path="/places/:id" element={<h1>PLACES DETAILS 🫂 🙃</h1>} />
            <Route path="/places/create" element={<h1>FORM CREATE 🫂 🙃</h1>} />
            <Route path="/places/edit" element={<h1>EDIT PLACE 🫂 🙃</h1>} />
            <Route path="/community" element={<h1>Community 🫂 🙃</h1>} />

            <Route path="/profile/:id" element={<h1>PROFILE 🫂 🙃</h1>} />
            <Route path="/profile/:id/myplaces" element={<h1>PROFILE My Places 🫂 🙃</h1>} />
            <Route path="/profile/:id/myfavourites" element={<h1>TUS LUGARES FAVS 🫂 🙃</h1>} />
            <Route path="/match" element={<h1> BOTON HACER MATCH 💦 🫂 🚪</h1>} />
            <Route path="*" element={<h1>404 🤓</h1>} />

        </Routes>
    )
}

export default AppRoutes