import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { addUsers, getallUsers } from '../service/allapis';
import { addUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Adduser({updateData}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [namevalid,setUnameValid]=useState(false)
    const [emailvalid,setEmailValid]=useState(false)
    const [agevalid,setAgeValid]=useState(false)

    const [user,setUser]=useState({
        name:"",
        email:"",
        age:""
    })
    const getData=(e)=>
    {
        const {name,value}=e.target
        if (name == 'name') 
        {
                if(value.match(/^[a-zA-Z .]+$/))
                {
                    setUnameValid(false)
                }
                else{
                    setUnameValid(true)
                }
        }
        if (name == 'email') 
            {
                if(value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
                {
                    setEmailValid(false)
                }
                else{
                    setEmailValid(true)
                }
            }
            if (name == 'age') 
                {
                    if(value.match(/^[0-9.]+$/))
                    {
                        setAgeValid(false)
                    }
                    else{
                        setAgeValid(true)
                    }
                }
        setUser({...user,[name]:value})
    }
    const handleAdd=async(e)=>{
        e.preventDefault()
        const {name,email,age}=user
        if(!name || !email || !age)
        {
            toast.warn('All fields are required', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }
        else
        {
            const result=await addUsers(user)
            dispatch(addUser(result.data));
            if(result.status==200)
            {
                toast.success(`${result.data}`, {
                    
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    
                    });
                    getallUsers();
                    updateData(result.data)
                    setUser({
                        ...user, name: "", email: "",
                        age: ""
                    })
                    navigate('/')
            }
            else
            {
                toast.error(`${result.response.data}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                    });
                    setUser({
                        ...user, name: "", email: "",
                        age: ""
                    })
            }
            handleClose()
        }
    }
   // console.log(user);
    
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <FloatingLabel controlId="floatingname" label="Name" className='mb-3'>
                            <Form.Control name="name" onChange={(e)=>getData(e)} type="text" placeholder="enter name" />
                        </FloatingLabel>
                       {namevalid  && <p className='text-danger p-1'>Invalid name format</p>}
                     </>

                    <>
                        <FloatingLabel controlId="floatingEmailid" label="Email address" className='mb-3'>
                            <Form.Control name="email" onChange={(e)=>getData(e)} type="text" placeholder="Email address" />
                        </FloatingLabel>
                        {emailvalid && <p className='text-danger p-1'>Invalid email format</p>}
                    </>

                   <>
                        <FloatingLabel controlId="floatingage" label="Age">
                            <Form.Control name="age" onChange={(e)=>getData(e)} type="number" placeholder="age" />
                        </FloatingLabel>
                        { agevalid && <p className='text-danger p-1'>Invalid age</p>}
                   </>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e)=>handleAdd(e)}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )
}

export default Adduser