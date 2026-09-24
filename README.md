# Micro Frontends - Vendas

Projeto de estudo de **Micro Frontends** com Angular usando **Module Federation** (`@angular-architects/module-federation`).

## Estrutura

| App | Papel | Porta |
|---|---|---|
| `vendas` | Host — carrega os remotes dinamicamente | 4200 |
| `produtos` | Remote — expõe a listagem de produtos | 4201 |
| `grafico` | Remote — expõe o dashboard/gráfico de vendas | 4202 |

## Como rodar

Em 3 terminais diferentes:

```bash
cd produtos && npm start   # porta 4201
cd grafico && npm start    # porta 4202
cd vendas && npm start     # porta 4200
```

Acesse `http://localhost:4200`.

## Como funciona o Module Federation

A ideia: o **host** não conhece o código dos remotes em tempo de build — ele busca o `remoteEntry.js` de cada um **em tempo de execução** e carrega o componente exposto sob demanda.

### 1. Instalar o module-federation

Em cada app (host e remotes):

```bash
ng add @angular-architects/module-federation --project <nome-do-app> --port <porta>
```

O schematic pergunta se é `host` ou `remote` e já gera o `webpack.config.js`.

### 2. Configurar o remote (expor um componente)

No `webpack.config.js` do remote (ex.: `produtos`), a URL do host **não** entra aqui — o remote só declara o que ele **expõe**:

```js
// produtos/webpack.config.js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'produtos',
  exposes: {
    './Component': './src/app/app.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

### 3. Configurar o host (apontar para os remotes)

No `webpack.config.js` do host (`vendas`), entram as URLs dos `remoteEntry.js` de cada remote:

```js
// vendas/webpack.config.js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    produtos: 'http://localhost:4201/remoteEntry.js',
    grafico: 'http://localhost:4202/remoteEntry.js',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

### 4. Configurar as rotas do host

No `app.routes.ts` do host, cada rota carrega o componente do remote sob demanda com `loadRemoteModule`:

```ts
// vendas/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Component',
      }).then(m => m.App),
  },
  {
    path: 'grafico',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Component',
      }).then(m => m.App),
  },
];
```

### 5. Liberar CORS no dev-server dos remotes

Em dev, o navegador bloqueia o `fetch` do `remoteEntry.js` de outra porta se o remote não enviar o header de CORS. Adicione no `webpack.config.js` de cada remote:

```js
module.exports = {
  ...withModuleFederationPlugin({ /* ... */ }),
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};
```

Resumindo: sim, é isso — `ng add module-federation` + apontar as URLs (remote não precisa saber do host, só o host precisa saber dos remotes) + rotas no host com `loadRemoteModule`. O único passo extra é o CORS no dev-server, que costuma ser o erro mais comum ao integrar.
