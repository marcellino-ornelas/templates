## Init

### Description

Templates allows you to keep all configurations inside a `.tpsrc` file.

create-components-react gives you the capability to make localized settings for any repo. These setting will change the behavior of how create-components-react functions. These settings would be like using the flags in the command line but it will be applied every time a react component is made.

> Note: You should initialize the settings in your repos root directory.

---

### Syntax

```bash
tps init [flags...]
```

#### Parameters

`[flags...]` (optional) flags to change the behavior of init.

---

### Flags

<table>
    <thead>
        <tr>
            <th>Flag</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-t, --templates <ext> </td>
            <td>false</td>
            <td>Initialize create-components react to use templates functionality</td>
        </tr>
    </tbody>
</table>

---

### Setting options

<table id="setting-options">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>index</td>
            <td>Boolean</td>
            <td>true</td>
            <td> Include a index file for the component(s) you create</td>
        </tr>
        <tr>
            <td>css</td>
            <td>Boolean</td>
            <td>true</td>
            <td> Include a css file for the component(s) you create</td>
        </tr>
        <tr>
            <td>test</td>
            <td>Boolean</td>
            <td>false</td>
            <td> Include a testing file for the component(s) you create</td>
        </tr>
        <tr>
            <td>default</td>
            <td>Boolean</td>
            <td>true</td>
            <td> Include all of the default packages for react. index, css, and component or functional </td>
        </tr>
        <tr>
            <td>templates</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Use local templates instead of defaults</td>
        </tr>
        <tr>
            <td>cssType</td>
            <td>String</td>
            <td></td>
            <td>Change extension for css file</td>
        </tr>       
        <tr>
            <td>extendCwd</td>
            <td>String</td>
            <td></td>
            <td>Path to place your components. This path should be relative to the folder where you initalized your settings</td>
        </tr>
        <tr>
            <td>verbose</td>
            <td>Boolean</td>
            <td>false</td>
            <td>log progress while creating components</td>
        </tr>
    </tbody>
</table>

---

### Examples

First navigate into the directory that you wish to initialize local settings.

```bash
cd some/path/to/repo
```

Initialize create-component-react settings

```bash
tps init
```

This will create a `.tps/` folder with `settings.json` file inside it.

> Note: If `-t` flag is present it will also make a `templates/` folder inside `.tps/` folder and initialize templating.
