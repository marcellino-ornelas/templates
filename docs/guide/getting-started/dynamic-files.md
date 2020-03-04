# Dynamic files


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Dynamic files breakdown](#dynamic-files-breakdown)
- [How to use doT](#how-to-use-dot)
- [How to use dot with templates](#how-to-use-dot-with-templates)
  - [Fields](#fields)
  - [How to make a file use doT](#how-to-make-a-file-use-dot)
  - [File names](#file-names)
- [Example](#example)
  - [File names](#file-names-1)
  - [File contents](#file-contents)
  - [Packages](#packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Dynamic files breakdown

If tps was simply a copy and paste then it wouldn't exist. When using any sort of reusable concepts, the ability to pass in addition information is key. This is the purpose of dynamic files.

Dynamic files live inside of your template's package folders just like any other file would but dynamic files get proceed different. The contents of dynamic files get first read by tps then gets passed through a templating language called [doT](http://olado.github.io/doT/index.html)
. Regular files just get copied and passed over to the new directory.

                                      + - - - - - - - +    + - - - - - - - - - - +
                                      | dynamic files | -> | dot template engine |
                                      + - - - - - - - +    + - - - - - - - - - - +
                                                |                      |
    + - - - - - - - - +    + - - - - - - - +    |                      |       + - - - - - - - - - - - +
    | new template    | -> | gets all      | -> +                      + ----> | New rendered template |
    | being rendered  |    | files needed  |    |                      |       + - - - - - - - - - - - +
    + - - - - - - - - +    + - - - - - - - +    |                      |
                                                |                      |
                                      + - - - - - - - +      + - - - - - - +
                                      | regular files | ---> |  copy/paste |
                                      + - - - - - - - +      + - - - - - - +

## How to use doT

You can visit doTs docs [here](http://olado.github.io/doT/index.html)
 but well introduce you to the basics. doT is just like any other templating language like handlebars, ejs, or jade.

doT is javascript based language and uses `{{}}` brackets for interpolation. doT has many different kinds of interpolation like loops, conditionals, and more. Any valid javascript code will work inside of those brackets. Do be mindful that all es6+ features might not be supported on the users version of node.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Interpolation</td>
            <td>{{= expression}}</td>
            <td>Replaces {{= expression}} with the value of the expression</td>
        </tr>
        <tr>
            <td>Conditionals</td>
            <td>
                {{? condition}}<br />
                    /* code here*/<br />
                {{?}}<br />
            </td>
            <td>Render the code between the braces when the condition evaluates to true</td>
        </tr>
        <tr>
            <td>Loops</td>
            <td>
                {{~array :value:index}}<br />
                    {{= value }}<br />
                {{~}}<br />
            </td>
            <td>Loop over an array and use the value of each</td>
        </tr>
    </tbody>
</table>

All systems have some cons to it. Now as you get into building more complicated templates you might find the need to indent dot syntax so it can be more readable. This however might have weird side effects to how your rendered template might look. Even though the indentions look good on the template side When dot processes these files it doesn't know about indenting or at least in my experience with using it.

See issue https://github.com/marcellino-ornelas/templates/issues/7 for more details

## How to use dot with templates

They way doT works with templates is simple. doT needs a main entry point when passing data to it. This main entry point is `tps`. tps gives you a lot of information the templates process itself and data passed in by the users. In order to use this main top level object in doT. You can access by using the name `tps` inside of doTs brackets.

```
{{= tps }}
```

### Fields

##### Name

`tps.name`

Most templates being rendered have a name associated with them. By name we mean they path(s) you pass in to the create command. Say we were to render some template.

```
tps express-app app
               |___|
               # ^ this is the name

# if you were building a template with a path only the last part is considered the name

tps express-app projects/app
                        |___|
                        # ^ this is the name
```

When rendering two or more templates at the same time. The same concept as above apply's but for each path you pass in. You can access this name in doT like this.

```
{{= tps.name }}
```

if you render a template with no build path. then `tps.name` will be null.

```
tps express-app
```

---

##### Template

`tps.template`

You can get the name of the template your using with `tps.template`

```
tps express-app app
    |__________|
    # ^ this is the template
```

You can access this name in doT like this.

```
{{= tps.template }}
```

---

##### Packages

`tps.packages`

You get passed an list of packages that were used when rendering your template. Remember by default you only use the `default` package. So if you don't specify any additional ones then

```
tps.packages // ['default']

# when you use more

tps.packages // ['default', '<package1>', '<package2>', '<package...>']
```

You can access these packages in doT like this.

```
{{= tps.packages }}
```

> Don't remember how to use packages? refresh your mind [here](./packages.md)

---

##### Answers

`tps.answers`

When your template has prompts, You get all of the answers on `tps.answers`.

```
{{= tps.answers.<name-of-prompt> }}
```

This topic hasn't been talked about to much yet and will be brought back up in another section of this guide.

---

### How to make a file use doT

When you want a file to be processed dynamically. Add an `.dot` extension to the end of the filename. When the file gets created in the new template the `.dot` extension will be removed from the file name.

### File names

File names can also take advantage of using dot. By putting the `{{=<some-value>}}` in the filename you can get dynamic filenames.

    | - <some-template>/
        | - default/
            | - {{=<some-value>}}.md

    # In new template it will look like this

    | - <new-template-name>/
        | - <some-value>.md

## Example

As a demonstration, lets build a react component template.

    | - tps-example/
        | - .tps/
            | - react-component/
                | - default/

Now typically a react component has 3 main files. A index, css and a js file all inside of a folder like the following folder structure:

    | - .<component-name>/
        | - <component-name>.js
        | - <component-name>.css
        | - index.js

Now in order for us to create a template out of this lets put the following inside of our `.tps/react-component/default`.

    | - .tps/
        | - react-component/
            | - default/
                | - index.js.dot
                | - {{=tps.name}}.js.dot
                | - {{=tps.name}}.css

### File names

Since all files names get processed with dot, we are going to use the name of the new template, we are generating, as the file name. Say we create the following component.

```bash
tps react-component Nav

# or

tps create --use=react-component Nav
```

We are rendering a new template called `Nav` so `tps.name` will be `Nav`. That means `{{=tps.name}}.js.dot` gets rendered to `Nav.js`. so calling the command from above will generate this folder template:

    | - tps-example
        | - Nav
            | - index.js
            | - Nav.js
            | - Nav.css

Now if you have a extended path like `List/ListItem`. Then `tps.name` would be `ListItem`

```bash
tps react-component List/ListItem

# or

tps create --use=react-component List/ListItem
```

After calling the above you should get a new template like this

    | - tps-example
        | - List
            | - ListItem
                | - index.js
                | - ListItem.js
                | - ListItem.css

### File contents

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

After calling the line from above you should end up with a `tps-example/Nav/Nav.js` that look like this:

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

### Packages

Just for fun lets see how we can get packages involved. Let move the css file out of the `default` package and put it into a css package.

    | - .tps/
        | - react-component/
            | - default/
                | - index.js.dot
                | - {{=tps.name}}.js.dot
            | - css
                | - {{=tps.name}}.css

Now every time you render this template. You will only get the css file if you add the additional `css` package. Now to make this more useful, we need to change `import './{{=tps.name}}.css';` in the `{{=tps.name}}.js.dot` now since it might not be there. Let change this to

```
{{~tps.packages.includes("css")}}import './{{=tps.name}}.css';{{~}}
```

DoT's `{{~}}` is a conditional. So here we check to see if the `css` package was include when rendering this template. if it is lets add the import. If not, then do nothing. Calling:

```
tps react-component --packages css -- Nav
```

will produce

    | - tps-example
        | - Nav
            | - index.js
            | - Nav.js
            | - Nav.css

and

```js
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

but calling

```
tps react-component Nav
```

will produce

    | - tps-example
        | - Nav
            | - index.js
            | - Nav.js

with no `import`

```js
import React, { Component } from 'react';

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

[Back](./packages.md)
[Next](./settings/README.md)
