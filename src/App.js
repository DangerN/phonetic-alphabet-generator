import React, { useState } from 'react'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'

import AlphaTable from './components/AlphaTable'
import {Alphabet} from './constants.js'


export default () => {
  const [wordOptions, setWordOptions] = useState()
  const [input, setInput] = useState("")
  const handleGenerate = () => {
  }
  const handleInputChange = event => {
    setInput(event.target.value)
  }
  return (
    <div className="App" >
      <Container>
        <Row>
          <Col md={6}>
            <AlphaTable alphabet={Alphabet} />
          </Col>
          <Col>
            <Form>
              <Form.Control
                onChange={handleInputChange}
                value={input}
              />
            </Form>
            <Button
              onClick={handleGenerate}
              varient="primary"
              size="lg">
              Generate
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
