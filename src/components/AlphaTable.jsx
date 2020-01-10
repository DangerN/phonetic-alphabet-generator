import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FaDiceD6, FaLock, FaLockOpen } from 'react-icons/fa'

export default props => {
  const { char, NATO } = props.alphabet

  const lockButton = (locked, index) => {
    return locked ?
      <Button variant='link' onClick={()=>props.setCharLocked(false, index)}><FaLock /></Button> :
      <Button variant='link' onClick={()=>props.setCharLocked(true, index)}><FaLockOpen /></Button>
  }

  const generatedWord = (letter, index) => {
    props.generated[index].length <= 2 && rerollWord(letter, index)
    return (
      <div>
        <Button variant='link' onClick={()=>rerollWord(letter, index)}><FaDiceD6/></Button>
        {props.generated[index].replace(/^\w/, c=>c.toUpperCase())}
        {lockButton(props.charLocked[index], index)}
      </div>
    )
  }

  const rerollWord = (letter, index) => {
    !props.charLocked[index] &&
    props.dispatch({word: props.wordOptions[letter][Math.floor(Math.random() * 75)].word, index: index})
  }

  const tableBody = () => {
    return char.map((letter, index)=>{
      return (<tr key={letter}>
        <td>{letter}</td>
        <td>{NATO[index]}</td>
        <td>{props.generated[index] ? generatedWord(letter, index) : null}</td>
      </tr>)
    })
  }

  return (
    <Table>
        <thead>
          <tr>
            <th>Letter</th>
            <th>NATO</th>
            <th>Generated</th>
          </tr>
        </thead>
        <tbody>
          { tableBody() }
        </tbody>
      </Table>
  )
}
