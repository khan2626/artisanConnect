import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export default function Login() {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Control placeholder="Email" />
        </Col>
        <Col>
          <Form.Control placeholder="Password" />
        </Col>
      </Row>
    </Form>
  );
}
