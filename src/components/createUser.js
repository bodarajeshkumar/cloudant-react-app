import React , {useState}from 'react';
import {render} from "react-dom";
import {Button, Container, Row, Col, Form, Card, ToastHeader} from 'react-bootstrap';
import * as axios from 'axios';
import {Modal, TextInput, TextArea} from 'carbon-components-react';
import ShowModal from "./showModal";
import {registerUser, tableDataStatus} from "../store/reducers";
import {useSelector, useDispatch} from "react-redux";
import NotificationMessage from './notificationMessage';
import ToastContainer from 'react-bootstrap/ToastContainer'
import {Toast} from "bootstrap";

export default function CreateUser(){

  const [showModal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const componentState = useSelector(state => state);
  const dispatch = useDispatch()

  function userReg(userObject) {
    dispatch(registerUser(userObject))
  }


  return(
      <div>

        <Container>
          <Row>
            <Col xm={4} >
              <br />
              {componentState.userData.registrationStatus &&
              <NotificationMessage settings={{
                kind: 'success',
                subtitle: 'User has been successfully registered'
              } }
              />
              }
            </Col>

          </Row>

          <Row>

            <Col xm={4} style={{float: 'left'}}>
              <Card
                  //bg='info'
                  border="info" style={{ width: '40rem' }}
              >
                <Card.Header>User Registration</Card.Header>
                <Card.Body>
                  <Form action={"/registeruser"} method={"POST"}>
                    <Form.Group className={'mb-3'} controlId="formFirstName">
                      <Form.Control type="name" placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Control type="name" placeholder="Enter Last Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Terms and Conditions" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={function () {
                      let userObj = JSON.stringify({
                        "firstName": document.getElementById('formFirstName').value,
                        "lastName": document.getElementById('formLastName').value,
                        "email": document.getElementById('formBasicEmail').value,
                        "password": document.getElementById('formBasicPassword').value
                      })
                      userReg(userObj);

                    }}>
                      Submit
                    </Button>
                  </Form>

                  {showModal &&
                      <ShowModal data={
                        {showModal: true,
                        modalHeading: 'User Registration Status',
                        modalText: "User has been successfully registered",
                        showEditOption: false,
                        modalSize: "xs",
                          hasForm: false}
                      }/>
                  }

                </Card.Body>

              </Card>
            </Col>
            <Col xm={4} >

            </Col>
            <Col xm={4} >

            </Col>
          </Row>

        </Container>

      </div>
  )
}
