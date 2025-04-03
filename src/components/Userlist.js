import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { toast } from 'react-toastify';
import { deleteUser, getUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getallUsers, removeUser } from '../service/allapis';
import Adduser from './Adduser';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



function Userlist() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [addUpdate, setAddUpdate] = useState("")
  const users = useSelector(state => state.users.users)
  //console.log("users", users);


  useEffect(() => {
    const fetchData = async (e) => {

      const result = await getallUsers()
      dispatch(getUser(result.data))

    }
    fetchData()
  }, [addUpdate])


  const handleDelete = async (id) => {

    await removeUser(id)
    dispatch(deleteUser(id))

    toast.warn('User deleted', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: null,
      theme: "light",

    });

    navigate('/')
  }


  return (
    <div className='container w-50 mt-5 shadow-lg  table-responsive-sm'>
      <h6 className='text-center mt-4 p-4 text-success'>CRUD Using Redux</h6>
      <Adduser updateData={setAddUpdate}></Adduser>
      <Table className='table table-hover mt-3' size="sm">
        <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users &&
              users.length > 0 ?
              users.map((i, index) => (
                <tr className='text-center'>
                  <td>{index + 1}</td>
                  <td>{i?.name}</td>
                  <td>{i?.email}</td>
                  <td>{i?.age}</td>
                  <td className='text-center'>
                    <Link to={`/edit/${i._id}`}><Button className='btn btn-sm btn-success'>Edit</Button></Link>
                    <Button onClick={() => handleDelete(i._id)} className='btn btn-sm btn-danger ms-3'>Delete</Button>
                  </td>
                </tr>

              )) : <h6>No users</h6>
          }

        </tbody>

      </Table>

    </div>
  )
}

export default Userlist