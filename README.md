# memo-bind
Memoized binding of functions to arguments. Very useful for React and Preact!

You can use memo-bind to prevent allocating a new function on each render when all you want to do is bind a value as an argument to a function. The standard way to avoid this is  to break out a child component and bind the value to that instead, but sometimes that is a bit cumbersome. By using memo-bind you can avoid having to refactor too much, while also avoiding unnecessary function allocations and unnecessary renders.

## Installation
`npm i memo-bind`

## Example Usage
`memoBind(cache, fn, ...argumentsToBind)`

memo-bind does not initiate its own cache. This makes it easier for the user to control the lifecycle of the cache, destroying it, clearing it, or replacing it whenever and however they want.
*You must provide a ES6 Map as the cache for memo-bind.*

## Example usage with React / Preact
```
import {bind, partial} from 'memo-bind'

class MyUserList extends Component {

  state = {
    items: [
      {name: "item 1", id: 1},
      {name: "item 2", id: 2}
    ]
  }

  // This is a function that needs this and an argument bound to it
  deleteItem(id) {
    let {items} = this.state
    let deletionIndex = items.findIndex(item => item.id === id)
    if (deletionIndex > -1) {
      this.setState({items: items.splice(deletionIndex, 1)})
    }
  }

  // This is a function that only needs an argument bound, but not the thisArg
  capitalize = item => {
    let {items} = this.state
    let itemIndex = items.findIndex(x => x.id === item.id)
    if (itemIndex > -1) {
      item.name = item.name.toUpperCase()
      this.setState({items: items.splice(itemIndex, 1, item)})
    }
  }

  // If you declare the cache as a property of the component then
  // its lifecycle will match that of the component and you 
  // shouldn't have to worry too much about cleanup or unbounded
  // cache sizes
  fnCache = new Map()

  render() {
    let {items} =  this.state

    return (
      <div class="container">
        {items.map(item => (
          <div class="item">
            {item.name}
            <button onClick={partial(this.capitalizeName, item)}>
              Capitalize
            </button>
            <button onClick={bind(this.fnCache, this.deleteItem, this, item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    )
  }
}
```
