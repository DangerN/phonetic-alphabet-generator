import React from 'react';
import Table from 'react-bootstrap/Table'

export default props => {
  const { char, NATO } = props.alphabet
  const tableBody = () => {
    return char.map((letter, index)=>{
      return (<tr key={letter}>
        <td>{letter}</td>
        <td>{NATO[index]}</td>
        <td>{props.generated[index] ? props.generated[index].replace(/^\w/, c=>c.toUpperCase()) : null}</td>
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
