import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import Upload from './Upload';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './Upload'
    
class ModalPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        modal: false
        };
      }
    
  toggle = () => {
    this.setState({
        modal: !this.state.modal
        });
      }
    
  render() {
    return (
      <Container>
        <Button onClick={this.toggle}>click me</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="fluid">
          <ModalHeader toggle={this.toggle}>lookbook</ModalHeader>
            <ModalBody>
              <Upload></Upload>
            </ModalBody>
            <ModalFooter>
              <br/>
              
            </ModalFooter>
          </Modal>
      </Container>
        );
      }
    }
    
export default ModalPage;
    
    
  