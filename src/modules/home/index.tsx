import { Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { FetchData } from '../../config/reactQuery';
import { Link } from 'react-router-dom';

interface IBlogData {
  id: number;
  title: string;
  body: string;
}

const Home = () => {
  const blogData = FetchData({
    url: '/blogs',
    key: 'blog',
  });

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Doodle Inc</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {blogData?.data?.length ? (
        <Container className="mt-4">
          <Row>
            {blogData.data.map((blog: IBlogData) => (
              <Col md={4} key={blog.id} className="mb-4">
                <Card
                  as={Link}
                  to={`blog/${blog.id}`}
                  bg={'white'}
                  className="equal-height-card text-decoration-none card-hover-effect"
                >
                  <Card.Header>{blog.title}</Card.Header>
                  <Card.Body>
                    <Card.Text>{blog.body}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        []
      )}
    </div>
  );
};

export default Home;
