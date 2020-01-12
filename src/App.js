import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import AlphaTable from './components/AlphaTable'
import Instructions from './components/Instructions'
import GenerateForm from './components/GenerateForm'
import { useWordOptions, useGeneratedWord, useCharLock } from './resources/useHooks'
import {alphabet} from './resources/constants.js'

export default () => {
  const [wordOptions, wordDispatch] = useWordOptions()
  const [generated, genDispatch] = useGeneratedWord()
  const [charLocked, setCharLocked] = useCharLock(alphabet.charLock)

  return (
    <div className="App" >
      <Container >
        <Row>
          <Instructions />
          </Row>
          <Row style={{position: 'sticky', top: '0'}}>
          <GenerateForm
            alphabet={alphabet}
            wordOptions={wordOptions}
            wordDispatch={wordDispatch}
            generated={generated}
            genDispatch={genDispatch}
            charLocked={charLocked}
          />
        </Row>
        <small
          className='form-text text-muted'
        >
          Try somehing like 'meadow' or 'ghoul'.
        </small>
        <Row >
          <AlphaTable
            alphabet={alphabet}
            generated={generated}
            wordOptions={wordOptions}
            dispatch={genDispatch}
            charLocked={charLocked}
            setCharLocked={setCharLocked}
          />
        </Row>
      </Container>
    </div>
  )
}
