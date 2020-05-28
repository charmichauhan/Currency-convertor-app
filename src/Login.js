import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input, Label, FormGroup, Col, Card, CardBody } from "reactstrap";

class Login extends React.Component {
    state = {
        redirect: false,
        email: "",
        password: "",
        user: {},
        users: []
    }
    componentDidMount() {
        const users = JSON.parse(localStorage.getItem("users"));
        this.setState({ users });
    }
    setRedirect = () => {
        this.setState({ redirect: true });
    }
    redirectToRegister = () => {
        if (this.state.redirect) {
            return <Redirect to='/signup' />
        } else return
    }
    redirectToDashboard = () => {
        const { email, password, users } = this.state;
        if (users) {
            let arr = [], count = 0;
            users.map(user => {
                if (user.email === email && user.password === password && password !== "" && email !== "") {
                    localStorage.setItem("user", JSON.stringify({ name: user.name, email, password, phoneNumber: user.phoneNumber }))
                    this.props.history.push('/dashboard');
                    arr.push(true);
                    count = count + 1;
                }
            })
            if (count === 0) {
                alert("Invalid credentials. Please register.");
            }
            this.setState({ user: { email, password } });
        }
    }
    onChange = (e, key) => {
        this.setState({ [key]: e.target.value });
    }

    render() {
        const { redirect, email, password } = this.state;
        return (
            <Card body className="text-center" style={{ marginLeft: "25%", marginRight: "25%", marginTop: "5%", height: "500px" }}>
                <CardBody>
                    <div style={{ margin: 10 }}>
                        {!redirect ?
                            <div>
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
                                <Button onClick={this.redirectToDashboard}>Login</Button>
                                <br /><br />
                                <p>Not registered? Click here <Button onClick={this.setRedirect}>Register</Button></p>
                            </div>
                            :
                            this.redirectToRegister()}
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default Login;
