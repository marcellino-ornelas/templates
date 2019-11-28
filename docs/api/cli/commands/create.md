## Create

### Description

render a template.

> Note: tps throws an error when a file, that the template needs to create, already exists.

---

### Syntax

```bash
tps create --use=<template-name> [flags...] [templates-to-create...]
```

#### Parameters

`<template-name>` _(required)_ tps template you want to render with

`[flags...]` _(optional)_ flags to change the behavior of create.

`[templates-to-create...]` (optional) one or more component names, separated by a space, to generate.

Aliases: [Use](./use.md)

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
        <td>--newFolder, f</td>
        <td>true</td>
        <td>Create a new folder</td>
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

#### Create a single template

Use the create command to create a template in your current working directory

```bash
tps create --use=<template-name> app
```

    ./app/
      <your-template-files> ...

#### Create a single template with a path

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

#### Create multiple templates

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

#### Create a template in your cwd

You can also render your template in your cwd `tps create --use=<template-name>`

```bash
tps create --use=<template-name>
```

    ./
      <your-template-files> ...

#### Force a template creation

By default tps will throw a error if a file already exists. If you want to override the file instead of causing an error. Use the `--force` flag.

```bash
tps create --use=<template-name> --force app
```

    ./app/
      <your-template-files> ...

Any files that your template will build, will override any files already living in `./app/`.

#### Add additional packages

use the `--packages` flag when you want to add additional packages to the new template your creating.

```bash
tps create --use=<template-name> --packages css -- app
```

    ./app/
      <css-packages-files>
      <your-template-files>

You also can pass in more than one

```bash
tps create --use=<template-name> --packages css storybook -- app
```

    ./app/
      <css-packages-files>
      <storybook-packages-files>
      <your-template-files>

#### Use default answers to prompts

use the `--default` flag to tell tps to use all default answers to a templates prompts.

> No prompts will be asked

```bash
tps create --use=<template-name> --default app
```

#### Wipe a template

by default tps, will error out when you try to create a template, when a file exists that tps is trying to create. Use the `--wipe` to delete any folders/files that existed where the template should be created.

_before:_

    ./app/
      some-random.js

```bash
tps create --use=<template-name> --wipe app
```

_after:_

`some-random.js` no longer exists

    ./app/
      <your-template-files>

#### force a template

by default tps, will error out when you try to create a template, when a file exists that tps is trying to create. Use the `--=force` flag to let tps override any existing files that already existed. This will only override files needed and not delete anything extra

_before:_

    ./app/
      index.js

```bash
tps create --use=<template-name> --force app
```

_after:_

`index.js` will now have contents from your template creation and not from the old file

    ./app/
      <other-template-files>
      index.js
