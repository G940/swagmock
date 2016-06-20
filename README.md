# swagmock
Mock data generator for swagger api

## Install

```
npm install swagmock
```

## Usage

```javascript
    var apiPath = 'http://petstore.swagger.io/v2/swagger.json';
    var Swagmock = require('swagmock');
    var mockgen = Swagmock(apiPath);

    mockgen.responses({
        path: '/pet/findByStatus',
        operation: 'get',
        response: 200
    }, function (error, mock) {

        console.log(mock);
        //This would print:
        // {
        //     "responses": [{
        //         "id": 2530624032210944,
        //         "category": {
        //             "id": 8200505595527168,
        //             "name": "r($vA&"
        //         },
        //         "name": "doggie",
        //         "photoUrls": ["p0x1", "6O)3*kO"],
        //         "tags": [{
        //             "id": 4590764340281344,
        //             "name": "WCTA6f!"
        //         }, {
        //             "id": -4614156653166592,
        //             "name": "e"
        //         }],
        //         "status": "pending"
        //     }]
        // }
    });

    mockgen.parameters({
        path: '/pet/findByStatus',
        operation: 'get'
    }, function (error, mock) {

        console.log(mock);
        //This would print:
        // {
        //     "parameters": {
        //         "query": [{
        //             "name": "status",
        //             "value": "status=available&status=pending",
        //             "separator": "multi"
        //         }]
        //     }
        // }
    });
```

## API

`Swagmock(apiPath)`

* `apiPath` - (*String*) - (required) - The url or local path of the Swagger api.

## responses

`mockgen.responses(options, callback)`

This generates the mock response objects based on the `options`

* `options` - (*Object*) - (required) - Options to control the mock generation.

* `callback` -  (*Function*) - (required) - `function (error, mock)`.

### options

* `path` - (*String*) - (optional) - The path for which the response mock need to be generated. For example `/pet/findByStatus`, `/pet` etc. If a `path` is not specified, mock response will be generated for all the paths defined by the swagger api.

* `operation` - (*String*) - (optional) - The operation for which the response mock need to be generated. For example `get`, `post` etc. If `operation` is not specified, mock response will be generated for all the operations defined by the swagger api.

* `response` - (*String*) - (optional) - The response for which the response mock need to be generated. For example `200`, `400`, `default` etc. If `response` is not specified, mock response will be generated for all the responses defined by the swagger api.

## parameters

`mockgen.parameters(options, callback)`

This generates the mock parameters objects based on the `options`

* `options` - (*Object*) - (required) - Options to control the mock generation.

* `callback` -  (*Function*) - (required) - `function (error, mock)`.

### options

* `path` - (*String*) - (optional) - The path for which the parameters mock need to be generated. For example `/pet/findByStatus`, `/pet` etc. If a `path` is not specified, mock parameters will be generated for all the paths defined by the swagger api.

* `operation` - (*String*) - (optional) - The operation for which the parameters mock need to be generated. For example `get`, `post` etc. If `operation` is not specified, mock parameters will be generated for all the operations defined by the swagger api.
