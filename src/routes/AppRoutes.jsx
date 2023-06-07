import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import AllPlacesPage from '../pages/AllPlacesPage/AllPlacesPage'
import PlaceDetailsPage from '../pages/PlaceDetailsPage/PlaceDetailsPage'
import EditPlacePage from '../pages/EditPlacePage/EditPlacePage'
import CreatePlacePage from '../pages/CreatePlacePage/CreatePlacePage'
import CommunityPage from '../pages/CommunityPage/CommunityPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import EditPage from '../pages/EditPage/EditPage'


const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<h1>HOME🫂 🙃</h1>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/places" element={<AllPlacesPage />} />
            <Route path="/community" element={<CommunityPage />} />

            <Route element={<PrivateRoute />}>

                <Route path="/places/:id" element={<PlaceDetailsPage />} />
                <Route path="/places/:id/edit" element={<EditPlacePage />} />
                <Route path="/places/create" element={<CreatePlacePage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/profile/:id/edit" element={<EditPage />} />
                <Route path="*" element={<h1>404 🤓</h1>} />

            </Route>

        </Routes>
    )
}


export default AppRoutes