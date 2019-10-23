## Create

### Description

Create a template.

> Note: When rendering a template, if a file exists. Tps will throw an error

Aliases: [Use](./use.md)

---

### Syntax

```bash
tps create --use=<template-name> [flags...] [templates-to-create...]
```

#### Parameters

`<template-name>` _(required)_ tps template you want to render with

`[flags...]` _(optional)_ flags to change the behavior of create.

`[templates-to-create...]` (optional) one or more component names, separated by a space, to generate.

---

### Flags


<table id="create-table">
    <thead>
      <tr>
        <th>Flag</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>--use, u</td>
        <td>N/A</td>
        <td>Template package to create your with</td>
      </tr><tr>
        <td>--packages, p</td>
        <td>N/A</td>
        <td>Additional Packages to use when building your template</td>
      </tr><tr>
        <td>--default, d</td>
        <td>N/A</td>
        <td>Use all default answers to all prompts</td>
      </tr><tr>
        <td>--name, n</td>
        <td>N/A</td>
        <td>Name for template rendering. defaults to base name of the destination path</td>
      </tr><tr>
        <td>--noNewFolder, f</td>
        <td>N/A</td>
        <td>Don"t create a new folder</td>
      </tr><tr>
        <td>--force, </td>
        <td>N/A</td>
        <td>force the template to be made. This will override any files that tps needs to create</td>
      </tr><tr>
        <td>--wipe, </td>
        <td>N/A</td>
        <td>force the template to be made. This will delete the directory if exists</td>
      </tr>
    </tbody>
</table>


---

### Examples

Use the create command to create a template in your current working directory

```bash
tps create --use=<template-name> app
```

    ./app/
      <your-template-files> ...

You can also specify a path to place the template.

`tps create path/to/folder/<template>`.

```bash
tps create --use=<template-name> app/src
```

This will create your template inside of `./app/src`

    ./app/
      src/
        <your-template-files> ...

> Note: directories will be created if they don't exist.

You can also create multiple components name at the same time `tps create --use=<template-name> <template-to-create> <template-to-create> <template-to-create>...`

```bash
tps create --use=<template-name> app app2 webapp/src
```

This line will create templates inside `app`, `app2`, and `webapp/src`.

    app/
      <your-template-files> ...
    app2/
      <your-template-files> ...
    webapp/
      src/
        <your-template-files> ...

You can also render your template in your cwd `tps create --use=<template-name>`

```bash
tps create --use=<template-name>
```

    ./
      <your-template-files> ...

By default tps will throw a error if a file already exists. If you want to override the file instead and not cause a error. Use the `--force` flag.

```bash
tps create --use=<template-name> --force app
```

    ./app/
      <your-template-files> ...

Any files that your template will build, will override any files already living in `./app/`.
