import { h, Component } from 'preact'
import style from './style'

import { partial, bind } from 'memo-bind'

export default class Example extends Component {
  state = {
    items: {
      1: {name: "item 1", id: '1'},
      2: {name: "item 2", id: '2'}
    },
    count: 0
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(state => ({count: state.count + 1})), 
      1000
    )
  }

  multiply = factor => this.setState(
    state => ({count: state.count * factor}))

  // This is a function that needs the thisArg and an additional argument bound to it
  deleteItem(id) {
    // A little helper for making mutation free updates
    function omit(key, obj) {
      return Object.assign({}, 
                           ...Object.keys(obj)
                                    .filter(k => k !== key)
                                    .map(k => ({[k]: obj[k]})))
    }
    this.setState({items: omit(id, this.state.items)})
  }

  // This is a function that only needs an argument bound, but not the thisArg
  capitalizeName = item => {
    let {items} = this.state
    this.setState(state => Object.assign(items, {
      [item.id]: Object.assign(item, {name: item.name.toUpperCase()})
    }))
  }

  // If you declare the cache as a property of the component then
  // its lifecycle will match that of the component and you 
  // shouldn't have to worry too much about cleanup or unbounded
  // cache sizes
  fnCache = new Map()

  render({}, { items, count }) {
    //Normally you would just stick this straight into the jsx but we need 
    //to save the result for demonstration purposes
    let double = partial(this.fnCache, this.multiply, 2)
    if (this.double !== double) {
      this.double = double
      console.log('created new double function')
    }

    return (
      <div class={style.container}>
        <button onClick={double}>Double</button>
        <div class={style.counter}>{count}</div>
        {Object.keys(items).map(itemId => {
          let item = items[itemId]
          return (
          <div class={style.item}>
            {item.name}
            <button onClick={partial(this.fnCache, this.capitalizeName, item)}>
              Capitalize
            </button>
            <button onClick={bind(this.fnCache, this.deleteItem, this, item.id)}>
              Delete
            </button>
          </div>
        )})}
      </div>
    )
  }
}
