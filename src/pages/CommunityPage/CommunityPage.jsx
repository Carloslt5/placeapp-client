import { Container, Row, Col } from 'react-bootstrap'
import './CommunityPage.css'
import usersService from './../../services/users.services'
import { useEffect, useState } from 'react'
import EachUser from '../../components/EachUser/EachUser'
import Loader from '../../components/Loader/Loader'


const CommunityPage = () => {

    const [usersData, setUsersData] = useState()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        usersService
            .getAllUser()
            .then(({ data }) => {
                setUsersData(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <h1>CommunityPage</h1>

            <Row>

                {
                    !usersData
                        ?
                        <Col>
                            <Loader md={{ offset: 3, span: 6 }} />
                        </Col>
                        :
                        usersData.map((user, index) => {
                            return (

                                <Col xs={6} md={3} key={index} >
                                    <EachUser {...user} />
                                </Col>

                            )
                        })
                }

            </Row>

        </Container >
    )
}

export default CommunityPage