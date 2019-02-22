import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid";
import Card from "../../components/Card";

class Lab extends Component {
    
    render() {
        
            return (
                <Container>
                    <Row>
                        <Col size="md-12">
                            <Card title="Quality">
                                <h3> {this.props.username} : Lab Department</h3>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
    }
}

export default Lab;
