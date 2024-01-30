import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FetchData } from '../../config/reactQuery';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { blogId } = useParams();

  const commentData = FetchData({
    url: `/comment/${blogId}`,
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
    </div>
  );
};

export default Blog;
