# Use

## Description

render a template.

> Note: tps throws an error when a file, that the template needs to create, already exists. See [Force a template creation](#force-a-template-to-be-created) to get around this.

---

## Syntax

```bash
tps <template-name> [flags...] [templates-to-create...]
```

## Parameters

`<template-name>` _(required)_ tps template you want to render with

`[flags...]` _(optional)_ flags to change the behavior of create.

`[templates-to-create...]` (optional) one or more component names, separated by a space, to generate.

---

## Flags

<table id="use-table">
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
- [Create a template without a new folder](#create-a-template-without-a-new-folder)
- [Wipe a template](#wipe-a-template)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- ### Create a single template

Use the `use` syntax to create a template in your current working directory

```bash
tps <template-name> app
```

    ./app/
      <your-template-files> ...

### Create a single template with a path

You can also specify a path to place the template.

`tps create path/to/folder/<template>`.

```bash
tps <template-name> app/src
```

This will create your template inside of `./app/src`

    ./app/
      src/
        <your-template-files> ...

> Note: directories will be created if they don't exist.

### Create multiple templates

You can also create multiple components name at the same time `tps <template-name> <template-to-create> <template-to-create> <template-to-create>...`

```bash
tps <template-name> app app2 webapp/src
```

This line will create templates inside `app`, `app2`, and `webapp/src`.

    app/
      <your-template-files> ...
    app2/
      <your-template-files> ...
    webapp/
      src/
        <your-template-files> ...

### Create a template in your cwd

You can also render your template in your cwd `tps <template-name>`

```bash
tps <template-name>
```

    ./
      <your-template-files> ... -->

<!-- ### Force a template creation

By default tps will throw a error if a file already exists. If you want to override the file instead and not cause a error. Use the `--force` flag.

```bash
tps <template-name> --force app
```

    ./app/
      <your-template-files> ...

Any files that your template will build, will override any files already living in `./app/`. -->
<!--
### Add additional packages

use the `--packages` flag when you want to add additional packages to the new template your creating.

```bash
tps <template-name> --packages css -- app
```

    ./app/
      <css-packages-files>
      <your-template-files>

You also can pass in more than one

```bash
tps <template-name> --packages css storybook -- app
```

    ./app/
      <css-packages-files>
      <storybook-packages-files>
      <your-template-files> -->
<!--
### Use default answers to prompts

use the `--default` flag to tell tps to use all default answers to a templates prompts.

> No prompts will be asked

```bash
tps <template-name> --default app
``` -->
<!--
### Wipe a template

Use the `--wipe` to delete any folders/files that existed where the template should be created.

_before:_

    ./app/
      some-random.js

```bash
tps <template-name> --wipe app
```

_after:_

`some-random.js` no longer exists

    ./app/
      <your-template-files> -->

<!-- ### force a template

Use the `--force` flag to let tps override any existing files that already existed before rendering your template. This will only override files needed and not delete/override anything extra

_before:_

    ./app/
      index.js

```bash
tps <template-name> --force app
```

_after:_

`index.js` will now have contents from your `index.js` inside of your template and not the contents of the old `index.js`

    ./app/
      <other-template-files>
      index.js

--- -->
<!--
### Create a template without a new folder

by default,

```bash
tps <template-name> app
```

    ./app/
      <your-template-files> ... -->

### Create a single template

Use the `create` command to create a template in your current working directory

```bash
tps <template-name> app
```

    ./app/
      | - <your-template-files>

---

### Create a single template with a path

You can also specify a path to place the template.

`tps create path/to/folder/<template>`.

```bash
tps <template-name> app/src
```

This will create your template inside of `./app/src`

    ./app/
      | - src/
          | - <your-template-files>

> Note: directories will be created if they don't exist.

---

### Create multiple templates

You can also create multiple components name at the same time `tps <template-name> <template-to-create> <template-to-create> <template-to-create>...`

```bash
tps <template-name> app app2 webapp/src
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

You can also render your template in your cwd `tps <template-name>`

```bash
tps <template-name>
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
tps <template-name> --force app
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
tps <template-name> --packages <package1> -- app
```

    ./app/
      | - <package1-files>
      | - <default-package-files>

You also can pass in more than one

```bash
tps <template-name> --packages <package1> <packages2> -- app
```

    ./app/
      | - <package1-files>
      | - <package2-files>
      | - <default-package-files>

---

### Use default answers for a templates prompts

use the `--default` flag when you would like to use all default answers to a templates prompts. No prompts will be asked to the user.

```bash
tps <template-name> --default app
```

---

### Create a template without a new folder

tps creates a new folder of the template name you pass in by default. In order to turn this off, use the `--no-newFolder` flag.

if we are in a empty directory call `webapp` like this:

    ./webapp  <-- cwd
      | - <empty-directory>

by default calling

```bash
tps <template-name> app
```

this will create

    ./webapp
      | - app <-- this was the template name you passed in
          | - <your-template-files>

now if you pass the `--no-newFolder` flag

```bash
tps <template-name> --no-newFolder app
```

this will create

    ./webapp
      | - <your-template-files>

See some common examples on why you would want to do this [here](TODO)

---

### Wipe a template

#### one build path

Use the `--wipe` flag to delete any folders/files that exists where the template should be created.

_before:_

    ./app/
      | - some-random.js

```bash
tps <template-name> --wipe app
```

_after:_

`some-random.js` no longer exists

    ./app/
      | - <your-template-files>

first tps deletes the entire directory `app`. Then it will create your template `app`

#### when using a long build path

Use the `--wipe` flag with a long build path will produce the following:

_before:_

    dest/
      | - app/
        | - some-random-2.js
      | - some-random.js

```bash
tps <template-name> --wipe dest/app
```

_after:_

`some-random.js` no longer exists

    dest/
      | - app/
        | - <your-template-files>
      | - some-random.js

first tps deletes the entire directory `app`. Then it will create your template `app`

#### when using no build path

Using `--wipe` with no build paths is a little different. Since no new folder will be created there should be no main folder to get rid of.

if my current working directory is in folder `app`:

_before:_

    ./app/
      | - some-random.js

Running this command

```bash
tps <template-name> --wipe
```

will produce

_after:_

    ./app/
      | - some-random.js
      | - <your-template-files>

Since the folder `app` was already created templates will not delete any folders/files inside of `app` unless the template needs to override a file or folder.

**Example:**

lets just say the template Im rendering will create a `public` folder and inside that public folder it will create a `index.js` file. If the current working directory is `app`, like the example before, and `app` looked like this:

_before:_

    ./app/
      | - public
          | - random.js
      | - some-random.js

```bash
tps <template-name> --wipe
```

_after:_

    ./app/
      | - public
          | - <...any-other-template-files-you-have-in-public>
          | - index.js
      | - some-random.js
      | - <...your-template-files>

^ In this example `app` folder was already created so templates does not delete any files in this folder. This is why `some-random.js` did not get deleted. Now if we look inside the `public` folder its a different story. Notice the `random.js` did get deleted. This is because the template being used for rendering needed to create the `public` folder and `index.js` file inside it. Since were using wipe the folder `public` gets completely wiped out before creating the stuff inside.

#### when using no new folder

When you use `--wipe` and `--no-newFolder` there is no main folder getting created

_before:_

    ./app/
      | - some-random.js

Running this command

```bash
tps <template-name> --wipe
```

will produce

_after:_

    ./app/
      | - some-random.js
      | - <your-template-files>
