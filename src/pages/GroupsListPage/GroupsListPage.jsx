import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import groupsService from '../../services/group.services'
import { useContext, useEffect, useState } from "react"
import NewGroupForm from '../../components/NewGroupForm/NewGroupForm'
import GroupsList from '../../components/GroupsList/GroupsList'
import Loader from '../../components/Loader/Loader'


const GroupsListPage = () => {

    const [groups, setGroups] = useState()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadGroups()
    }, [])


    const loadGroups = () => {
        groupsService
            .getAllGroups()
            .then(({ data }) => setGroups(data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container>
                <Button className='btnEdit' onClick={() => setShowModal(true)}> Create new group</Button>
            </Container>
            <Container>
                <Row>
                    {
                        !groups
                            ?
                            <Loader md={{ offset: 3, span: 6 }} />
                            :
                            <GroupsList groups={groups} updateList={loadGroups} />
                    }

                </Row>


                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewGroupForm closeModal={() => setShowModal(false)} updateList={loadGroups} />
                    </Modal.Body>
                </Modal>


            </Container>

        </>

    )
}
export default GroupsListPage