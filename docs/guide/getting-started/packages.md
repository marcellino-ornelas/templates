# Packages

In this section, We will be covering the following topics:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Package breakdown](#package-breakdown)
  - [Default package](#default-package)
  - [More than one package](#more-than-one-package)
  - [More than one package but only default](#more-than-one-package-but-only-default)
- [Making a new package](#making-a-new-package)
- [Using a new package](#using-a-new-package)
- [Examples](#examples)
  - [Including more packages](#including-more-packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> All commands examples assume your cwd is our `tps-example` repo

    | - tps-example/
        | - .tps/

## Package breakdown

Packages are the meat of a template. But its also, nothing special either. Its only a directory that will hold more files and directories. The package's files and folders are used when rendering your template.

All packages live inside of a tps `template` folder

    | - .tps/
        | - <some-template>/
            | - <packages...>/

`packages` can be named whatever you like except for one. Each `template` can optionally have a `default` package. Each time you render a template, TPS will automatically use everything inside your `default` package to build your template. Every other package that you want to be rendered must be specified when rendering the template.

Packages are used to enhance a template or add extra features when a user wants them. Its kind of like a conditional.

If that doesn't make sense then think of it this way. Imaging rendering a template was like ordering a cheeseburger. Now a basic cheeseburger will probably come with meat, lettuce, and cheese. But! if you wanted to make the cheeseburger more tasty and awesome. You can "add" more ingredients like bacon, mushrooms, and etc _("our packages")_.

---

### Default package

If we were rendering a new template called `app`, then tps will create a directory named `app` and put of the contents from your `default` package and place it into `app`.

    | - .tps/
        | - <template>/
            | - default/
                | - <all of the default package files/folders...>

    | - app/
        | - <all of the default package files/folders...>

---

### More than one package

If your rendering a template thats going to use additional packages. All of the files and folders, from the packages you use, will be included when rendering that template. If we were to render a new template called `app` and also use an additional package `package2`. then both `default` and `package2` files and folders will be copied over to `app`. You can have and include as many packages as you wish.

    | - .tps/
        | - <template>/
            | - default/
                | - <default files/folders...>
            | - package2/
                | - <package2 files/folders...>

    | - app/
        | - <default files/folder...>
        | - <package2 files/folders...>

---

### More than one package but only default

If you have more than one package but don't specific that you want to use any additional ones. Your app folder will only be the files and folders from `default`.

    | - .tps/
        | - <template>/
            | - default/
                | - <default files/folders...>
            | - package2/
                | - <package2 files/folders...>

    | - app/
        | - <default files/folders...>

## Making a new package

To make a new package use the bash commands

```bash
mkdir ./.tps/<template>/<package-name>

touch ./.tps/<template>/<package-name>/<package-files...>

# or

tps new package <template> <package-name>

touch ./.tps/<template>/<package-name>/<package-files...>
```

## Using a new package

Add the `--packages` flag to your tps create command to add more packages. This flag takes an array of options. You must add `--` right before you start to put the template you want to create so [yargs](http://yargs.js.org/)
can parse correctly

```bash
tps <template> --packages <package> [packages...] -- <template-name-to-create>
```

## Examples

Say we have a template `package-demo` like this:

    | - .tps/
        | - package-demo/
            | - default/
                | - index.js
            | - package1/
                | - package1.js
            | - package2/
                | - package2.js

---

### Including more packages

Now say you wanted a render a template named `app` with only `index.js` and `package1.js`. Then you would create `app` like this:

```bash
tps package-demo --packages package1 -- app
```

> Note: tps automaticlly uses the default package so we don't need to add this to our list of packages

this will generate.

    | - app/
        | - index.js
        | - package1.js

Now say you wanted a render a template named `app` with only `index.js` and `package2.js`. Then you would create `app` like this:

```bash
tps package-demo --packages package2 -- app
```

    | - app/
        | - index.js
        | - package2.js

Now say you wanted a render a template named `app` with all three. Then you would create `app` like this:

```bash
tps package-demo --packages package1 package2 -- app
```

    | - app/
        | - index.js
        | - package1.js
        | - package2.js

[Back](./README.md)
[Next](./dynamic-files.md)
