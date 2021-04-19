import React, { useState } from 'react'
import { Card, CardTitle, CardBody, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";

export default function Login() {
    //constant
    const history = useHistory()

    //state
    const [email, setEmail] = useState("purvijha@gmail.com")
    const [password, setPassword] = useState("123456")

    //function
    const handleChange = (e) => {
        const input = {
            email: (val) => setEmail(val),
            password: (val) => setPassword(val),
        }

        input[e.target.name](e.target.value)
    }

    const getAuthenticate = () => {
        if (email !== "" && password !== "") {
            let data = JSON.parse(localStorage.getItem("Signup")) ?? []
            let emailCheck = false
            let passwordCheck = false

            data.map((detail) => {

                if (detail.email === email || email === "purvijha@gmail.com") {
                    emailCheck = true
                    if (detail.password === password || password === "123456") {
                        history.push("/list")
                        passwordCheck = true
                    }
                }
                return null
            })
            if (!emailCheck) {
                alert("Email doest exist")
                console.log("Email doest exist")
            } else if (!passwordCheck) {
                console.log("Wrong Password")
                alert("Wrong Password")

            }
        } else {
            alert("all fields are required")

        }
    }

    return (
        <div className="page">
            <Card className="cards">
                <CardTitle tag="h5" className="cardTitle" >Log in</CardTitle>
                <CardBody>

                    <Form className="form">

                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Password</Label>
                            <Input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
                        </FormGroup>
                        <div className="d-flex justify-content-center  ">
                            <Button color="primary" onClick={getAuthenticate}>Login</Button>
                        </div>
                        <div className="d-flex justify-content-center  ">
                            <Link to="/signUp">  <p>Dont have a account? please SignUp</p>
                            </Link>
                        </div>
                    </Form>
                </CardBody>


            </Card>



        </div>
    )
}
