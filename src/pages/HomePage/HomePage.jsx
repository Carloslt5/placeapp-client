import './HomePage.css'
import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import placesService from './../../services/places.services'
import { AuthContext } from './../../contexts/auth.context'
import EachPlace from '../../components/EachPlace/EachPlace'
import Loader from '../../components/Loader/Loader'

const HomePage = () => {

    const { user } = useContext(AuthContext)

    const [placesData, setPlacesData] = useState()

    useEffect(() => {
        loadUserPlaces()
    }, [])

    const loadUserPlaces = () => {
        placesService
            .getAllPlaces()
            .then(({ data }) => {
                setPlacesData(data.slice(0, 5))
            })
            .catch(err => console.log(err))
    }

    return (

        <section className=" d-flex flex-column justify-content-center align-items-center mb-3" style={{ height: '80vh' }} >
            <Container className='rounded py-4' >
                <h1 className='home-title'>SITE OF THE DAY</h1>
            </Container>
            {
                !user &&
                <Link to="/signup" className='btn'>Singup</Link>
            }
        </section >
    )
}
export default HomePage