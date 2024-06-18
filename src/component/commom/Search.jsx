import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/search.css';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <Container className="search-container">
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Button variant="link" className="p-0">
              <i className="bi bi-arrow-left"></i>
            </Button>
          </Col>
          <Col>
            <Form className="d-flex" onSubmit={handleSearch}>
                
              <Form.Control
                type="search"
                placeholder="검색어를 입력해주세요"
                className="me-2 search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Search;