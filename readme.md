# Templates

File system template generator

### Install

```bash
npm install -g <name>
```

See the docs

## Templating

### Description

This will allow a user to construct how each file of a component look. This gives the ability for a user to modify or add to the structure of a component and the files it should include.

> Note: create-components-react uses a templating engine to compile and render the files. More documentation on how to use the templating engine can be found [here](http://olado.github.io/doT/index.html)

### Syntax

`ccr template`

### Parameters

None

---

### Flags

No flags for Templating

---

### doT

The doT templating language uses `{{}}` for interpolation and javascript execution. Here are some basic uses of doT that we use throughout this tutorial:

<!-- table>(thead>tr>th*3)+tbody>tr*3>td*3 -->
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
            <td>{{= expression }}</td>
            <td>Replaces {{= expression }} with the value of the expression</td>
        </tr>
        <tr>
            <td>Conditionals</td>
            <td>
                {{? condition }}<br />
                    /* code here*/<br />
                {{?}}<br />
            </td>
            <td>Render the code between the braces when the condition evaluates to true</td>
        </tr>
    </tbody>
</table>

> Note: All features of doT may not be supported. If you wish to use a feature and it doesnt work feel free to make a issue on github.

---

<span id="env-settings"></span>

### ENV Settings

#### Component

usage:

    it.component

propertys:

<table id="env-options-component">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>String</td>
            <td>Name of the Component we are generating</td>
        </tr>
        <tr>
            <td>dir</td>
            <td>String</td>
            <td>Directory path where the current file will be saved to</td>
        </tr>
    </tbody>
</table>

#### Packages

usage:

    it.packages

This object holds the package names that are used while creating you component. For example if you added a custom package called `storage` and created a component like this `ccr create -p storage App`, `it.packages.storage` will be `true` because you told the program to include the package storage.

#### Setting

usage:

    it.settings

propertys:

The properties here are the same as the ones you can use in [settings options section](#setting-options)

---

### Examples

To initailize templating, you can use:

```bash
ccr template
```

> Note: This will only make templating folder to use. You still would need set the `templates` property in your `.ccr/settings.json` to true.

```json
{
  //...
  "templates": true
  //...
}
```

>

This feature still relays on your local settings to work. It is recommended to initalize templating when initailizing settings. This command is here for those who have a old repo with create-components-react local settings already initailized and want to add templating.

This is the recommended way to initailze templates if you don't have local settings initialized.

```bash
ccr init -t
```

This will initialize local settings and local templating.

---

### Packages

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

Lets give you some basic info on how templating works. When you initialize templating in create-components-react, every folder that is a direct child of `.ccr/templates/` are called packages. Create-components-react uses the content of these folders to render your component. The default packages for react are `index, component, style`. These will be included everytime you create a component structure unless you specify in the local settings or with command-line flags that you would not like to include some or all these packages.

The next thing that should look weird are the file names.

`{{= it.component.name }}`

This is doT sytax and doT uses this for template interpolation. When generating components create-component-react gives you a bunch of options that can help you create dynamic file name or files.

Example:

`ccr create App` the `{{= it.component.name }}` inside of files or file names gets replaced with `App`. The top level element is always `it`.

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

<span id="default-packages-example"></span>

#### Default Packages

As mentioned earlier create-components-react has default packages that it renders these default packages are index, component, css.

---

<span id="custom-package-example"></span>

### Custom Packages

You can create custom packages to add when generating you components. These packages can have directories and/or dot files for rendering inside. Each directory( even nested ones!) and all files will be made to the destination.
Inside of your package folder you can create a file(s) and/or directory(s). Each file inside that you would like to have processed with doT should include a `.dot` extention at the end of the file.

If the only extention to your file is a `.dot` extention then will be rendered as a `.js` file. If you would like to have another type of extention include it before the `.dot` extention.

To use custom packages use the `-p` flag while creating a component. The `-p` or `--packages` flag takes a colon separated list of package names.

Example:

```bash
ccr create -p storage:view:container App
```

This command will Create an App component with custom storage, view, and container packages.

#### examples

To add your own custom packages. Create a folder inside the `templates/` folder. The name can be anything you want but its important to remember that this name is what the package is gonna be called.

In this example we are going to create a `storage` package that will help us create a mobx store. Create A folder called `storage`. Next create a file called `{{= it.component.name }}Storage.dot`.

    RepoFolder/
    | - .ccr/
        | - templates/
            | - component/
            | - index/
            | - functional/
            | - style/
            | - test/
            |
            | - storage/
            |   |- storage.dot
            |
            | - settings.json

Inside of `storage/{{= it.component.name }}Storage.dot` add the following code.

```javascript
    import { observable } from "mobx"

    class {{= it.component.name  }}Storge {
        // @observable
        // @computed get
    }

    export default {{= it.component.name  }}Storge;
```

Now create a component with our additional package. Execute this line in your command line.

    ccr create -p storage App

This will create:

    App/
    |
    | - App.js
    | - App.css
    | - index.js
    | - AppStorage.js

To get alittle more fancy we can change some behavior from other file when certain packages are used. Open `templates/component/{{= it.component.name }}.dot`. You can add this line inside your file to have dynamic capabilies when generating a component with a certain package.

```javascript
    {{? it.packages.storage }}
    import {observer} from 'mobx-react';
    {{?}}
```

now when you call:

```bash
ccr create -p storage Nav
```

Our nav component should have render the import statement for mobx.

<!-- ## Create
CAC DSV
### Usage

### Flags

-   `d`

### Examples
 -->
