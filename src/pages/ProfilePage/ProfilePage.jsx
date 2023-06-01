import { Container, Row, Col } from 'react-bootstrap';
import './ProfilePage.css'
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileContent from '../../components/Profile/ProfileContent';
import usersService from './../../services/users.services'
import placesService from './../../services/places.services'

import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { useEffect, useState } from "react"


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [userData, setUserData] = useState()
    const [userPlacesData, setuserPlacesData] = useState()

    useEffect(() => {
        loadUser()
        loadUserPlaces()
    }, [])

    const loadUser = () => {
        usersService
            .getOneUser(user._id)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err))
    }



    //Aqui busco los places creados por un usuario
    const loadUserPlaces = () => {
        placesService
            .getUserPlaces(user._id)
            .then(({ data }) => setuserPlacesData(data))
            .catch(err => console.log(err))
    }






    return (
        <>
            <Container>
                {
                    !userData
                        ?
                        <h2>Cargando.....</h2>
                        :
                        <Row>
                            <Col xs={12} md={4}>
                                <ProfileInfo userData={userData} />
                            </Col>

                            <Col xs={12} md={8} >
                                <ProfileContent userPlacesData={userPlacesData} />
                            </Col>
                        </Row>
                }
            </Container>
        </>


    )
}

export default ProfilePage