import { Col } from "react-bootstrap"
import GroupCard from "../GroupCard/GroupCard"
import Loader from '../../components/Loader/Loader'


const GroupsList = ({ groups, updateList }) => {

    // console.log("ESTOS SON LOS GRUPOS:", groups[0].members[0].favouritePlaces)

    return (

        <>
            {
                !groups
                    ?
                    <Loader md={{ offset: 3, span: 6 }} />
                    :
                    groups.map(elm => {
                        return (
                            <Col md={{ span: 4 }} key={elm._id}>
                                <GroupCard group={elm} updateList={updateList} />
                            </Col>
                        )
                    })
            }
        </>

    )
}

export default GroupsList