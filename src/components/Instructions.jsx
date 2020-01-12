import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default () => {
  return (
    <Jumbotron className="mt-2" >
      <h2>Phonetic Alphabet Generator</h2>
      <p>A phonetic alphabet is a series of words that represent each letter of the alphabet. Phonetic alphabets are used primarily for radio communication and sounding cool. The words are chosen deliberately to sound distinctly different from the others.</p>
      <p>This generator takes a word and uses the Datamuse lexical API to find words that are associated to the one provided. It occasionally comes up with some strange results!</p>
      <p>To start, simply type in a word and hit generate.</p>
    </Jumbotron>
  )
}
