# Packages

In this section, We will be covering the following topics:

- Package breakdown
- Making a new package
- Using a new package

We will be using the previous `hello-world` repo for all examples in this section:

> All commands examples assume your cwd is our `tps-example` repo

    | - tps-example/
        | - .tps/
            | - hello-world
                | - default
                    | - index.js

## Package breakdown

Packages are the meat of a template. They decided which folders/files to add to your new template. A package is nothing special either, its only a directory. The `default` package will always be rendered unless told not to. You can read about this [here](TODO).

Each other package you add to your template will need to be added to the render process. Now there are many ways on how to add a package but for the purpose of this intro guide we will keep it simple.

## Making a new package

Lets add a package to our `hello-world` template. We will create a package named `hello` and add a `world.js` inside. You can do this two ways:

```bash
mkdir ./.tps/hello-world/hello

touch ./.tps/hello-world/hello/world.js

# or

tps new package hello-world hello

touch ./.tps/hello-world/hello/world.js
```

## Using a new package (TODO)

Now that we have our new package lets generate a template:

```
tps hello-world --packages
```

[Prev](./templates.md)
[Next](./dynamic-files.md)
