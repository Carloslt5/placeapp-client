import { Container, Row, Col } from 'react-bootstrap'
import './CommunityPage.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import usersService from './../../services/users.services'
import EachUser from '../../components/EachUser/EachUser'
import Loader from '../../components/Loader/Loader'


const CommunityPage = () => {

    const [usersData, setUsersData] = useState()

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        usersService
            .getAllUser()
            .then(({ data }) => {
                setUsersData(data)
            })
            .catch(err => console.log(err))
    }

    return (

        <Container>

            <Row>

                {
                    !usersData
                        ?
                        <Col >
                            <Loader md={{ offset: 3, span: 6 }} />
                        </Col>
                        :
                        usersData.map((user, index) => {
                            return (

                                <Col xs={6} md={3} key={index} className='mb-4'>
                                    <Link to={`/profile/${user._id}`}>
                                        <EachUser {...user} />
                                    </Link>
                                </Col>

                            )
                        })
                }

            </Row>

        </Container >

    )
}


export default CommunityPage