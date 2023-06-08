
import EachComment from '../../components/EachComment/EachComment'


const CommentsList = ({ placeData, updateComments }) => {

    return (
        <>
            {
                placeData.comments.map(comment => {

                    return (

                        < EachComment key={comment._id} comment={comment} updateComments={updateComments} />
                    )
                })
            }
        </>

    )
}

export default CommentsList