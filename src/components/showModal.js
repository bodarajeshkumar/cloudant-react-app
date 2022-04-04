import react, {useState, useEffect} from 'react';
import {Modal, TextInput, TextArea} from 'carbon-components-react'
import React from "react";


export default function ShowModal(props) {
  const [showModal, setModal] = useState(props.data.showModal);
  const reload=()=>window.location.reload();

  console.log('showmodal', props.data);

  const handleClose =() => setModal(false);
  const handleModalSave = (data) => {
    alert('data')
    console.log('data', data);
    //reload();
    return true;
  };

  useEffect(() => {

  }, []);

  return (
      <div>
        <Modal
        modalHeading={props.data.modalHeading}
        open={showModal}
        onRequestClose={handleClose}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleModalSave}
        hasForm={props.data.hasForm}
        size={props.data.modalSize}>
          {props.data.showEditOption &&
          <>
            <TextInput
                data-modal-primary-focus
                id="text-input-1"
                labelText="First Name"
                value={props.data.userData.userData.cells[1].value}
                style={{ marginBottom: '0.01rem' }}
            />
            <br />
            <TextInput
                data-modal-primary-focus
                id="text-input-1"
                labelText="Last Name"
                value={props.data.userData.userData.cells[2].value}
                style={{ marginBottom: '0.01rem' }}
            />
            <br />
            <TextInput
                data-modal-primary-focus
                id="text-input-1"
                labelText="Email Address"
                placeholder="Enter your new email address"
                style={{ marginBottom: '0.01rem' }}
                onChangeText={(changedText) => props.data(changedText)}
            />
          </>

          }
          {
            !props.data.showEditOption &&
            <p>{props.data.modalText}</p>
          }

        </Modal>

      </div>
  )
}
