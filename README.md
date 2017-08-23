# memo-bind
Memoized binding of functions to arguments. Very useful for React and Preact!

You can use memo-bind to prevent allocating a new function on each render when all you want to do is bind a value as an argument to a function. The standard way to avoid this is  to break out a child component and bind the value to that instead, but sometimes that is a bit cumbersome. By using memo-bind you can avoid having to refactor too much, while also avoiding unnecessary function allocations and unnecessary renders.

## Example Usage
`memoBind(cache, fn, ...argumentsToBind)`

memo-bind does not initiate its own cache. This makes it easier for the user to control the lifecycle of the cache, destroying it, clearing it, or replacing it whenever and however they want.
*You must provide a ES6 Map as the cache for memo-bind.*

## Example usage with React / Preact
```
import memoBind from 'memo-bind'

class MyUserList extends Component {

  state = {
    items: [
      {name: "item 1", id: 1},
      {name: "item 2", id: 2}
    ]
  }

  // This is the function that needs an argument bound to it
  deleteItem(id) {
    let {items} = this.state
    let deletionIndex = items.findIndex(item => item.id === id)
    if (deletionIndex > -1) {
      this.setState({items: items.splice(deletionIndex, 1)})
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
        {items.map(x => (
          <div class="item">
            {item.name}
            <button onClick={memoBind(this.fnCache, this.deleteItem, item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    )
  }
```
