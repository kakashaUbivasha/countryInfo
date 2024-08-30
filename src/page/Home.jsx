import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Alert, Form, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
function Home() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const sortedCountries = response.data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedCountries);
                setFilteredCountries(sortedCountries);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to load countries. Please try again later.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const results = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(results);
    }, [searchTerm, countries]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={() => window.location.reload()}>Try Again</Button>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="text-center mt-5">LIST OF COUNTRIES</h1>
            <Form className="mt-4 mb-4">
                <Form.Group controlId="searchCountry">
                    <Form.Control
                        type="text"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form.Group>
            </Form>
            <Row className="g-4">
                {filteredCountries.map((item) => (
                    <Col key={item.cca3} sm={12} md={6} lg={4}>
                        <Card style={{background: '#fceed8'}}>
                            <Card.Body>
                                <Card.Title>{item.name.common}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Capital: {item.capital ? item.capital[0] : 'N/A'}
                                </Card.Subtitle>
                                <Card.Img
                                    variant="top"
                                    src={item.flags.png}
                                    alt={`Flag of ${item.name.common}`}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <Link to={`/item/${item.ccn3}`}>
                                    <Button variant="primary" className="mt-3">
                                        Read more
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;