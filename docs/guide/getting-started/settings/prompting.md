# Prompting

In this section, We will be covering the following topics:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is Prompting?](#what-is-prompting)
- [How to use Prompting?](#how-to-use-prompting)
- [Prompt breakdown](#prompt-breakdown)
  - [Name](#name)
  - [Tps Type](#tps-type)
  - [Aliases](#aliases)
- [Inquirer](#inquirer)
  - [booleans Example](#booleans-example)
  - [Lists Examples](#lists-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is Prompting?

Prompting is used to get data from the user. Its exactly what you think it is. Threw the command line we will display a message to the user asking for there response. The the prompt can also be answered threw the command line or threw the node module package for cases where users already know what they want. There options can come in all forms.

Templates uses [inquirer](./TODO)
to prompt for user responses. Any property that you can use in inquirer can be used when creating prompts. See more about inquirer properties [here](https://github.com/SBoudrias/Inquirer.js#question)

## How to use Prompting?

In order to use prompting features. We need to add a settings file in our template folder. This settings file can be either an `settings.json` or `settings.js` file. This file needs to be placed in your template folder at the same level as your packages.

The setting file needs to be a valid json object or for a js file it needs to return a javascript object.

Next add the prompting property to your settings file like described [here](./README.md#prompting).

Now the prompt property takes a array of objects.

Review our api docs for prompting [here](../../../api/templates/settings/prompting.md) to see what values you can pass in.

## Prompt breakdown

Each prompt you add to needs to be a object. Well touch on some important fields that are required.

### Name

First the `name` field. Now this field is required for tps to work. This name will be used later on so you can access the values the user enters in from inside of each dynamic file or aka `.dot` file. All prompt answers will be stored on the `tps.answers` object property.

Users can also answer the prompt threw the command line or with the module version with whatever value you passed in as name. This is meant for the users that don't want to wait to answer the prompt.

#### Example

##### how to use

Say I create a prompt thats name field is `age`. This will be accessible in `index.js.dot` with

`settings.json`

```json
{
  "prompts": [
    {
      "name": "age"
      // ...
    }
  ]
}
```

`index.js.dot`

```js
{{=tps.answers.age}}
```

##### Answering prompts threw the command line

Now in order to answer this prompt threw the command line. say we have the following template:

    | - tps-example
        | - .tps/
            | - react-component/
                | - settings.json
                | - default/

Now well use the same `settings.json` from the example above. In order to answer the prompt from the command line. We need to call it like this.

```bash
tps react-component <template-to-render> --age <value>
```

`<value>` can be either a array of strings, string, or a boolean.

If the value type is a boolean then you end up with something like this.

```bash
--age

# or for false

--no-age
```

If the value type is a string then you end up with something like this.

```bash
--age 23

# or

--age less
```

If the value type is an array then you end up with something like this.

```bash
--age 23 45 65
```

> Note: using array type can be difficult when using multiple flags or etc. Tps uses yargs for its command line parser. You can refer how to pass in array arguments [here](http://yargs.js.org/docs/#api-arraykey)

##### Answering prompts threw the module

To answer prompts in javascript using the module. Use the `loadConfig` function.

```js
const Templates = require('tps');

const tps = new Templates('react-component');

/**
 * Just like the command line passing in data supports strings, numbers, and arrays
 * @example string
 *  const data = '23';
 * @example number
 *  const data = 23;
 * @example boolean
 *  const data = true;
 * @example array
 *  const data = [23, 45, 65];
 */
const data = 23;

tps.loadConfig({ age: data });

/* ... */
```

### Tps Type

The second field is `tpsType`. Now this field will allow you to tell tps how you want to process the user data. There are two options `package` or `data`.

> Note: If you don't specify a `tpsType` field. Tps will use `package` by default.

When you have `package` as the `tpsType`, tps will try to use the users value to render a package that is in your template. Different values passed in will have different behaviors. All different types of behaviors can be viewed [here](../../../api/templates/settings/prompting.md#package).

#### Example

As a brief example well be going over what happens when the prompt accepts a string. Say you have this template:

    | - tps-example
        | - .tps/
            | - react-component/
                | - settings.json
                | - default/
                    | - index.js
                | - css
                    | - {{=tps.name}}.css
                | - less
                    | - {{=tps.name}}.less

Now if we add this prompt to our template

`settings.json`

```json
{
  "prompts": [
    {
      "name": "cssType",
      "message": "What css language would you like to use",
      "type": "input" // <- Dont worry about this field for now we will touch more on it in a moment.
    }
  ]
}
```

> Having input as type will prompt the user, in the command line, the string you have as message.
> See inquirer type input example [here](https://github.com/SBoudrias/Inquirer.js#input---type-input)

Having `input` as the type will allow the user to pass in a string. So say the user entered `less` after calling the following command.

```bash
tps react-component App
```

Tps will take this answer and load the `less` package and render this template.

    | - tps-example
        | - .tps/
            | - ...
        | - App
            | - index.js
            | - App.less

Now if the user answers `css` then it will use the `css` package and render:

    | - tps-example
        | - .tps/
            | - ...
        | - App
            | - index.js
            | - App.css

<!-- The object can take the following properties as arguments -->

### Aliases

The next field is `aliases`. This allows the user to be able to answer the prompt with any of the aliases you add threw the command line or with the modules version.

#### Example

`settings.json`

```json
{
  "prompts": [
    {
      "name": "cssType",
      /* ... */
      "aliases": ["c"]
    }
  ]
}
```

##### Command Line

Now threw the command line, if you wanted a less package.

```bash
tps react-component App -c less

# is equivalent to

tps react-component App --cssType less

# is equivalent to and answering prompt with `less`

tps react-component App
```

##### Node module

Now threw the module version, if you wanted a `less` package.

```js
const Templates = require('tps');

const tps = new Templates('react-component');

tps.loadConfig({ c: 'less' });

// is equivalent to

tps.loadConfig({ cssType: 'less' });

// is equivalent to and answering prompt with `less`

tps.render(/* ... */);
```

## Inquirer

Like mentioned before, Tps uses inquirer for prompting. This mean we can use any of inquirer properties also. Here are some examples:

### booleans Example

Say you have this react component template:

    | - tps-example
        | - .tps/
            | - react-component/
                | - settings.json
                | - default/
                    | - index.js
                | - css
                    | - {{=tps.name}}.css

Adding this prompt will allow you to conditionally render the css package

```json
{
  "prompts": [
    {
      "name": "css",
      "type": "confirm",
      "message": "Would you like to add a css file?"
    }
  ]
}
```

Now if the user answers true like so:

```
tps react-component App --css
```

then this will be the new template:

    | - tps-example
        | - .tps/
            | - ...
        | - App
           | - index.js
           | - App.css

Now if the user answers false like so:

```
tps react-component App --no-css
```

then this will be the new template:

    | - tps-example
        | - .tps/
            | - ...
        | - App
           | - index.js

### Lists Examples

```json
{
  "prompts": [
    {
      "name": "modules",
      "type": "checkbox",
      "choices": ["react", "express", "fs", "path"],
      "tpsType": "data",
      "message": "What node modules would you like to import into this js file?"
    }
  ]
}
```

[Prev](./README.md)

<!-- [Next](./prompting.md) -->