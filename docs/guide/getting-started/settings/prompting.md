# Prompting

In this section, We will be covering the following topics:


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Prompt breakdown](#prompt-breakdown)
- [How to use Prompting?](#how-to-use-prompting)
  - [Name](#name)
  - [Type](#type)
  - [Tps Type](#tps-type)
  - [Aliases](#aliases)
- [Inquirer](#inquirer)
  - [booleans Example](#booleans-example)
  - [Lists Examples](#lists-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Prompt breakdown

Prompting is exactly what you think it is. Its used to get data from the user. through the command line we will display a message to the user asking for there response. The prompt can also be answered by supplying a flag through the command line or through the node module package for cases where users already know what they want. There options can come in all forms.

Templates uses [inquirer](https://github.com/SBoudrias/Inquirer.js#inquirerjs)
 for prompting. Any property that you can use in inquirer can be used when creating prompts. See more about inquirer properties [here](https://github.com/SBoudrias/Inquirer.js#question)


## How to use Prompting?

In order to use prompting features. We need to add a settings file in our template folder. Don't remember what the setting file is? See the [settings files guide](./README.md)

Inside of the settings file add a `prompts` property. The value of this field will be an array of prompt objects.

```
{
  "prompts": []
}
```

Each prompt you add to needs to be a object. Well touch on some important fields that are required.

### Name

First the `name` field. Now this field is required for prompting to work. This name will be used later on so you can access the values the user entered in, from inside of each dynamic file. All prompt answers will be stored on the `tps.answers` object property.

#### Example

##### how to use

Say I create a prompt thats name field is `age`.

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

Then in a dynamic file I can access the age property like so:

```js
{{=tps.answers.age}}
```

##### Answering prompts through the command line

In order to answer this prompt through the command line use the name of the prompt as a command line flag when calling your create command. If we were to have a `react-component` template that had the same settings file as the above example we would pass the name `age` as an command line flag `--age` like so:

```bash
tps react-component <template-to-render> --age <value>
```

`<value>` can be either a array of strings, string, or a booleans. Here is how you use each one

###### boolean

If the value type is a boolean then you have no value to enter in. So you'll end up with something like this.

```bash
--age

# or for false

--no-age
```

###### string

If the value type is a string then you will pass in the words or numbers right after the flag. So you'll end up with something like this.

```bash
--age 23

# or

--age less

# if your value has spaces then you need to do this

--age "hey there everyone"
```

###### list

If the value type is an list then you end up with something like this.

```bash
--age 23 45 65

# or
--age ten nine five
```

> Note: using list types can be difficult when using multiple flags etc. Tps uses yargs for its command line parser. You can refer how to pass in list of arguments [here](http://yargs.js.org/docs/#api-arraykey)

when using lists on the command line you might need to tweak how your passing in your flags. If you have a list right next to your build paths then you need to separate them with a `--`.

```bash
tps <some-template> --age 23 24 25 -- app
```

if the list is next to another flag then this is fine.

```bash
tps <some-template> --age 23 24 25 --some-bool-flag app
```

##### Answering prompts through the module

To answer prompts in javascript using the module. Use the `setAnswers` function.

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

tps.setAnswers({ age: data });

/* ... */
```

---

### Type

The second property is `type`. This property will tell inquirer what type of prompting you would like to use. You can see more about this property in the [inquirer question docs](https://github.com/SBoudrias/Inquirer.js#question).

```json
{
  "type": "confirm | input | checkbox | list | rawlist | password"
}
```

---

### Tps Type

The third field is `tpsType`. This field tells tps how it should process the users answer. There are two options `package` or `data`.

> Note: If you don't specify a `tpsType` field. Tps will use `package` by default.

#### package

```json
{
  "tpsType": "package"
}
```

When you have `package` as the `tpsType`, tps will try to use the users value to render a package that is in your template. Different values passed in will have different behaviors.

###### boolean

When the answer to a prompt is a boolean and the value is true. Tps will use the [name of the prompt](#name) and will try to find a package with same name. If there is a package with the same name as the prompt, then tps will include that package in the rendering process of the new template. When the value is false. tps will just ignore the prompt and will not include any additional packages.

say were rendering a new template and we have a prompt like so

`settings.json`

```json
{
  "prompts": [
    {
      "name": "some-name",
      "tpsType": "package",
      "type": "confirm" // <--- makes prompt accept booleans
    }
  ]
}
```

When the user is rendering a new template ^ the prompt will be displayed and they can answer. Now when they answer yes or true, tps will try and find a package in your template.

    | - .tps/
        | - <the-template-being-used>/
            | - default/
                | - readme.md
            | - some-name/        <-- the package that matches name
                | - random-file.md

Now if tps finds the package, it will use it in the rendering process. so if you were rendering a new template `app`. then app would look like this

    | - app/
        | - readme.md
        | - readom-file.md

> see how to answer through the command line [here](#boolean)

If a package is not found. tps will complain and throw an error.

###### string

when the answer is a string or in other words a word/name. tps will use that answer and will try to find a package that matches the answer.

`settings.json`

```json
{
  "prompts": [
    {
      "name": "some-name",
      "tpsType": "package",
      "type": "input" // <--- makes prompt accept strings
    }
  ]
}
```

now when the user renders a new template. tps will ask for an input. Whatever the user answers, tps will take that value and try to find a package that matches the answer. In this case say the answer was `some-answer`.

    | - .tps/
        | - <the-template-being-used>/
            | - default/
                | - readme.md
            | - some-answer/        <-- the package that matches answer
                | - answer-file.md

Since tps has the package, the package will be included in the rendering process. so if you were rendering a new template `app`. then app would look like this

    | - app/
        | - readme.md
        | - answer-file.md

> see how to answer through the command line [here](#string)

If a package is not found. tps will complain and throw an error.

###### list

Having an list of strings as the answer is the same as having [one string](#string) but it will try to find packages for each value and will use all the packages in the rendering process.

`settings.json`

```json
{
  "prompts": [
    {
      "name": "some-name",
      "tpsType": "package",
      "type": "list" // <--- one of the ones thast makes prompt accept list of strings
    }
  ]
}
```

now when the user renders a new template. tps will ask for an list of inputs. Whatever the user answers, tps will take all of the values and try to find a packages that matches the answers. In this case say the answer was `some-answer` and `some-answer-2`.

    | - .tps/
        | - <the-template-being-used>/
            | - default/
                | - readme.md
            | - some-answer/        <-- the package that matches answer
                | - answer-file.md
            | - some-answer-2/        <-- other package that matches answer
                | - answer-file-2.md
            | - some-answer-3/        <-- package that doesnt match answer
                | - answer-file-3.md

Since tps has the package, the package will be included in the rendering process. so if you were rendering a new template `app`. then app would look like this

    | - app/
        | - readme.md
        | - answer-file.md
        | - answer-file-2.md

`answer-file-3.md` is not there because answers were only `some-answer` and `some-answer-2`.

> see how to answer through the command line [here](#list)

If any of the packages are not found, tps will complain and throw an error.

#### data

```json
{
  "tpsType": "data"
}
```

When you have `data` as the `tpsType`. Tps will do nothing to the data. Thats right, nothing. This data type is meant so you can get additional information from the user and you will do something with this information. The most common use case for this is to conditionally render some code on the file when the user answers with a certain answer.

say we have a template like this

    | - .tps/
        | - <the-template-being-used>/
            | - default/
                | - readme.md.dot
            | - settings.json

`settings.json`

```json
{
  "prompts": [
    {
      "name": "type",
      "tpsType": "data",
      "type": "input"
    }
  ]
}
```

Now inside of the `readme.md.dot`. we could conditionally render some text when the user responds in a certain way.

`readme.md.dot`

```md
# My readme

{{? tps.answers.type === "new"}}
This is a new repo
{{?? tps.answers.type === "old"}}
This is a old repo
{{?}}
```

---

### Aliases

The next field is `aliases`. This allows the user to be able to answer the prompt with any of the aliases you add through the command line or with the modules version.

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

Now through the command line, if you wanted a less package.

```bash
tps react-component App -c less

# is equivalent to

tps react-component App --cssType less

# is equivalent to and answering prompt with `less`

tps react-component App
```

##### Node module

Now through the module version, if you wanted a `less` package.

```js
const Templates = require('tps');

const tps = new Templates('react-component');

tps.setAnswers({ c: 'less' });

// is equivalent to

tps.setAnswers({ cssType: 'less' });

// is equivalent to and answering prompt with `less`

tps.render(/* ... */);
```

Review our [api docs](../../../api/templates/settings/prompting.md) for all fields.

---

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

[Back](./README.md)

[Next](../tpsrc.md)
