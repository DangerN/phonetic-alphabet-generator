import React from 'react';
import Table from 'react-bootstrap/Table'

export default props => {
  const { char, NATO, generated } = props.alphabet
  const tableBody = () => {
    return char.map((letter, index)=>{
      return (<tr key={letter}>
        <td>{letter}</td>
        <td>{NATO[index]}</td>
        <td>{generated[index] ? generated[index] : "Yeed"}</td>
      </tr>)
    })
  }
  return (
    <Table>
        <thead>
          <tr>
            <th>Letter</th>
            <th>Nato</th>
            <th>Generated</th>
          </tr>
        </thead>
        <tbody>
          { tableBody() }
        </tbody>
      </Table>
  )
}