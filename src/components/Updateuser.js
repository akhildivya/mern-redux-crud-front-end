import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { modifyUser } from '../redux/userSlice';
import { editUser } from '../service/allapis';
import { Col, Row } from 'react-bootstrap';

function Updateuser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [namevalid, setUnameValid] = useState(false)
    const [emailvalid, setEmailValid] = useState(false)
    const [agevalid, setAgeValid] = useState(false)

    const { _id } = useParams()
    const users = useSelector(state => state.users.users)
    const userone = users.find(u => u._id == _id)

    // console.log(users);

    const [User, setUser] = useState({
        name: userone.name,
        email: userone.email,
        age: userone.age
    })

    const setData = (e) => {
        const { name, value } = e.target
        if (name == 'name') {
            if (value.match(/^[a-zA-Z .]+$/)) {
                setUnameValid(false)
            }
            else {
                setUnameValid(true)
            }
        }
        if (name == 'email') {
            if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                setEmailValid(false)
            }
            else {
                setEmailValid(true)
            }
        }
        if (name == 'age') {
            if (value.match(/^[0-9.]+$/)) {
                setAgeValid(false)
            }
            else {
                setAgeValid(true)
            }
        }
        setUser({ ...User, [name]: value })
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        const { name, email, age } = User
        if (!name || !email || !age) {
            alert("All inputs required")
        }
        else {
            const userId = userone._id
            const result = await editUser(User, userId)
            dispatch(modifyUser({ userId, name, email, age }));
            if (result.status == 200) {

                toast.success(`${result.data}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                setUser({
                    ...User, name: "", email: "",
                    age: ""
                })
                navigate('/')

            }
            else {

                toast.error(`${result.response.data}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
            }

        }
    }


    return (
        <div className='container w-50 mt-5 mb-5 p-5 shadow-lg'>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>Back to home </Link>

                   <>
                        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                            <Form.Control value={User.name} onChange={(e) => setData(e)} name="name" />
                        </FloatingLabel>
                        {namevalid  && <p className='text-danger p-1'>Invalid name format</p>}

                   </>


                   <>
                        <FloatingLabel controlId="floatingEmailid" label="Emailid" className='mb-3'>
                            <Form.Control value={User.email} onChange={(e) => setData(e)} name="email" type="text" />
                        </FloatingLabel>
                        {emailvalid && <p className='text-danger p-1'>Invalid email format</p>}

                   </>


                   <>
                        <FloatingLabel controlId="floatingage" label="Age">
                            <Form.Control value={User.age} onChange={(e) => setData(e)} name="age" />
                        </FloatingLabel>
                        { agevalid && <p className='text-danger p-1'>Invalid age</p>}
                   </>

                    <Button className='tett-center mt-2' variant="primary" onClick={(e) => handleUpdate(e)} >
                        Update
                    </Button>
                </Col>
            </Row>





        </div>
    )
}

export default Updateuser