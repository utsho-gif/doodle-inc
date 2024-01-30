import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FetchData } from '../../config/reactQuery';

const Blog = () => {
  const { blogId } = useParams();

  const commentData = FetchData({
    url: `/comments/${blogId}`,
    key: 'comment',
    dependency: true,
    dependencyValue: blogId,
  });
  console.log({ commentData });
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
      <Container className="mt-4">
        {commentData?.data?.comments?.length ? (
          <div>
            <h2>{commentData?.data?.blog.title}</h2>
            <p>{commentData?.data?.blog.body}</p>

            <Card>
              <Card.Header>Comments</Card.Header>
              <ListGroup variant="flush">
                {commentData?.data?.comments.map((comment) => (
                  <ListGroupItem key={comment?.id}>
                    <strong>{comment?.name}</strong>: {comment.body}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card>
          </div>
        ) : (
          []
        )}
      </Container>
    </div>
  );
};

export default Blog;
