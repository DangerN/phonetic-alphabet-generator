import React, { useState } from 'react'
import axios from 'axios'
import { FaDiceD6, FaRegClipboard } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'

export default props => {
  const { genDispatch, generated, wordDispatch, wordOptions, alphabet, charLocked } = props
  const [input, setInput] = useState("")
  const [randomVis, setRandomVis] = useState(false)
  const [apiAlert, setApiAlert] = useState(false)

  generated.length === 26 && !randomVis && setRandomVis(true)

  const handleInputChange = event => {
    setInput(event.target.value)
  }

  const handleRandomize = () => {
    alphabet.char.forEach((letter, index) => {
      !charLocked[index] &&
      genDispatch({word: wordOptions[letter][Math.floor(Math.random() * 75)].word, index: index})
    })
  }

  const handleCopy = event => {
    const tArea = document.createElement('textarea')
    tArea.value = generated.map(word => word.replace(/^\w/, c=>c.toUpperCase())).join(", ")
    tArea.style = {position: 'absolute', left: '-9999px'}
    document.body.appendChild(tArea)
    tArea.select()
    document.execCommand('copy')
    document.body.removeChild(tArea)
  }

  const handleGenerate = event => {
    event.preventDefault()
    alphabet.char.forEach((letter, index) =>{
      axios.get(`https://api.datamuse.com/words/?sp=${letter}*&topics=${input}`,).then(res=>{
        wordDispatch({letter: letter, options: res.data})
        genDispatch({word: res.data[0].word, index: index})
      }).catch(e=>{
        console.log(e)
        setApiAlert(true)
      })
    })
  }

  const apiFailAlert = () => {
    return (
      <Alert variant='danger'>
        There was a problem contacting Datamuse. The maximum daily allowed requests may have been exceeded. Try again tommorow. Open the console for details.
      </Alert>
    )
  }

  return (
    <Form onSubmit={handleGenerate} >
      { apiAlert ? apiFailAlert() : null}
      <InputGroup >
        <Form.Control
          onChange={handleInputChange}
          value={input}
          style={{minWidth: '100px'}}
        />
        <InputGroup.Append>
          <Button
            varient="primary"
            type="submit"
          >
            Generate
          </Button>
        </InputGroup.Append>
        <InputGroup.Append>
          <Button
            className={randomVis ? 'visible' : 'invisible'}
            variant='secondary'
            onClick={handleRandomize}
          >
            <FaDiceD6/>
            Randomize!
          </Button>
          <Button
            onClick={handleCopy}
            variant='outline-secondary'
            className={randomVis ? 'visible' : 'invisible'}
          >
            <FaRegClipboard/>
            copy
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}
