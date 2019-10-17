# Dynamic files

Inside of TPS templates you can take advantage of dynamic files. These file will be processed threw a templating language called [doT](http://olado.github.io/doT/index.html)
 so you can dynamically add values or lines of code when creating it. In order for a file to get processed with [doT](http://olado.github.io/doT/index.html)
 you must add a `.dot` extension. All file names also get passed through doT which we will see in the following example.

Well use a react component for an example.

Lets take a this tps template as a starter. We will be building a reusable react component in a repo called `t`:

## Example

    | - tps-example
      | - .tps/
          | - react-component/
              | - default/

Now typically a react component has 3 main files. A index, css and a js file all inside of a folder like the following folder structure:

    | - .<component-name>/
        | - <component-name>.js
        | - <component-name>.css
        | - index.js

Now in order for us to create a template out of this lets put the following inside of our `.tps/react-component/default`.

    | - ...
      | - react-component/
          | - default/
              | - index.js.dot
              | - {{=tps.name}}.js.dot
              | - {{=tps.name}}.css

Your probably thinking what the hell is this `{{=tps.name}}.js`. Since all files names get processed with dot, we are going to use the name of the new template, we are generating, as the file name. Say we create the following component.

```bash
tps react-component Nav

# or

tps create --use=react-component Nav
```

We are generating a template called `Nav`. So when tps renders your template, it will take whatever you pass in as an argument and put it as `tps.name`.
In this case `tps.name` will be `Nav`. Now since in the file names we are generating them like this `{{=tps.name}}.js`. In this example when it gets rendered it will be rendered to `Nav.js`. so calling the command from above will generate this folder template:

    | - Nav
        | - index.js
        | - Nav.js
        | - Nav.css

Now if you have a extended path like `List/ListItem`. Then `tps.name` would be `ListItem`;

```bash
tps react-component List/ListItem

# or

tps create --use=react-component List/ListItem
```

Result:

    | - List
        | - ListItem
            | - index.js
            | - ListItem.js
            | - ListItem.css

Now lets get a little deeper. Since we added the dot extension to our js file lets add some contents inside.

```javascript
    import React, { Component } from 'react';
    import './{{=tps.name}}.css';

    class {{=tps.name}} extends Component {
      constructor(props){
        super(props);
        this.state = {};
      }

      // componentWillMount(){}
      // componentDidMount(){}
      // componentWillUnmount(){}

      // componentWillReceiveProps(){}
      // shouldComponentUpdate(){}
      // componentWillUpdate(){}
      // componentDidUpdate(){}

      render() {
        return (
          <div></div>
        );
      }
    }

    export default {{=tps.name}};
```

Now when you generate a new template with the following command

```bash
tps react-component Nav
```

your `tps-example/Nav/Nav.js` file will now be this

```javascript
import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return <div></div>;
  }
}

export default Nav;
```

[Prev](./packages.md)
[Next](./settings/README.md)
