import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({ dish }){
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
    if(comments!=null){
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                    <ul className="list-unstyled" >
                        {comments.map((comment)=>{
                            return(
                                <div key={comment.id} >
                                    <li className="mt-1">
                                    {comment.comment}
                                    </li>
                                    <li className="mt-1">
                                        -- {comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </li>
                                </div>
                            )
                        })}
                </ul>
            </div>

            
        )
    } else {
        return <div ></div>
    }
}

const DishDetail = (props) =>{

    const { dish } = props;
    
    if(dish!=null){
        return(    
            <div className="container">
                <div className="row">
                    <RenderDish dish={dish} />
                    <RenderComments comments={dish.comments} />
                </div>
            </div>
        )
    }
        else
            return <div></div>
}

export default DishDetail;