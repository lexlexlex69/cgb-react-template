import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={8}>Powered by <a href="https://systems.butuan.gov.ph" target="_blank" rel="noopener noreferrer">City Information and Communications Technology Office</a>. All rights reserved.</Col>
            <Col md={4}>
              <div className="text-sm-end d-none d-sm-block">
                <b>Version</b> 3.0.1
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
