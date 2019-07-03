## Create

### Description

This will create a react component folder that will include a default of `<ComponentName>.js`, `<ComponentName>.css`, and `index.js`. There is also a test file that can be included but only if you specify it with the test flag or in a local settings file [see Settings for more ](#settings)

> Note: If the directory to the component doesn't exist, create-components-react will make it for you.

---

### Syntax

```bash
ccr create [flags...] <ComponentName> [ComponentNames...]
```

#### Parameters

`[flags...]` (optional) flags to change the behavior of create.

`ComponentName` (required) Name of the component you would like to create.

`[ComponentName...]` (optional) one or more component names, separated by a space, to generate.

---

### Flags

<table id="create-table">
    <thead>
        <tr>
            <th>Short Flag</th>
            <th>Long Flag</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c &lt;ext&gt; </td>
            <td>--css-type &lt;ext&gt;</td>
            <td>css</td>
            <td>Change extension for css file</td>
        </tr>
        <tr>
            <td>-s</td>
            <td>--no-css</td>
            <td>false</td>
            <td>Don't include a css file for the component(s) you create</td>
        </tr>
        <tr>
            <td>-i</td>
            <td>--no-index</td>
            <td>false</td>
            <td>Don't include a index file for the component(s) you create</td>
        </tr>
        <tr>
            <td>-d</td>
            <td>--no-default</td>
            <td>false</td>
            <td>Don't include any of the default packages for react. (index, style, component or functional) This will create a empty folder if not used with other commands</td>
        </tr> 
        <tr>
            <td>-t</td>
            <td>--test</td>
            <td>false</td>
            <td>Include a test file for the component(s) you create</td>
        </tr>        
        <tr>
            <td>-f</td>
            <td>--functional</td>
            <td></td>
            <td>Make the react component a function style component(component that has no state)</td>
        </tr>
        <tr>
            <td>-r &lt;path&gt;</td>
            <td>--extend-cwd &lt;path&gt;</td>
            <td></td>
            <td>Path to extend your current working directory path</td>
        </tr>
        <tr>
            <td>-p &lt;packages...&gt;</td>
            <td>--packages &lt;packages...&gt;</td>
            <td></td>
            <td>Colon separated list of additional packages to include while generating you component</td>
        </tr>
    </tbody>
</table>

---

### Examples

Use the create command to create a component folder in your current working directory

```bash
ccr create App
```

    App/
    | - App.js
    |
    | - App.css
    |
    | - index.js

You can also specify a path to place the component. `ccr create path_to_folder/<ChildComponent>`.

```bash
ccr create Nav/NavItem
```

This will create a NavItem component inside the nav folder.

    Nav/
    | - NavItem/
        |
        | - NavItem.js
        |
        | - NavItem.css
        |
        | - index.js

If Nav was a component already then it would look like this.

    Nav/
    | - index.js
    |
    | - Nav.js
    |
    | - Nav.css
    |
    | - NavItem/
        | - NavItem.js
        |
        | - NavItem.css
        |
        | - index.js

> Note: Parent folder(s) will be created if they dont exist. This will not make the parent folder a component.

You can also create multiple components name at the same time `ccr <ComponentName> <ComponentName> <ComponentName>...`

```bash
ccr create Nav SideBar SideBar/SideBarItem
```

This line will create a Nav and SideBar component. Then it will create a SideBarItem component that will be in the SideBar folder.

    Nav/
    | - Nav.js
    |
    | - Nav.css
    |
    | - index.js
    |
    SideBar/
    | - SideBar.js
    |
    | - SideBar.css
    |
    | - index.js
    |
    | - SideBarItem/
          | - SideBarItem.js
          |
          | - SideBarItem.css
          |
          | - index.js

---

You can use the `--extend-cwd` to place components into a specific folder without changing your directory in the terminal.

```bash
cd path/to/project
ccr create --extend-cwd ./path/to/folder App
```

This will place all of your components inside of the folder at `./client/src/components/`

or

Add the path to `.ccr/settings.json`.

> Note: see [settings](#settings) section for more info about how to use `setting.json` file

settings.json

```json
{
  "extendCwd": "./path/to/components"
}
```

Then you can use:

```bash
ccr create App
```

This will inherit the path from the settings.json file and place the App component into the path you specified.

> Note: using --extend-cwd will overwite the path used in your settings.json file

### Tips

create-components-react assumes that you want the first character of all paths to a component and the component's name to be uppercase. If you input a component name or any paths that have there first letter lowercase, it will be converted into uppercase. Examples:

```bash
ccr create app
```

`app` will turn into `App`

```bash
ccr create nav/navItem
```

`nav/navItem` will turn into `Nav/NavItem`

<span id="settings"></span>
