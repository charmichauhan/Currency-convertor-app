import React, { Component } from 'react';
import axios from 'axios';
import { css } from "emotion";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col } from 'reactstrap';

const styles = {
    button1: {
        backgroundColor: "#0062cc", borderColor: "#0062cc",
        "&:hover": { backgroundColor: "#0062cc", borderColor: "#0062cc" }
    },
    button2: {
        backgroundColor: "#fd7e14", borderColor: "#fd7e14",
        "&:hover": { backgroundColor: "#fd7e14", borderColor: "#fd7e14" }
    },
    button3: {
        backgroundColor: "#ffc107", borderColor: "#ffc107",
        "&:hover": { backgroundColor: "#ffc107", borderColor: "#ffc107" }
    },
    button4: { borderRadius: 15, margin: 10 }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            unit: "",
            products: [
                { name: "Product1", number: 1, price: 10.00 },
                { name: "Product2", number: 2, price: 20.00 },
                { name: "Product3", number: 3, price: 30.00 },
                { name: "Product4", number: 1, price: 40.50 }
            ],
            totalNumber: 0,
            totalPrice: 0.00,
            rate: 0.00,
            rates: []
        }
    }
    componentDidMount() {
        const { products } = this.state;
        localStorage.setItem("products", JSON.stringify(products));
        this.getTotalNumber();
        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            totalPrice += products[i].price * products[i].number;
        }
        this.setState({ totalPrice, products });
        axios.get("https://open.exchangerate-api.com/v6/latest")
            .then(response => {
                this.setState({ rates: Object.keys(response.data.rates) });
            });
    }
    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }
    increment(index) {
        const { products, totalPrice } = this.state;
        products[index].number = products[index].number + 1;
        const total = totalPrice + (products[index].price * 1);
        this.getTotalNumber();
        this.setState({ products, totalPrice: total });
    };
    decrement(index) {
        const { products, totalPrice } = this.state;
        if (products[index].number > 1) {
            products[index].number = products[index].number - 1;
            this.getTotalNumber();
            let total = totalPrice - (products[index].price * 1);
            this.setState({ products, totalPrice: total });
        }
    };
    reset() {
        const products = JSON.parse(localStorage.getItem("products"));
        let totalNumber = 0;
        for (var i = 0; i < products.length; i++) {
            totalNumber += products[i].number;
        }
        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            totalPrice += products[i].price * products[i].number;
        }
        this.setState({ totalPrice, products, totalNumber, rate: 0.00 });
    };
    convertHandler = () => {
        if (this.state.unit !== "USD") {
            axios.get(`https://open.exchangerate-api.com/v6/latest?symbols=${this.state.unit}`)
                .then(response => {
                    const result = this.state.totalPrice * response.data.rates[this.state.unit];
                    this.setState({ rate: result.toFixed(2) });
                })
                .catch(error => {
                    console.log("Error", error.message);
                });
        } else {
            alert("Cannot convert the same currency");
        }
    };
    getTotalNumber() {
        const { products } = this.state;
        let totalNumber = 0;
        for (var i = 0; i < products.length; i++) {
            totalNumber += products[i].number;
        }
        this.setState({ totalNumber });
    }
    render() {
        const { dropdownOpen, products, rate, totalPrice, totalNumber, rates, unit } = this.state;
        return (
            <div style={{ backgroundColor: "lightgrey", height: "100vh" }}>
                <Col>
                    <div style={{ paddingLeft: 1450 }}>
                        <Button
                            onClick={() => { this.props.history.push('/'); localStorage.removeItem("user"); localStorage.removeItem("products") }}
                            className={css(styles.button2, styles.button4)}

                        >Log out</Button>
                    </div>
                    <Row style={{ backgroundColor: "darkgrey", height: 50, color: "white", arginTop: 50 }}>
                        <div style={{ margin: 10 }}>{totalNumber}</div>
                    </Row>
                </Col>
                <Button className={css(styles.button1, styles.button4)} onClick={() => this.reset()}>Reset</Button>
                <Container style={{ marginLeft: 10 }}>
                    {products.map((product, index) => {
                        return (
                            <Row style={{ display: "flex", margin: 10 }} key={index}>
                                <Col
                                    xs="1"
                                    style={{ marginLeft: 5, marginRight: 5, backgroundColor: "darkgrey", paddingTop: 5, color: "white" }}
                                >{product.name}</Col>
                                <Col
                                    xs="1"
                                    style={{ marginLeft: 5, marginRight: 5, textAlign: "center", paddingTop: 5, color: "white" }}
                                    className={css(styles.button2)}
                                >{product.number}</Col>
                                <Col xs="1"
                                    className={css(styles.button3)}
                                    style={{ marginLeft: 5, marginRight: 5, textAlign: "center", paddingTop: 5, color: "white" }}
                                >{product.price}</Col>
                                <Col xs="1">
                                    <Button
                                        className={css(styles.button1)} style={{ textAlign: "center", paddingTop: 5, color: "white" }}
                                        onClick={() => this.increment(index)}
                                    >+</Button>
                                </Col>
                                <Col xs="1">
                                    <Button className={css(styles.button1)}
                                        style={{ marginLeft: -35, textAlign: "center", paddingTop: 5, color: "white" }}
                                        onClick={() => this.decrement(index)}
                                    >-</Button>
                                </Col>
                            </Row>
                        )
                    })}
                </Container>
                <Row style={{ display: "flex", marginTop: 100, marginLeft: 40 }}>
                    <Col xs="1" style={{ backgroundColor: "darkgrey", textAlign: "center", paddingTop: 5, color: "white" }}>{totalPrice}</Col>
                    <Col xs="1"><Button>USD</Button></Col>
                    <Col xs="1">
                        <Button
                            className={css(styles.button1)}
                            style={{ marginLeft: -50 }}
                            onClick={() => this.convertHandler()}
                            disabled={!unit}
                        >Convert</Button>
                    </Col>
                    <Col xs="1"><Button className={css(styles.button1)} style={{ marginLeft: -80 }}>{rate}</Button></Col>
                    <Dropdown isOpen={dropdownOpen} toggle={() => this.toggle()} style={{ marginLeft: -80 }}>
                        <DropdownToggle caret>{unit ? unit : "Select unit"}</DropdownToggle>
                        <DropdownMenu
                            modifiers={{
                                setMaxHeight: {
                                    enabled: true,
                                    order: 890,
                                    fn: (data) => {
                                        return {
                                            ...data,
                                            styles: { ...data.styles, overflow: 'auto', maxHeight: '100px' },
                                        };
                                    },
                                },
                            }}
                        >
                            {rates.map((a, i) => {
                                return <DropdownItem key={i} onClick={() => this.setState({ unit: a })}>{a}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Row>
                <div style={{ marginLeft: "15%" }}>
                    <Button
                        style={{ backgroundColor: "#28a745", borderColor: "#28a745", margin: 25 }}
                        onClick={() => this.props.history.push("/rate")}
                    >Currency rate</Button>
                </div>
            </div>
        );
    }
}

export default Dashboard;
