# Settings

In this section, We will be covering the following topics:


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is a settings file?](#what-is-a-settings-file)
- [How to use settings?](#how-to-use-settings)
- [Settings options](#settings-options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## What is a settings file?

Templates allows you to have a settings file in your template to add certain actions/configurations when generating your template. The main use for this file is prompting but well be adding more features very soon. _To be continued_

## How to use settings?

Create a `settings.json` or `settings.js` in your template folder at the same level as your packages. If you chosen to create a json file then it needs to be a valid json object. If you created a js file then it needs to export a valid js object.

    | - .tps
        | - <some-template>
            | - default
            | - settings.json

json file

```json
{}
```

js file

```js
module.exports = {};
```

## Settings options

you can see a full list of possible fields for a settings file in the [settings file api docs](../../../api/templates/settings/settings.md). In this guide well be going over these topics:

- [Prompting](./prompting.md)

[Back](../dynamic-files.md)
[Next](./prompting.md)
