import { Container, Row, Col } from 'react-bootstrap'
import './CommunityPage.css'
import usersService from './../../services/users.services'
import { useEffect, useState } from 'react'
import EachUser from '../../components/EachUser/EachUser'

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
                        <h2>Cargando.....</h2>
                        :
                        usersData.map((user, index) => {
                            return (

                                <Col Col md={3} key={index} >
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