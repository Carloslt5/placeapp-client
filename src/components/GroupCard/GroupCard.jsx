import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import groupsService from '../../services/group.services'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import './GroupCard.css'



const GroupCard = ({ group: { _id, name, description, owner, members }, updateList }) => {

    const [isJoin, setIsJoin] = useState(false)
    const { user } = useContext(AuthContext)


    useEffect(() => {

        groupsService
            .getOneGroup(_id)
            .then(({ data }) => data.members.some(elm => elm._id === user._id) ? setIsJoin(true) : setIsJoin(false))
            .catch(err => console.log(err))

    }, [user, user?._id])



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

        <Card className="mb-3">
            <Card.Body className='d-flex flex-column justify-content-between'>
                <article>
                    <Card.Title><strong>{name}</strong></Card.Title>
                    <hr />
                    <Card.Text> {description} </Card.Text>
                </article>

                <Row>

                    <Col className='group-members'>
                        {
                            members.map(user => {
                                return (
                                    <figure>
                                        <img key={user._id} className='rounded-circle group-img' src={user.avatar} alt="" />
                                    </figure>
                                )
                            })
                        }
                    </Col>
                </Row>

                <Row className='d-flex justify-content-end '>

                    {
                        !isJoin
                            ?
                            <Button className='btnAddFavourite' onClick={handlerJoinGroup}>Join 💦</Button>
                            :
                            <Button className='btnDelete' onClick={handlerUnjoinGroup}>Unjoin 🤬</Button>


                    }

                </Row>
            </Card.Body>
        </Card >

    )
}

export default GroupCard