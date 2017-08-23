# memo-bind
Memoized binding of functions to arguments. Very useful for React and Preact!

You can use memo-bind to prevent allocating a new function
on each render when all you want to do is bind a value as
an argument to a function. The standard way to avoid this is 
to break out a child component and bind the value to that
instead, but sometimes that is a bit cumbersome.

## Example Usage
```
  <div class="container">
    {items.map(x => (
      <div class="item">
        {item.name}
        <button onClick={memoBind(this.deleteItem, item.id)}>
          Delete
        </button>
      </div>
    ))}
  </div>
```
