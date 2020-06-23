import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
        Modal, ModalHeader, Label, Input,ModalBody, Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state= {
            isModalOpen:false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);

    }
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen})
    }
    handleComment(values) {
        this.toggleModal();
        console.log("Current State is " + JSON.stringify(values));
        alert("Current state is "+ JSON.stringify(values));

    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className="ml-2 mr-2" onSubmit={(values)=> this.handleComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="checkRating">Rating</Label>
                                <Control.select model=".checkRating" className="p-1 w-100" name="checkRating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength:minLength(3), maxLength:maxLength(15)
                                        }}
                                        />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required:'Required ',
                                            minLength:'Must be greater than 2 characters ',
                                            maxLength:'Must be less than or equal to 15 characters'
                                        }}
                                    />
                            </Row>
                        
                            
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" value="submit" className="bg-primary">Login</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>


        )
    }
}
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
                <CommentForm />
            </div>

            
        )
    } else {
        return <div ></div>
    }
}

const DishDetail = (props) =>{

    const { dish, comments } = props;
    
    if(dish!=null){
        return(    
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr />
                </div>
            </div>
                <div className="row">
                    <RenderDish dish={dish} />
                    <RenderComments comments={comments} />
                </div>
            </div>
        )
    }
        else
            return <div></div>
}

export default DishDetail;