import React, { useState } from 'react'
import { Container, Col, Row, Button, Form, Jumbotron, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { FaDiceD6, FaRegClipboard } from 'react-icons/fa'

import AlphaTable from './components/AlphaTable'
import { useWordOptions, useGeneratedWord, useCharLock } from './resources/useHooks'
import {alphabet} from './resources/constants.js'

export default () => {
  const [wordOptions, wordDispatch] = useWordOptions()
  const [generated, genDispatch] = useGeneratedWord()
  const [input, setInput] = useState("")
  const [randomVis, setRandomVis] = useState(false)
  const [charLocked, setCharLocked] = useCharLock(alphabet.charLock)

  const handleGenerate = event => {
    event.preventDefault()
    alphabet.char.map((letter, index) =>{
      axios.get(`http://api.datamuse.com/words/?sp=${letter}*&topics=${input}`).then(res=>{
        wordDispatch({letter: letter, options: res.data})
        genDispatch({word: res.data[0].word, index: index})
      })
    })
  }

  const handleInputChange = event => {
    setInput(event.target.value)
  }

  const handleRandomize = () => {
    alphabet.char.map((letter, index) => {
      !charLocked[index] &&
      genDispatch({word: wordOptions[letter][Math.floor(Math.random() * 75)].word, index: index})
    })
  }

  const handleCopy = event => {
    const tArea = document.createElement('textarea')
    tArea.value = generated.map(word => word.replace(/^\w/, c=>c.toUpperCase()))
    tArea.style = {position: 'absolute', left: '-9999px'}
    document.body.appendChild(tArea)
    tArea.select()
    document.execCommand('copy')
    document.body.removeChild(tArea)
  }

  generated.length === 26 && !randomVis && setRandomVis(true)

  return (
    <div className="App" >
      <Container >
        <Row>
          <Jumbotron className="mt-2" >
            <h2>Phonetic Alphabet Generator</h2>
            <p>A phonetic alphabet is a series of words that represent each letter of the alphabet. Phonetic alphabets are used primarily for radio communication when clarity is of the utmost importance. The words are chosen deliberately to sound distinctly different from the others.</p>
            <p>This generator takes a word and generates an alphabet using the Datamuse lexical API to find words that are associated to the one provided. It occasionally comes up with some strange choices!</p>
            <p>To start, simply type in a word and hit generate.</p>
            </Jumbotron>
          </Row>
          <Row style={{position: 'sticky', top: '0'}}>
          <Form onSubmit={handleGenerate} >
            <Col md="8" >
              <InputGroup >
                <Form.Control
                onChange={handleInputChange}
                value={input}
                style={{minWidth: '100px'}}
                />
                <InputGroup.Append>
                  <Button
                  varient="primary"
                  type="submit">
                  Generate
                  </Button>
                </InputGroup.Append>
                <InputGroup.Append>
                  <Button className={randomVis ? 'visible' : 'invisible'} variant='secondary' onClick={handleRandomize}>
                    <FaDiceD6/>Randomize!
                  </Button>
                  <Button onClick={handleCopy} variant='outline-secondary' className={randomVis ? 'visible' : 'invisible'}>
                    <FaRegClipboard/>
                     copy
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form>
        </Row>
        <small className='form-text text-muted'>Try somehing like 'world' or 'ghoul'.</small>
        <Row >
          <AlphaTable alphabet={alphabet} generated={generated} wordOptions={wordOptions} dispatch={genDispatch} charLocked={charLocked} setCharLocked={setCharLocked}/>
        </Row>
      </Container>
    </div>
  )
}
