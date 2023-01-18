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

Aliases: `ls`

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

#### list all templates

```bash
tps ls
```

should produce something like:

```
Global:
- <your-global-templates>

Local:
- <your-local-templates>
```
