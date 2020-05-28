import React from 'react';
import { Button, Input, FormGroup, Label, Col, CardBody, Card } from "reactstrap";

class SignUp extends React.Component {
    state = {
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        users: [],
        errors: []
    }
    submit = () => {
        const savedUsers = JSON.parse(localStorage.getItem("users"));
        const { users, name, phoneNumber, email, password } = this.state;
        users.push({ name, email, phoneNumber, password });
        savedUsers.push({ name, email, phoneNumber, password });
        localStorage.setItem("users", JSON.stringify(savedUsers));
        alert("Registered successfully. Please login");
        this.props.history.push('/');
    }
    onChange = (e, key) => {
        this.setState({ [key]: e.target.value });
    }
    handleValidation = () => {
        let { errors, name, password, email, phoneNumber } = this.state;
        errors = [];
        if (!name) {
            errors.push("Name cannot be empty");
        }
        if (!((/^[a-zA-Z]+$/).test(name))) {
            errors.push("Name can be only letters");
        }
        if (!email) {
            errors.push("Email cannot be empty");
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
            errors.push("Please enter a valid email address");
        }
        if (!password) {
            errors.push("Password cannot be empty");
        }
        if (!((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/).test(password))) {
            errors.push("Passwords must be at least 6 characters long, contain at least one capital and lowercase letter, and special character.");
        }
        if (!phoneNumber) {
            errors.push("Phone Number cannot be empty");
        }
        if (!((/^\d{10}$/).test(phoneNumber))) {
            errors.push("Please enter 10 digit number");
        }
        this.setState({ errors });
        if (errors.length === 0) {
            this.submit();
        }
    }

    render() {
        const { name, email, password, phoneNumber, errors } = this.state;
        return (
            <Card body className="text-center" style={{ marginLeft: "25%", marginRight: "25%", marginTop: "5%", height: "500px" }}>
                <CardBody>
                    <div style={{ margin: 10 }}>
                        <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input value={name} name="name" onChange={(e) => this.onChange(e, 'name')} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Phone Number</Label>
                            <Col sm={10}>
                                <Input value={phoneNumber} name="PhoneNumber" onChange={(e) => this.onChange(e, 'phoneNumber')} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input value={email} name="email" onChange={(e) => this.onChange(e, 'email')} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input value={password} name="password" type="password" onChange={(e) => this.onChange(e, 'password')} />
                            </Col>
                        </FormGroup>
                        {errors.length > 0 && errors.map((err, i) => {
                            return <span key={i} style={{ color: "red", display: "block" }}>{err}</span>
                        })}
                        <Button onClick={this.handleValidation}>Register</Button>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default SignUp;
