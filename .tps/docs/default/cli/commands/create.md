## Create

### Description

Create a template

---

### Syntax

```bash
tps create [flags...] [ComponentNames...]
```

#### Parameters

`[flags...]` (optional) flags to change the behavior of create.

`[ComponentName...]` (optional) one or more component names, separated by a space, to generate.

---

### Flags

<table id="create-table">
    <thead>
    </thead>
    <tbody>
    </tbody>
</table>

---

### Examples

Use the create command to create a component folder in your current working directory

```bash
tps create --use=<template-name> app
```

    app/
      <your-template-files> ...

You can also specify a path to place the component. `tps create path_to_folder/<ChildComponent>`.

```bash
tps create --use=<template-name> app/src
```

This will create your template inside of `./app/src`

    app/
      src/
        <your-template-files> ...

> Note: Parent directories will be created if they don't exist.

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
