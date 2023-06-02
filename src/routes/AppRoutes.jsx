import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import SignupPage from '../pages/SignupPage/SignupPage'
import PrivateRoute from './PrivateRoutes'
import CreatePlacePage from '../pages/CreatePlacePage/CreatePlacePage'
import EditPage from '../pages/EditPage/EditPage'
import PlaceDetailsPage from '../pages/PlaceDetailsPage/PlaceDetailsPage'
import AllPlacesPage from '../pages/AllPlacesPage/AllPlacesPage'
import EditPlacePage from '../pages/EditPlacePage/EditPlacePage'


const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<h1>HOME🫂 🙃</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/places" element={<AllPlacesPage />} />
            <Route path="/places/:id" element={<PlaceDetailsPage />} />
            <Route path="/places/create" element={<CreatePlacePage />} />
            <Route path="/places/:id/edit" element={<EditPlacePage />} />
            <Route path="/community" element={<h1>Community 🫂 🙃</h1>} />

            <Route path="/profile/:id" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
                <Route path="/profile/:id/edit" element={<EditPage />} />
            </Route>

            <Route path="/profile/:id/myplaces" element={<h1>PROFILE My Places 🫂 🙃</h1>} />
            <Route path="/profile/:id/myfavourites" element={<h1>TUS LUGARES FAVS 🫂 🙃</h1>} />
            <Route path="/match" element={<h1> BOTON HACER MATCH 💦 🫂 🚪</h1>} />
            <Route path="*" element={<h1>404 🤓</h1>} />

        </Routes>
    )
}

export default AppRoutes