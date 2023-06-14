import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import groupsService from '../../services/group.services'
import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'




const NewGroupForm = ({ closeModal, updateList }) => {

    const { user } = useContext(AuthContext)


    const [groupData, setGroupData] = useState({
        name: '',
        description: '',
        owner: user._id,
        members: '',
    })

    const handleInputChange = event => {
        const { name, value } = event.target
        setGroupData({ ...groupData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        groupsService
            .createGroup(groupData)
            .then(({ data }) => {

                groupsService
                    .joinGroup(data._id)
                    .then(({ data }) => {
                        closeModal()
                        updateList()
                    })

            })
            .catch(err => console.log(err))

    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label><strong>Group Name:</strong></Form.Label>
                <Form.Control type="text" value={groupData.name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label><strong>Description:</strong></Form.Label>
                <Form.Control type="text" value={groupData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <div className="d-grid mt-3">
                <Button variant="dark" type="submit">Create new group</Button>
            </div>
        </Form>
    )



}
export default NewGroupForm