# Prompting Object


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Name](#name)
  - [Usage](#usage)
  - [Description](#description)
  - [Example](#example)
- [tpsType](#tpstype)
  - [Usage](#usage-1)
  - [Description](#description-1)
  - [Example](#example-1)
- [Aliases](#aliases)
  - [Usage](#usage-2)
  - [Description](#description-2)
  - [Example](#example-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Name

### Usage

Field: `name`

Type: `string`

### Description

Name of the prompt. The name of the prompt you enter will be available inside of your `.dot` files as `tps.config.<name-you-pass-in>`

### Example

##### json

```json
{
  "prompts": [
    {
      "name": "some-name"
    }
  ]
}
```

##### Javascript

```javascript
module.exports = {
  "prompts: [
    {
      name: "some-name"
    }
  ]
}
```

## tpsType

### Usage

Field: `tpsType`

Type: `string`

Choices: `"data" | "package"`

Default: `"package"`

### Description

Data type in tps. Can either be `"data"` or `"package"`. If not property is specified it will default to `"package"`.

#### package

When tps type is package. The answer of the question will be used to try and get a package from your template.

###### Boolean

when an boolean answer is passed in and the value is true. tps will try to find a package using the value you passed in as the `name` field. If the boolean is false tps doesn't wont render any addition packages.

###### string

when an string answer is passed in. tps will try to find a package with the value of the string

###### array

when an array answer is passed in. tps will try to use find packages with all values that were passed in.

### Example

##### json

```json
{
  "prompts": [
    {
      "tpsType": "data"
    }
  ]
}
```

##### Javascript

```javascript
module.exports = {
  "prompts: [
    {
      "tpsType": "data
    }
  ]
}
```

## Aliases

### Usage

Field: `aliases`

Type: `string[]`

### Description

Allow the prompt to be answered with the following aliases. Instead of having to use the `name` field to answer this prompt it can also be answered with any of the following aliases you pass in

### Example

##### json

```json
{
  "prompts": [
    {
      "name": "real-name",
      "aliases": ["alias1", "alias2"]
    }
  ]
}
```

##### Javascript

```javascript
module.exports = {
  "prompts: [
    {
      name: "real-name",
      aliases: ["alias1", "alias2"]
    }
  ]
}
```

<!--
### Field: _*_

#### Usage

Field: `_`

Type: `_`

#### Description

_

#### Example

##### json

```json
{
  "prompts": [
    {
      "_": _
    }
  ]
}
```

##### Javascript

```javascript
module.exports = {
  "prompts: [
    {
      "_": _
    }
  ]
}
```

-->
