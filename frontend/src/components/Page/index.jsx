/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from 'react-bootstrap';
import Card from '../Card';

function Page({ title, children }) {
  return (
    <Container className="mt-4">
      <Card title={title}>
        {children}
      </Card>
    </Container>
  );
}

export default Page;
