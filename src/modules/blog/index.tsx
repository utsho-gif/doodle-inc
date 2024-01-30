/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const [commentData, setCommentData] = useState<any>(null);
  const { blogId } = useParams<{ blogId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!blogId) {
          console.error('Blog ID is undefined.');
          return;
        }

        const cachedComments = sessionStorage.getItem(`comments-${blogId}`);
        if (cachedComments) {
          setCommentData(JSON.parse(cachedComments));
          return;
        }

        const response = await fetch(
          `http://localhost:5000/comments/${blogId}`
        );
        if (!response.ok) {
          console.error(
            `Error fetching comment data. Status: ${response.status}`
          );
          return;
        }

        const result = await response.json();
        setCommentData(result);
        sessionStorage.setItem(`comments-${blogId}`, JSON.stringify(result));
      } catch (error) {
        console.error('Error fetching comment data:', error);
      }
    };

    fetchData();
  }, [blogId]);
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
        {commentData ? (
          <div>
            <h2>{commentData?.blog?.title}</h2>
            <p>{commentData?.blog?.body}</p>

            <Card>
              <Card.Header>Comments</Card.Header>
              <ListGroup variant="flush">
                {commentData?.comments?.length ? (
                  commentData?.comments.map((comment) => (
                    <ListGroupItem key={comment?.id}>
                      <strong>{comment?.name}</strong>: {comment.body}
                    </ListGroupItem>
                  ))
                ) : (
                  <p className="ms-3">No Comments Available</p>
                )}
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
