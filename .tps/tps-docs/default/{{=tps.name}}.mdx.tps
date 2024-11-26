---
description: Template to generate {{= tps.utils.noCase(tps.name) }}
keywords:
  - {{= tps.utils.noCase(tps.name) }}
  - {{= tps.utils.noCase(tps.name) }} scaffold
  - {{= tps.utils.noCase(tps.name) }} boilerplate
  - {{= tps.utils.noCase(tps.name) }} generator
---

import { TemplateOptions } from '@site/docs/components/templateOptions';
import { Example } from '@site/docs/components/example';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Button } from '@site/docs/components/button';
import { Badge, BadgeList, VersionBadge } from '@site/docs/components/badges';

# {{=tps.name}}
{/*
<BadgeList>
	<Badge type="success">alpha</Badge>
	<VersionBadge version=">=v1.2.3" />
</BadgeList>
*/}

description....

## Usage

```bash title="Usage"
tps {{=tps.name}} <app-name>

# or in a directory

tps {{=tps.name}} path/to/dir/<app-name>
```

```txt title="Creates"
| - <app-name>/
    | ...
```

<Example>

<Tabs>

<TabItem value="default">

```bash
tps {{=tps.name}} funny-gifs
```

</TabItem>

<TabItem value="long build path">

```bash
tps {{=tps.name}} projects/funny-gifs
```

</TabItem>

</Tabs>

</Example>

Check out our [examples section](#examples) to see detailed instructions on how
to use this template.

## Installation

This templates is a part of Templates library. If you've already installed
Templates, you'll have instant access to this template, and you can disregard
this command.

```bash
npm i -g templates-mo
```

## Options

<TemplateOptions template="{{=tps.name}}" type="js" />

## Copy

If you like this template, but want to modify a few things use the copy command.
It allows you to duplicate the template into your project and tailor it to your
needs.

```bash
# if your not initialized run
tps init

# copy template
tps copy {{=tps.name}}
```

## Examples

### How to use

...