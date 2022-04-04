import React, {useState, useEffect, useCallback} from 'react';
import {Row, Container, Card, Col} from 'react-bootstrap';
import DataTable, {
 Table,
 TableBody, TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,

 } from 'carbon-components-react/lib/components/DataTable';
import {
  Button,
  rows,
  TableSelectAll,
  ToastNotification,
  InlineNotification,
  Modal,
  TextInput
} from 'carbon-components-react';
import * as axios from 'axios';
import {TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarAction,
  TableToolbarContent,
  TableSelectRow,
  TableToolbarMenu} from "carbon-components-react";
import ShowModal from "./showModal";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, allRows, tableDataStatus, deleteRow, modifyUser} from "../store/reducers/index";


export default function  DeleteUser() {

  const [tableData, fillTable] = useState([]);
  const [showModal, setModal] = useState(false);
  const [showEditModalOptions, setEditModal] = useState(false);
  const [userData, changeUserData] = useState({});
  const dispatch = useDispatch();
  const posts = useSelector(state => state);
  const [showNotification, setNotificationStatus] = useState(false);


  //modal
  const [newFirstName, changeUserFirstName] = useState('');
  const [newLastName, changeUserLastName] = useState('');
  const [newEmail, changeUserEmail] = useState('');
  const [modalOpened, setOpenModal] = useState(false);
  const toggleModal = (selectedRow) => {setOpenModal(!modalOpened); changeUserData(selectedRow); };

  const handleModalSave = (data) => {
    //setEditModal(true);
    //dispatch(previewModal({type: 'ON'}))
    let userObj = {
      firstName: newFirstName,
      lastName: newLastName,
      docId: userData.cells[0].value,
      email: newEmail
    }
    dispatch(modifyUser(userObj)).then(() => {
    })
    setOpenModal(!modalOpened);
    return true;
  };

  function deleteUser(documentId) {
    dispatch(deleteRow(documentId));
    setNotificationStatus(true);
  }

  function modifyUser1(selectedRow) {

    let userObj1 = {
      firstName: newFirstName,
      lastName: newLastName,
      docId: selectedRow.cells[0].value,
      email: newEmail
    }
    dispatch(modifyUser(userObj1)).then(() => {
      console.log('yes action dispatched');
    })
    setNotificationStatus(true)
  }

  function showEditOption(selectedRow) {
    setOpenModal(!modalOpened);
    changeUserData(selectedRow);
  }


  useEffect(() => {
    if (!posts.userData.loading) {
      dispatch(fetchUsers());
    }
  }, [posts.userData, modalOpened]);

  const notificationProps = () => ({
        kind: 'success',
        lowContrast: true,
        role: 'alert',
        title: 'Notification',
        subtitle: 'User has been successfully deleted',
        caption: new Date().getTime(),
  });

  const toastNotificationProps = () => ({
     ...notificationProps(),
      timeout: 0
  });


  return (
      <div>
        <Container>
          {posts.userData.modificationStatus}

          <Row>
            {showModal &&
            <ShowModal data={
              {showModal: posts.userData.modificationStatus,
                modalHeading: 'Delete User',
                modalText: "User has been successfully deleted",
                showEditOption: false,
                modalSize: "xs",
              hasForm: false}
            }/>
            }

            {showNotification &&  <InlineNotification
                {...toastNotificationProps()}
                style={{ marginBottom: '.5rem' }}
            />}

            <Col md={12}>

              {
                posts.userData.loading &&
                <DataTable
                    rows={posts.userData.rows} headers={posts.userData.headers}
                    radio>
                  {({
                      rows,
                      headers,
                      getHeaderProps,
                      getSelectionProps,
                      selectAll,
                      selectRow,
                      selectedRows,
                      getBatchActionProps,
                      getTableProps,
                      getToolbarProps,
                      onInputChange,
                      getRowProps,
                    }) => (
                      <TableContainer
                          title="All Users"
                          style={{marginTop: 3 +'em'}}
                      >
                        <TableToolbar
                            {...getToolbarProps()}
                            aria-label="data table toolbar"
                            size="normal">
                          <TableToolbarContent>
                            <Button onClick={() => {
                              if (selectedRows != undefined) {
                                deleteUser(selectedRows[0].id);
                              }
                            }}>Delete User</Button>

                            <Button style={{"marginLeft": 1 +'em'}} onClick={() => {
                              toggleModal(selectedRows[0]);
                              setEditModal(true);

                            }}>Edit User</Button>

                          </TableToolbarContent>

                        </TableToolbar>
                        <Table>

                          <TableHead>
                            <TableRow>
                              <TableHeader></TableHeader>
                              {headers.map(header => (
                                  <TableHeader {...getHeaderProps({ header })}>

                                    {header.header}
                                  </TableHeader>
                              ))}
                            </TableRow>

                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                                <React.Fragment key={row.id}>
                                  <TableRow key={row.id}>
                                    <TableSelectRow {...getSelectionProps({ row })}

                                    />
                                    {row.cells.map((cell) => (
                                        <TableCell key={cell.id}>
                                          {(cell.value)}
                                        </TableCell>
                                    ))}
                                  </TableRow>
                                </React.Fragment>
                            ))}

                          </TableBody>
                        </Table>
                        {
                          userData.cells &&
                          <Modal
                              modalHeading="Edit User Data"
                              open={modalOpened}
                              onRequestClose={toggleModal}
                              primaryButtonText="Ok"
                              secondaryButtonText="Cancel"
                              onRequestSubmit={handleModalSave}
                              size="sm"
                          >

                            <>
                              <p >
                                {userData.cells[0].value}
                              </p>
                              <TextInput
                                  data-modal-primary-focus
                                  id="text-input-1"
                                  labelText="First Name"
                                  style={{ marginBottom: '0.01rem' }}
                                  onChange={(changedText) => changeUserFirstName(changedText.target.value)}
                              />
                              <br />
                              <TextInput
                                  data-modal-primary-focus
                                  id="text-input-1"
                                  labelText="Last Name"
                                  style={{ marginBottom: '0.01rem' }}
                                  onChange={(changedText) => changeUserLastName(changedText.target.value)}
                              />
                              <br />
                              <TextInput
                                  data-modal-primary-focus
                                  id="text-input-1"
                                  labelText="Email Address"
                                  style={{ marginBottom: '0.01rem' }}
                                  onChange={(changedText) => changeUserEmail(changedText.target.value)}
                              />
                            </>
                          </Modal>
                        }

                      </TableContainer>

                  )}

                </DataTable>
              }
            </Col>

          </Row>

        </Container>
        <div>

        </div>

      </div>
  )
}

