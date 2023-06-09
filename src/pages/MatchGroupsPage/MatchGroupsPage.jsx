import { useEffect, useState } from "react"
import { Container, Form, Button, Col, Row } from "react-bootstrap"
import groupsService from '../../services/group.services'
import matchService from '../../services/match.services'
import Loader from "../../components/Loader/Loader"
import EachPlace from "../../components/EachPlace/EachPlace"


const MatchGroupsPage = () => {

    const [groups, setGroups] = useState()
    const [matchedPlaces, setMatchesPlaces] = useState()

    const [groupsData, setGroupsData] = useState({
        myGroupId: '',
        allGroupId: ''
    })

    useEffect(() => {
        loadGroups()
    }, [])


    const loadGroups = () => {
        groupsService
            .getAllGroups()
            .then(({ data }) => setGroups(data))
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()

        matchService
            .getMatchPlacesGroups(groupsData)
            .then(({ data }) => {
                setMatchesPlaces(data)
                console.log('esto es del front', data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setGroupsData({ ...groupsData, [name]: value })
    }

    console.log(matchedPlaces)

    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="title">

                    <Form.Label >My Groups</Form.Label>

                    <Form.Select aria-label="Default select example" name="myGroupId" onChange={handleInputChange}>

                        {
                            !groups
                                ?
                                <Loader />
                                :
                                groups.map(elem => {
                                    return (
                                        <option key={elem._id} value={elem._id}>{elem.name}</option>
                                    )
                                })
                        }

                    </Form.Select>

                    <Form.Label >All Groups</Form.Label>

                    <Form.Select aria-label="Default select example" name="allGroupId" onChange={handleInputChange}>
                        {
                            !groups
                                ?
                                <Loader />
                                :
                                groups.map(elem => {
                                    return (
                                        <option key={elem._id} value={elem._id}>{elem.name}</option>
                                    )
                                })

                        }
                    </Form.Select>

                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                    <Button className='mt-2 mb-4 btnBlue' type="submit">Match Group</Button>
                </div>
                {/* <div className="d-grid mt-3">
                    <Button variant="dark" type="submit">Match Group</Button>
                </div> */}
            </Form>

            <Row>

                {
                    matchedPlaces?.map(place => {
                        if (place !== null) {
                            return (
                                <Col xs={12} md={6} lg={4} key={place._id} className='mb-4' >
                                    <EachPlace {...place} />
                                </Col>
                            )
                        }
                    })
                }
            </Row>




        </Container>
    )
}

export default MatchGroupsPage