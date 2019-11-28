# Packages

In this section, We will be covering the following topics:


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Package breakdown](#package-breakdown)
- [Making a new package](#making-a-new-package)
- [Using a new package](#using-a-new-package)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


> All commands examples assume your cwd is our `tps-example` repo

    | - tps-example/
        | - .tps/

## Package breakdown

Packages are the meat of a template. But its also, nothing special either. Its only a directory that will hold more files and directories. These files and folders with be used when rendering your template. The `default` package will always be rendered unless told not to. You can read about this [here](TODO).

Packages are the meat of a template. But its also, nothing special either. Its only a directory that will hold more files and directories. You can add as many files and directories as you want and these are what will be used when rendering a template. `packages` can be named whatever you like except for one. Each `template` can have a `default` package like the following example:

You can think of packages sort of like conditions. This is a way to tell tps that you only want to render a template with certain files or directories in certain occassions.

<!-- Packages are the meat of a template. They decided which folders/files to add to your new template. A package is nothing special either, its only a directory. The `default` package will always be rendered unless told not to. You can read about this [here](TODO).

Each other package you add to your template will need to be added to the render process. Now there are many ways on how to add a package but for the purpose of this intro guide we will keep it simple. -->

## Making a new package

<!-- Lets add a package to our `hello-world` template. We will create a package named `hello` and add a `world.js` inside. You can do this two ways:
 -->

To make a new package use the bash comands

```bash
mkdir ./.tps/<template>/<package-name>

touch ./.tps/<template>/<package-name>/world.js

# or

tps new package <template> <package-name>

touch ./.tps/<template>/<package-name>/world.js
```

## Using a new package

Add the `--packages` flag to your tps create command to add more packages. This flag takes an array of options. You must add `--` right before you start to put the template you want to create so yargs can parse correctly

```bash
tps <template> --packages <package> [packages...] -- <template-name-to-create>
```

#### Example

Say we have a template `package-demo` like this:

    | - .tps/
        | - package-demo/
            | - default/
                | - index.js
            | - package1/
                | - package1.js
            | - package2/
                | - package2.js

Now say you wanted a render a template named `app` with only `index.js` and `package1.js`. Then you would create app like this:

> Note: tps automaticlly picks up default for you so we dont need to add this to packages

```bash
tps package-demo --packages package1 -- app
```

this will generate.

    | - app/
        | - index.js
        | - package1.js

Now say you wanted a render a template named `app` with only `index.js` and `package1.js`. Then you would create app like this:

```bash
tps package-demo --packages package2 -- app
```

    | - app/
        | - index.js
        | - package2.js

Now say you wanted a render a template named `app` with only `index.js` and `package1.js`. Then you would create app like this:

```bash
tps package-demo --packages package1 package2-- app
```

    | - app/
        | - index.js
        | - package1.js
        | - package2.js

[Prev](./templates.md)
[Next](./dynamic-files.md)
