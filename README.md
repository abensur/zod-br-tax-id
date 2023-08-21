# Zod Brazilian Tax Ids
[![npm version](https://badge.fury.io/js/zod-br-tax-id.svg)](https://badge.fury.io/js/zod-br-tax-id)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Installation

`pnpm add zod-br-tax-id`
`npm i zod-br-tax-id`
`yarn add zod-br-tax-id`

## Usage with Zod

```typescript
import { z } from 'zod';
import { cpf, cnpj } from 'zod-br-tax-id';

const schema = z.object({
  cpf: cpf(),
  cnpj: cnpj({ strict: true, message: 'Invalid CNPJ, only number are allowed' }),
  optionalCpf: z.union([z.literal(''), cpf()]),
  undefinedCnpj: z.union([z.undefined(), cnpj()]),
});

try {
    schema.parse({
        cpf: '123.456.789-00',
        cnpj: '12.345.678/0001-00',
        optionalCpf: '',
        undefinedCnpj: undefined,
    });
} catch  (err) {
    if (err instanceof z.ZodError) {
        console.log(err.issues);
    }
}

```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| strict | boolean | false | If true, also invalidates masked strings |
| message | string | 'Invalid CPF/CNPJ' | Custom error message |