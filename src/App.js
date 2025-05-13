
import React, { useCallback, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Container, Row, Col } from 'reactstrap';

import './App.css';

function App() {
    const BASE_URL = 'https://picsum.photos/v2/list?page=2&limit=100';

    const [photos, setPhotos] = useState([]);

    const getPhotos = useCallback(async () => {

        const response = await fetch(BASE_URL);
        const data = await response.json();
        setPhotos((prevState) => [...prevState, ...data]);
    }, [setPhotos]);
    const getOlderPhotos = useCallback(async () => {

        const response = await fetch(BASE_URL);
        const data = await response.json();
        setPhotos((prevState) => [...data, ...prevState]);

    }, [setPhotos]);

    useEffect(() => {
        getPhotos().catch(console.error);
    }, [getPhotos]);

    return (
        <Container fluid className="d-flex flex-column align-items-center vh-100">

            <Row className="w-100">
                <Col>
                    <h1 className="text-center mb-2">React Infinite Scroll Virtuoso</h1>
                </Col>
            </Row>



            <Row style={{ width: '60%' }} className="justify-content-center">
                <Col xs={12} className="p-0">
                    <div
                        style={{
                            height: '60vh',
                            width: '100%',
                            overflow: 'auto',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                        }}
                    >
                        <Virtuoso
                            data={photos}
                            endReached={getPhotos}
                            startReached={getOlderPhotos}
                            overscan={5}
                            itemContent={(index, photo) => (
                                <img
                                    key={index}
                                    src={photo.download_url}
                                    alt={`Photo ${index}`}
                                    style={{
                                        width: '100%',
                                        marginBottom: '10px',
                                        borderRadius: '8px',
                                    }}
                                />
                            )}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
