# Tpsrc


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Breakdown](#breakdown)
- [Answering prompts from tpsrc](#answering-prompts-from-tpsrc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Breakdown

Tps allows you to have a configuration file. The configuration file is for users of your template vs the setting file which is for developing your template. The configuration file name is `tpsrc`. In this file you can store predefined answers to prompts and change the way tps behaves when rendering a template. You can have multiple template configurations in this file.

The format of this file is `json`. Like so:

```json
{
  "<template-name>": {}
}
```

When adding configurations to a template replace the `<template-name>` to be the name of your template. This property will hold all configurations to your template.

Say we had a template named `react-component`. Now to add configurations to this template I would put the following inside of my tpsrc

```json
{
  "react-component": {
    /* react-component template specific configs */
  }
}
```

Now if I also had a template `express-app-route` and wanted to also add configurations then the tpsrc files would look something like this

```json
{
  "react-component": {
    /* react-component template specific configs */
  },
  "express-app-route": {
    /* express-app-route template specific configs */
  }
}
```

<!-- So in this tpsrc you can set  -->

To see all of the properties you can use see our [tpsrc api guide](../../api/templates/tpsrc.md)

## Answering prompts from tpsrc

You can set predefined answers for a specific template's prompts. This will prevent the prompt from displaying when you render a new template. When rending a new template it will first read all of the answers in this file and only prompt the user for the ones that still need to be answered. This is useful when you want a template to behave a certain way in a specific directory.

```json
{
  "<template-name>": {
    "answers": {
      "<prompt-name>": "<prompt-answer>"
    }
  }
}
```

> This is very useful when having a global templates.

#### Example

Say we had a global template `react-component`.

    | - ~/
        | - .tps/ <- global tps
            | - react-component/
                | - default/
                    | - index.js.dot
                    | - {{=tps.name}}.js.dot
                    | - {{=tps.name}}.css

The react component template settings file looks like this:

```json
{
  "prompts": [
    {
      "name": "css",
      "type": "confirm",
      "message": "Would you like to include a css file?",
      "default": true
    }
  ]
}
```

Every time you render a new react component template it would prompt you if you would like to use a css file. Since this template is a global template and can be used anywhere. Lets say the repo you are using this in never uses a css file with the react component. After a couple of time this prompt would get really annoying. The solution add a predefined answer inside of your `.tpsrc`. lets say we were working in a repo like this

    | - protfolio
        | - .tps/
            | - .tpsrc
        | - ...

we can add this to our `.tpsrc` file.

```json
{
  "react-component": {
    "answers": {
      "css": false
    }
  }
}
```

Done. Now every time you render a new template it will never ask you again if you want to use a css file

[Prev](./settings/prompting.md)
