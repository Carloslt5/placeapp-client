import { Button, Card, Col, Row } from 'react-bootstrap'
import groupsService from '../../services/group.services'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import './GroupCard.css'



const GroupCard = ({ group: { _id, name, description, owner, members }, updateList }) => {

    const { user } = useContext(AuthContext)
    const [isJoin, setIsJoin] = useState(null)


    useEffect(() => {
        groupsService
            .getOneGroup(_id)
            .then(({ data }) => data.some(elm => elm.members._id === user._id) && setIsJoin(true))
            .catch(err => console.log(err))

    }, [user])


    console.log(isJoin)
    const handlerJoinGroup = () => {
        groupsService
            .joinGroup(_id)
            .then(() => {
                setIsJoin(true)
                updateList()
            })
            .catch(err => console.log(err))

    }

    const handlerUnjoinGroup = () => {
        groupsService
            .unJoinGroup(_id)
            .then(() => {
                setIsJoin(false)
                updateList()
            })
            .catch(err => console.log(err))

    }

    return (

        <Card className="mb-3 p-2">
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Row className='justify-content-between'>
                    <article>
                        <Card.Title><strong>{name}</strong></Card.Title>
                        <hr />
                        <Card.Text> {description} </Card.Text>
                    </article>
                </Row>

                <Row className='d-flex justify-content-end'>
                    <Col className='group-members'>
                        {
                            members.map(user => {
                                return (
                                    <figure key={user._id} className='me-1'>
                                        <img className='rounded-circle group-img' src={user.avatar} alt="" />
                                    </figure>
                                )
                            })
                        }
                    </Col>
                    {
                        !isJoin
                            ?
                            <Button onClick={handlerJoinGroup}>Join</Button>
                            :
                            <Button className='btnRemoveFavourite' onClick={handlerUnjoinGroup}>Unjoin</Button>


                    }

                </Row>
            </Card.Body>
        </Card >

    )
}

export default GroupCard