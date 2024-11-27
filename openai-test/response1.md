这是一个简例，如何在 React 中创建表格组件。这个组件需要一个名为 "data" 的属性，它应该是一个对象数组，每个对象代表一行。

```jsx
import React from 'react'

class Table extends React.Component {
  render() {
    const { data } = this.props

    return (
      <table>
        <thead>
          <tr>
            {
              /* Assuming each row object has the same structure 
                we can extract headers from the first item */
              Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {data.map((row, indexRow) => (
            <tr key={indexRow}>
              {Object.values(row).map((cell, indexCell) => (
                <td key={indexCell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Table
```

要使用这个表格组件，只需要提供适当的数组作为 "data" 属性即可。如：

```jsx
import Table from './Table'

const data = [
  { name: 'John Doe', age: 35, occupation: 'Engineer' },
  { name: 'Jane Doe', age: 32, occupation: 'Doctor' },
  // More objects...
]

function App() {
  return <Table data={data} />
}
```

这个组件目前非常基本，并没有包含任何样式或错误处理。您可能需要进一步开发，以适应具体的用例。
