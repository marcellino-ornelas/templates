## Init

### Description

initialize your repo as a tps repo. This will allow you to set tps template settings and build templates for your repo. All this command does is create a `.tps/` folder with `.tpsrc` file inside it in your `cwd`.

by default, tps will throw an error if you try to initialize a child directory when a parent directory is already initialized. If you would like to do this anyways use the `force` flag.

> Note: You should initialize the settings in your repos root directory.

#### Global tps

tps can also be initialized globally with the `--global` flag. When tps is initialized globally there is a `.tps` folder inside of your home directory. It's the same as initializing a repo and it will have all of the same files. This folder is so you have a central place to keep templates that can be used anywhere and also have top level default configurations.

<!-- Templates allows you to keep all configurations/settings inside a `.tpsrc` file. Use the `init` command in any repo to initialize it as a templates repo. -->

---

### Syntax

```bash
tps init [flags...]
```

#### Parameters

`[flags...]` (optional) flags to change the behavior of init.

---

### Flags

<table id="init-table">
    <thead>
      <tr>
        <th>Flag</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>--force, f</td>
        <td>N/A</td>
        <td>Initialize tps in cwd no matter what</td>
      </tr><tr>
        <td>--global, g</td>
        <td>N/A</td>
        <td>Initialize tps globally</td>
      </tr>
    </tbody>
</table>

<!--

--

### Setting options

-->

---

### Examples

#### Initializing a repo

First navigate into the directory that you wish to initialize local settings.

```bash
cd some/path/to/repo
```

Initialize template settings

```bash
tps init
```

#### Initializing tps globally

use the `--global` flag when you want tps to be initialized globally.

```bash
tps init --global
```

#### forcing a repo

use the force flag when you want a repo to be initialized but a parent directory is already initialized

```bash
tps init --force
```
