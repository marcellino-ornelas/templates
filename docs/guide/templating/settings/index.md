# Settings

In this section, We will be covering the following topics:

- What is a settings file?
- How to use settings?

## What is a settings file?

Templates allows you to have a settings file in your template to add certain actions when generating your template. This settings file can be either an `settings.json` or `settings.js`.

## How to use settings?

Create a settings file in your template folder
In order to use prompting features. We need to add a settings file in our template folder. This settings file can be either an `settings.json` or `settings.js` file. This file needs to be placed in your template folder at the same level as your packages.

The setting file needs to be a valid json object or for a js file it needs to return a javascript object.

The object can take the following properties as arguments

## Settings options

- [Prompting](./prompting.md)

### Prompting

**Field:** `prompts`
**Type:** `Array<Object>`

### json

```json
{
  "prompts": []
}
```

### Javascript

```javascript
module.exports = {
  "prompts: []
}
```

[Prev](../dynamic-files.md)
[Next](./prompting.md)
