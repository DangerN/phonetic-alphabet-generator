import React, { useState, useReducer } from 'react'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import axios from 'axios'

import AlphaTable from './components/AlphaTable'
import {alphabet} from './constants.js'

export default () => {
  const wordOptions = {}
  const [input, setInput] = useState("")
  const reducer = (state, action) => {
    newState[action.index] = action.word
    return newState
  }
  const [generated, dispatch] = useReducer(reducer, [""])
  const handleGenerate = event => {
    console.log(dispatch);
    console.log(generated);
    event.preventDefault()
    alphabet.char.map((letter, index) =>{
      axios.get(`http://api.datamuse.com/words/?sp=${letter}*&topics=${input}`).then(res=>{
        wordOptions[letter] = res.data
        alphabet.generated[index] = res.data[0].word
        dispatch({word: res.data[0].word, index: index})
      })
    })
  }
  const handleInputChange = event => {
    setInput(event.target.value)
  }
  console.log('render');
  return (
    <div className="App" >
      <Container>
        <Row>
          <Col md={6}>
            <AlphaTable alphabet={alphabet} generated={generated} />
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
