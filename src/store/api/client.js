import * as axios from 'axios';


const listAllUsers = () => {
  let config = {
    url: 'https://cloudant-shankar.mybluemix.net/listAllUsers',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  }
  return axios.default(config).then(response => {
    return response.data;
  })
}

const deleteUser = (documentId) => {
  let data = JSON.stringify({
    "docId": documentId
  });
  let config = {
    'method': 'post',
    url: 'https://cloudant-shankar.mybluemix.net/deleteUser',
    headers: {
      'content-type': 'application/json',
    },
    data: data
  }
  return axios.default(config).then(response => {
    return response.data;
  })
}

const createUser = (userObj) => {
  console.log('coming to register user');

  let config = {
    method: 'post',
    url: 'https://cloudant-shankar.mybluemix.net/registerUser',
    headers: {
      'Content-type': 'application/json'
    },
    data: userObj
  }
  return axios.default(config).then(response => {
    console.log('what is the response', response);
    return response.data
  })
}

const editUser = (userObj) => {
  let config = {
    url: 'https://cloudant-shankar.mybluemix.net/modifyUser',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: userObj
  }
  return axios.default(config).then(response => {
    return response.data
  })
}

//export default listAllUsers;
export  {listAllUsers, deleteUser, createUser, editUser}
