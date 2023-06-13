import { Col } from "react-bootstrap"
import GroupCard from "../GroupCard/GroupCard"
import Loader from '../../components/Loader/Loader'


const GroupsList = ({ groups, updateList }) => {

    return (

        <>
            {
                !groups
                    ?
                    <Loader md={{ offset: 3, span: 6 }} />
                    :
                    groups.map(elm => {
                        return (
                            <Col sm={6} md={4} key={elm._id} className="mb-4">
                                <GroupCard group={elm} updateList={updateList} />
                            </Col>
                        )
                    })
            }
        </>

    )
}

export default GroupsList