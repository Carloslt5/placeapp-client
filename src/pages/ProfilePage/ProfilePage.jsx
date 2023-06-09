import { Container, Row, Col } from 'react-bootstrap'
import './ProfilePage.css'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import usersService from './../../services/users.services'
import placesService from './../../services/places.services'
import ProfileContent from '../../components/ProfileContent/ProfileContent'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'


const ProfilePage = () => {

    const { id } = useParams()

    const [userData, setUserData] = useState()
    const [userPlacesData, setuserPlacesData] = useState()

    useEffect(() => {
        loadUser()
        loadUserPlaces()
    }, [id])

    const loadUser = () => {
        usersService
            .getOneUser(id)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err))
    }

    const loadUserPlaces = () => {
        placesService
            .getUserPlaces(id)
            .then(({ data }) => setuserPlacesData(data))
            .catch(err => console.log(err))
    }

    return (

        <Container>

            <Row>
                <Col xs={12} md={4} className='profile-info-heigth mb-4'>
                    <ProfileInfo {...userData} />
                </Col>

                <Col xs={12} md={8} >
                    <ProfileContent userPlacesData={userPlacesData} {...userData} />
                </Col>
            </Row>

        </Container>

    )
}


export default ProfilePage