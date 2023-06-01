import { useContext } from 'react'
import Profile from '../../components/Profile/Profile'
import { AuthContext } from '../../contexts/auth.context'
import './ProfilePage.css'


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    return (
        <>
            <div style={{ backgroundColor: 'purple' }}>

                <h1>Welcome , {user.name}</h1>
                <h1>Welcome , {user.lastName}</h1>
                <h1>Welcome , {user.role}</h1>
                <img src={user.avatar} alt="" />
                <h1>Welcome , {user.favouritesPlaces}</h1>

                <h1>Welcome , {user.name}</h1>
                <h1>Welcome , {user.lastName}</h1>
                <h1>Welcome , {user.role}</h1>
                <img src={user.avatar} alt="" />
                <h1>Welcome , {user.favouritesPlaces}</h1>

                <h1>Welcome , {user.name}</h1>
                <h1>Welcome , {user.lastName}</h1>
                <h1>Welcome , {user.role}</h1>
                <img src={user.avatar} alt="" />
                <h1>Welcome , {user.favouritesPlaces}</h1>
            </div>


            <Profile />
        </>


    )
}

export default ProfilePage