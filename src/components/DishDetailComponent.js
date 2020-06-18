import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    renderComments(comments){
        if(comments!=null){
            return comments.map((comment)=>{
                return(
                    <div key={comment.id} >
                        <li className="mt-1">
                        {comment.comment}
                        </li>
                        <li className="mt-1">
                            -- {comment.author} , {comment.date}
                        </li>
                    </div>
                )
            })
        } else {
            return <div></div>
        }
    }
    render(){
        const { dish } = this.props;
        const comments = dish.comments;

        return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width='100%' src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                        <ul className="list-unstyled" >
                            {this.renderComments(comments)}
                        </ul>
                </div>

            
            </div>

        </div>)
    }
}

export default DishDetail;