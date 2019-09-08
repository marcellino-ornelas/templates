## Init

### Description

Templates allows you to keep all configurations/settings inside a `.tpsrc` file. Use the `init` command in any repo to initialize it as a templates repo.

> Note: You should initialize the settings in your repos root directory.

---

### Syntax

```bash
tps init [flags...]
```

#### Parameters

`[flags...]` (optional) flags to change the behavior of init.

---

### Setting options

<table id="setting-options">
    <thead>
    </thead>
    <tbody>
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
