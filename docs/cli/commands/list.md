## List

### Description

List all available templates that you can use.

---

### Syntax

```bash
tps list [flags...]
```

#### Parameters

`[flags...]` (optional) flags to change the behavior of init.

---

### Setting options


<table id="list-options">
    <thead>
      <tr>
        <th>Flag</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>--global, g</td>
        <td>true</td>
        <td>N/A</td>
      </tr><tr>
        <td>--local, l</td>
        <td>true</td>
        <td>N/A</td>
      </tr>
    </tbody>
</table>


---

### Examples

First navigate into the directory that you wish to initialize local settings.

```bash
cd some/path/to/repo
```

Initialize template settings

```bash
tps init
```

This will create a `.tps/` folder with `.tpsrc` file inside it.
