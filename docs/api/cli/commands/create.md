# Create

## Description

render a template.

> Note: tps throws an error when a file, that the template needs to create, already exists. See [Force a template creation](#force-a-template-to-be-created) to get around this.

---

## Syntax

```bash
tps create --use=<template-name> [flags...] [templates-to-create...]
```

## Parameters

`<template-name>` _(required)_ tps template you want to render with

`[flags...]` _(optional)_ flags to change the behavior of create.

`[templates-to-create...]` (optional) one or more component names, separated by a space, to generate.

Aliases: [Use](./use.md)

---

## Flags

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

## Examples

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Create a single template](#create-a-single-template)
- [Create a single template with a path](#create-a-single-template-with-a-path)
- [Create multiple templates](#create-multiple-templates)
- [Create a template in your cwd](#create-a-template-in-your-cwd)
- [force a template to be created](#force-a-template-to-be-created)
- [Add additional packages](#add-additional-packages)
- [Use default answers for a templates prompts](#use-default-answers-for-a-templates-prompts)
- [Wipe a template](#wipe-a-template)
- [Create a template without a new folder](#create-a-template-without-a-new-folder)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Create a single template

Use the `create` command to create a template in your current working directory

```bash
tps create --use=<template-name> app
```

    ./app/
      | - <your-template-files>

---

### Create a single template with a path

You can also specify a path to place the template.

`tps create path/to/folder/<template>`.

```bash
tps create --use=<template-name> app/src
```

This will create your template inside of `./app/src`

    ./app/
      | - src/
          | - <your-template-files>

> Note: directories will be created if they don't exist.

---

### Create multiple templates

You can also create multiple components name at the same time `tps create --use=<template-name> <template-to-create> <template-to-create> <template-to-create>...`

```bash
tps create --use=<template-name> app app2 webapp/src
```

This line will create templates inside `app`, `app2`, and `webapp/src`.

    ./app/
      | - <your-template-files>
    ./app2/
      | - <your-template-files>
    ./webapp/
      | - src/
          | - <your-template-files>

---

### Create a template in your cwd

You can also render your template in your cwd `tps create --use=<template-name>`

```bash
tps create --use=<template-name>
```

    ./
      | - <your-template-files>

---

### force a template to be created

Use the `--force` flag to override any existing files that already existed before rendering your template. This will only override files needed and not delete/override anything extra

_before:_

    ./app/
      | - noop.js <-- some file not in your template
      | - index.js <-- file in your template

```bash
tps create --use=<template-name> --force app
```

_after:_

`index.js` will now have contents from your `index.js` inside of your template and not the contents of the old `index.js`. The `noop.js` however, stays the same since the file is not in your template so theres no reason to get rid of it.

    ./app/
      | - noop.js <-- file from before not changed
      | - <template-files>
      | - index.js

---

### Add additional packages

use the `--packages` flag when you want to add additional packages to the new template your creating.

```bash
tps create --use=<template-name> --packages <package1> -- app
```

    ./app/
      | - <package1-files>
      | - <default-package-files>

You also can pass in more than one

```bash
tps create --use=<template-name> --packages <package1> <packages2> -- app
```

    ./app/
      | - <package1-files>
      | - <package2-files>
      | - <default-package-files>

---

### Use default answers for a templates prompts

use the `--default` flag when you would like to use all default answers to a templates prompts. No prompts will be asked to the user.

```bash
tps create --use=<template-name> --default app
```

---

### Wipe a template

Use the `--wipe` flag to delete any folders/files that exists where the template should be created.

_before:_

    ./app/
      | - some-random.js

```bash
tps create --use=<template-name> --wipe app
```

_after:_

`some-random.js` no longer exists

    ./app/
      | - <your-template-files>

first tps deletes the entire directory `app`. Then it will create your template `app`

---

### Create a template without a new folder

tps creates a new folder of the template name you pass in by default. In order to turn this off, use the `--no-newFolder` flag.

if we are in a empty directory call `webapp` like this:

    ./webapp  <-- cwd
      | - <empty-directory>

by default calling

```bash
tps create --use=<template-name> app
```

this will create

    ./webapp
      | - app <-- this was the template name you passed in
          | - <your-template-files>

now if you pass the `--no-newFolder` flag

```bash
tps create --use=<template-name> --no-newFolder app
```

this will create

    ./webapp
      | - <your-template-files>

See some common examples on why you would want to do this [here](TODO)

---
