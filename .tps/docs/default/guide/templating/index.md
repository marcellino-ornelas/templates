# Templating

## Description

Building dynamic template is the purpose of TPS.

> Note: create-components-react uses a templating engine to compile and render the files. More documentation on how to use the templating engine can be found [here](http://olado.github.io/doT/index.html)

> Note: All features of doT may not be supported. If you wish to use a feature and it doesn't work feel free to make a issue on Github.

> Note: all examples in this guide will generate templates with [use](../cli/commands/use.md)

- [Prerequisites](./prerequisites.md)
- [Templates](./templates.md)
- [Packages](./packages.md)
- [Dynamic Files]/dynamic-files.md)

[Next](./prerequisites.md)

<!--
lets start off my creating a new folder called `tps-example`.

    cd ~/Desktop
    mkdir tps-example



Lets give you some basic info on how templating works. When you initialize templating in create-components-react, every folder that is a direct child of `.ccr/templates/` are called packages. Create-components-react uses the content of these folders to render your component. The default packages for react are `index, component, style`. These will be included everytime you create a component structure unless you specify in the local settings or with command-line flags that you would not like to include some or all these packages.

The next thing that should look weird are the file names.

`\{\{= it.component.name \}\}`

This is doT sytax and doT uses this for template interpolation. When generating components create-component-react gives you a bunch of options that can help you create dynamic file name or files.

Example:

`ccr create App` the `\{\{= it.component.name \}\}` inside of files or file names gets replaced with `App`. The top level element is always `it`.

There are two variables that you can use.

- [Component](#env-options-component) -> `it.component`
- [Settings](#setting-options) -> `it.settings`

You can file a list of all posssible propertys you can use [here](#env-settings).

You also are allowed to add your own packages to use throughout the repo. For examples of how to create a custom package go [here](#custom-package-example).

---

### Examples

Open your terminal and go to the directory that you wish to use.

```bash
cd path/to/repoFolder/
```

Initialize Settings and Templates

```bash
ccr init -t
```

or this if you have settings already initialized.

```bash
ccr template
```

This will create:

    RepoFolder/
    | - .ccr/
        | - templates/
            | - component/
            |   | - {{= it.component.name }}.dot
            |
            | - index/
            |   | - index.dot
            |
            | - functional/
            |   | - {= it.component.name }}.dot
            |
            | - style/
            |   | - {= it.component.name }}.{= it.settings.cssType }}.dot
            |
            | - test/
            |   | - {= it.component.name }}.test.js.dot
            |
            | - settings.json

open `component/{{= it.component.name }}.dot` and you should see something like this.

```javascript
    import React, { Component } from 'react';
    {{? it.settings.css }}
    import './{{= it.component.name }}.{{= it.settings.cssType}}';
    {{?}}

    class {{= it.component.name}} extends Component {
      // constructor(props){
        // super(props);
        // this.state = {};
      // }

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

    export default {{= it.component.name}};
```

> Note: All templates in the `.ccr/templates` folder are the default templates for create-components-react.

The next thing that looks that doesnt look familiar is this.

    {{? it.settings.css }}
    import './{{= it.component.name }}.{{= it.settings.cssType}}';
    {{?}}

This is doT syntax for a conditional. This line will render the import statement if the setting option of css is true, which means if you want to include a css file for the component. To see the difference create a component component like with a ccs file( `ccr create App` ) and create one without a ccs file( `ccr create -s Nav` ). Now compare `Nav.js` and `App.js`. `App.js` should have the import css line while `Nav.js` doesnt.

`component/{{= it.component.name }}.dot` is the default file template to generate the main component file. You can edit this file to make it look like anything you want as long as you follow the rules of doT. After you update this file and save it you can use the `create` command and each component created will take on the look of the template file you updated.

Example: Edit `component/component.dot` to render a component that doesn't include any react lifecycle methods always uses the constructor function. Now your file should look like this:

```javascript
    import React, { Component } from 'react';
    {{? it.settings.css }}
    import './{{= it.component.name }}.{{= it.settings.cssType}}';
    {{?}}

    class {{= it.component.name}} extends Component {
      constructor(props){
        super(props);
        this.state = {};
      }

      render() {
        return (
          <div></div>
        );
      }
    }
    export default {{= it.component.name}};
```

Now when you execute `ccr create App` it should make a directory like this:

    Repo Folder/
    | - .ccr/
    |   | - ...
    |
    | _ App/
        | - App.js
        | - index.js
        | - App.css

This doesn't look to different than the default version right? Don't be disappointed too quickly. Let's take a look at `App.js`. This file is created from the `component/component.dot` so if we have all our configurations right, it should now look like this:

```javascript
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div />;
  }
}
export default App;
```

This is the code we have just editted in `.ccr/templates/component/component.dot`. You can edit to file however you want to fit your needs while developing with react.


-->
