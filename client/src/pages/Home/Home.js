import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid";
import Card from "../../components/Card";

class Lab extends Component {
    
    render() {
        
            return (
                <Container>
                    <Row>
                        <Col size="md-12">
                            <Card title="About Us">
                                <h3> Kansas Dairy Ingredients is a world leader in manufacturing concentrated milk products. </h3>
                                <p>Kansas Dairy Ingredients is a world leader in the manufacturing and marketing of ultrafiltered concentrated milk products.  As an independent and privately owned company established in 2012, our mission begins with our drive to create quality products with innovative solutions. Our unique industry knowledge and expertise allows us to work with each of our customers individually to create customized dairy ingredients for their products. We believe the key to success begins with collaborative relationships with our customers and a shared passion for innovation.</p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
    }
}

export default Lab;
