import './HomePage.css'
import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import placesService from './../../services/places.services'
import { AuthContext } from './../../contexts/auth.context'


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

<<<<<<< HEAD
        <section className=" d-flex flex-column justify-content-center align-items-center mb-3" style={{ height: '80vh' }} >
            <Container className='rounded py-4' >
                <h1 className='home-title'>SITE OF THE DAY</h1>
            </Container>
            {
                !user &&
                <Link to="/signup" className='btn'>Singup</Link>
=======
        <>
            <section className=" d-flex flex-column align-items-center mb-3" style={{ height: '100vh' }} >
                <h1 className='home-title'>DISCOVER, EXPLORE & CONNECT</h1>
                <div class="marquee">
                    <div class="marquee_track">
                        <div class="marquee_content">
                            <h3>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                                PLACEAPP <span class="outline">PLACEAPP </span>
                            </h3>
                        </div>
                    </div>
                </div>
                <Container className='rounded py-4 home-container' >
                </Container>
            </section >

            {
                !user &&
                <Container className='d-flex justify-content-center mb-4 '>
                    <Link to="/signup" className='btn btnBlue'>Singup</Link>
                </Container>
>>>>>>> 7345d922daf0f2aaa7692c9e9e3dd07cecda462c
            }

        </>
    )
}
export default HomePage