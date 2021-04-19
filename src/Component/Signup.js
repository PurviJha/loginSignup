import React, { useState } from "react"
import { Card, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
    //constan
    const history = useHistory()


    //state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //function
    const handleChange = (e) => {
        const input = {
            name: (val) => setName(val),
            email: (val) => setEmail(val),
            password: (val) => setPassword(val),
        }

        input[e.target.name](e.target.value)
    }



    const getRegister = () => {
        if (name !== "" && email !== "" && password !== "") {
            let local = JSON.parse(localStorage.getItem("Signup")) ?? []
            local.push({
                name: name,
                email: email,
                password: password
            })
            localStorage.setItem("Signup", JSON.stringify(local))
            history.push("/")
        } else {
            alert("All fields are required")
        }
    }


    return (
        <div className="page">
            <Card className="cards">
                <CardTitle tag="h5" className="cardTitle">Sign Up</CardTitle>
                <CardBody>

                    <Form className="form">
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input type="email" name="name" value={name} onChange={handleChange} placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Password</Label>
                            <Input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
                        </FormGroup>

                        <div className="d-flex justify-content-center  ">
                            <Button onClick={getRegister} color="primary">Sign Up</Button>
                        </div>
                        <div className="d-flex justify-content-center  ">
                            <Link to="/">
                                <p>Already have a account? please Login</p>
                            </Link>
                        </div>
                    </Form>
                </CardBody>


            </Card>

        </div>
    )
}