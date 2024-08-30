import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Col, Card, Alert, Image, Button } from 'react-bootstrap';

function Item() {
    const { id } = useParams();
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
            .then(response => {
                setCountry(response.data[0]);
                setError(null);
            })
            .catch(error => {
                console.error(error);
                setError("Ошибка получения данных. Попробуйте ещё раз.");
            });
    }, [id]);

    function formatNumberWithSpaces(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={() => window.location.reload()}>Попробовать снова</Button>
            </Container>
        );
    }

    if (!country) {
        return (
            <Container className="mt-5">
                <Alert variant="info">Загрузка данных...</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <Image src={country.flags.png} alt={`Flag of ${country.name.common}`} fluid />
                        </Col>
                        <Col md={8}>
                            <Card.Title as="h2">{country.name.common}</Card.Title>
                            {country.name.official && <Card.Subtitle className="mb-2 text-muted">{country.name.official}</Card.Subtitle>}
                            <Card.Text>
                                <strong>Столица:</strong> {country.capital?.[0] || 'Н/Д'}<br />
                                <strong>Население:</strong> {formatNumberWithSpaces(country.population)}<br />
                                <strong>Регион:</strong> {country.region}<br />
                                <strong>Часовой пояс:</strong> {country.timezones[0]}
                            </Card.Text>
                            <Button variant="outline-primary" href={country.maps.googleMaps} target="_blank">
                                Открыть в Google Maps
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Item;