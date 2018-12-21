define({ "api": [
  {
    "type": "delete",
    "url": "/api/product/:id",
    "title": "DELETE",
    "group": "Product",
    "description": "<p>Deletes the product with the specified <code>id</code> field.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Product unique <code>id</code>.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of the product that was deleted.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiProductId",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/product/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ProductNotFound",
            "description": "<p>No product with the <code>id</code> could be found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ObjectIdInvalid",
            "description": "<p>The <code>id</code> for the request is not a correct MongoDb ObjectId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ObjectIdInvalid:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"(PUT) /api/product/asd | Invalid request: 1 error occured\",\n  \"errors\": [\n   \"params[id] = asd | Specified param Id is invalid, must be an ObjectId\",\n  ],\n  \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "ProductNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error updating product: Product not found\",\n  \"code\": 404\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/product/:id",
    "title": "GET",
    "name": "GetProductById",
    "group": "Product",
    "description": "<p>Gets the product with the specified <code>id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Product unique <code>id</code>.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>The product with the specified <code>id</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"product\": {\n   \"_id\": \"5c1996e35e015bc3483c153b\",\n   \"name\": \"MOVISTAR\",\n   \"code\": \"A\",\n   \"kind\": 0,\n   \"amounts\": [\n     {\n       \"amount\": 10,\n       \"description\": \"\"\n     },\n     {\n       \"amount\": 30,\n       \"description\": \"\"\n     },\n     {\n       \"amount\": 60,\n       \"description\": \"\"\n     },\n     {\n       \"amount\": 80,\n       \"description\": \"\"\n     },\n     {\n       \"amount\": 120,\n       \"description\": \"\"\n     },\n     {\n       \"amount\": 200,\n       \"description\": \"\"\n     },\n     {\n       \"amount\": 300,\n       \"description\": \"\"\n     }\n   ],\n   \"providerId\": \"NEW-VISION\",\n   \"paymentCurrency\": \"MXN\",\n   \"icon\": \"BASE64ICON OR URL\",\n   \"extra\": {},\n   \"timeout\": 60000,\n   \"supportsReversal\": false,\n   \"supportsCheckStatus\": false,\n   \"observation\": \"Alcanzando 30s se declina la recarga\",\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/ProductController.ts",
    "groupTitle": "Product",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/product/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ProductNotFound",
            "description": "<p>No product with the <code>id</code> could be found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ObjectIdInvalid",
            "description": "<p>The <code>id</code> for the request is not a correct MongoDb ObjectId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ObjectIdInvalid:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"(PUT) /api/product/asd | Invalid request: 1 error occured\",\n  \"errors\": [\n   \"params[id] = asd | Specified param Id is invalid, must be an ObjectId\",\n  ],\n  \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "ProductNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error updating product: Product not found\",\n  \"code\": 404\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/product",
    "title": "GETALL",
    "name": "GetProducts",
    "group": "Product",
    "description": "<p>Gets all products in the catalogue.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products in the catalogue.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/ProductController.ts",
    "groupTitle": "Product",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/product"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/product",
    "title": "CREATE",
    "group": "Product",
    "description": "<p>Creates the product provided as a payload.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>The new product data to update the product with the given <code>id</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Create product Request-Example:",
          "content": "{\n  \"name\": \"MOVISTAR\",\n  \"code\": \"A\",\n  \"kind\": 0,\n  \"amounts\": [\n    {\n      \"amount\": 10,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 30,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 60,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 80,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 120,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 200,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 300,\n      \"description\": \"\"\n    }\n  ],\n  \"providerId\": \"NEW-VISION\",\n  \"paymentCurrency\": \"MXN\",\n  \"icon\": \"BASE64ICON OR URL\",\n  \"extra\": {},\n  \"timeout\": 60000,\n  \"supportsReversal\": false,\n  \"supportsCheckStatus\": false,\n  \"observation\": \"Original comment\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>The product that was inserted in the database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Create product Success-Response:",
          "content": "{\n  \"_id\": \"5c1996e35e015bc3483c153b\",\n  \"name\": \"MOVISTAR\",\n  \"code\": \"A\",\n  \"kind\": 0,\n  \"amounts\": [\n    {\n      \"amount\": 10,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 30,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 60,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 80,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 120,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 200,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 300,\n      \"description\": \"\"\n    }\n  ],\n  \"providerId\": \"NEW-VISION\",\n  \"paymentCurrency\": \"MXN\",\n  \"icon\": \"BASE64ICON OR URL\",\n  \"extra\": {},\n  \"timeout\": 60000,\n  \"supportsReversal\": false,\n  \"supportsCheckStatus\": false,\n  \"observation\": \"Original comment\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProduct",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/product"
      }
    ],
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ProductFieldsInvalid",
            "description": "<p>The fields for the product payload are missing or incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ProductFieldsInvalid (1):",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n    \"message\": \"(POST) /api/product | Invalid request: 8 errors occured\",\n    \"errors\": [\n        \"body[name] = undefined | Name field must be present\",\n        \"body[code] = undefined | Product code field must be present\",\n        \"body[amounts] = undefined | Must be an array of {amount(number), description(string)}\",\n        \"body[providerId] = undefined | A provider id must be included\",\n        \"body[paymentCurrency] = undefined | A valid currency must be specified\",\n        \"body[timeout] = undefined | A timeout must be specified\",\n        \"body[supportsReversal] = undefined | SupportsReversal field must be included\",\n        \"body[supportsCheckStatus] = undefined | SupportsCheckStatus field must be included\"\n    ],\n    \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "ProductFieldsInvalid (2):",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n   \"message\": \"(POST) /api/product | Invalid request: 7 errors occured\",\n   \"errors\": [\n       \"body[code] = 0 | Product code field must be a valid non whitespace string\",\n       \"body[kind] = 55 | Product kind must be an int: 0, 1 or 2\",\n       \"body[amounts[0].amount] = -1 | Amount must be a valid, positive number: e.g. 25,000 or 256.78\",\n       \"body[providerId] = undefined | A provider id must be included\",\n       \"body[paymentCurrency] = Wrong | PaymentCurrency field must be uppercase\",\n       \"body[timeout] = -1 | Timeout field must be a positive integer\",\n       \"body[observation] = 0 | Oservation field must be a valid string\"\n   ],\n   \"code\": 422\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/product/:id",
    "title": "UPDATE",
    "group": "Product",
    "description": "<p>Overrides the product with the specified <code>id</code> field with the payload.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Product unique <code>id</code>.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>The new product data to update the product with the given <code>id</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update product Request-Example:",
          "content": "{\n  \"_id\": \"5c1996e35e015bc3483c153b\",\n  \"name\": \"MOVISTAR\",\n  \"code\": \"A\",\n  \"kind\": 0,\n  \"amounts\": [\n    {\n      \"amount\": 10,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 30,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 60,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 80,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 120,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 200,\n      \"description\": \"\"\n    },\n    {\n      \"amount\": 300,\n      \"description\": \"\"\n    }\n  ],\n  \"providerId\": \"NEW-VISION\",\n  \"paymentCurrency\": \"MXN\",\n  \"icon\": \"BASE64ICON OR URL\",\n  \"extra\": {},\n  \"timeout\": 60000,\n  \"supportsReversal\": false,\n  \"supportsCheckStatus\": false,\n  \"observation\": \"Updated comment\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>The updated product.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Succes-Response:",
          "content": "{\n \"product\": {\n    \"_id\": \"5c1996e35e015bc3483c153b\",\n    \"name\": \"MOVISTAR\",\n    \"code\": \"A\",\n    \"kind\": 0,\n    \"amounts\": [\n      {\n        \"amount\": 10,\n        \"description\": \"\"\n      },\n      {\n        \"amount\": 30,\n        \"description\": \"\"\n      },\n      {\n        \"amount\": 60,\n        \"description\": \"\"\n      },\n      {\n        \"amount\": 80,\n        \"description\": \"\"\n      },\n      {\n        \"amount\": 120,\n        \"description\": \"\"\n      },\n      {\n        \"amount\": 200,\n        \"description\": \"\"\n      },\n      {\n        \"amount\": 300,\n        \"description\": \"\"\n      }\n    ],\n    \"providerId\": \"NEW-VISION\",\n    \"paymentCurrency\": \"MXN\",\n    \"icon\": \"BASE64ICON OR URL\",\n    \"extra\": {},\n    \"timeout\": 60000,\n    \"supportsReversal\": false,\n    \"supportsCheckStatus\": false,\n    \"observation\": \"Updated comment\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductId",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/product/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ProductNotFound",
            "description": "<p>No product with the <code>id</code> could be found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ObjectIdInvalid",
            "description": "<p>The <code>id</code> for the request is not a correct MongoDb ObjectId.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "ProductFieldsInvalid",
            "description": "<p>The fields for the product payload are missing or incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ObjectIdInvalid:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"(PUT) /api/product/asd | Invalid request: 1 error occured\",\n  \"errors\": [\n   \"params[id] = asd | Specified param Id is invalid, must be an ObjectId\",\n  ],\n  \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "ProductNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error updating product: Product not found\",\n  \"code\": 404\n}",
          "type": "json"
        },
        {
          "title": "ProductFieldsInvalid (1):",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n    \"message\": \"(POST) /api/product | Invalid request: 8 errors occured\",\n    \"errors\": [\n        \"body[name] = undefined | Name field must be present\",\n        \"body[code] = undefined | Product code field must be present\",\n        \"body[amounts] = undefined | Must be an array of {amount(number), description(string)}\",\n        \"body[providerId] = undefined | A provider id must be included\",\n        \"body[paymentCurrency] = undefined | A valid currency must be specified\",\n        \"body[timeout] = undefined | A timeout must be specified\",\n        \"body[supportsReversal] = undefined | SupportsReversal field must be included\",\n        \"body[supportsCheckStatus] = undefined | SupportsCheckStatus field must be included\"\n    ],\n    \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "ProductFieldsInvalid (2):",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n   \"message\": \"(POST) /api/product | Invalid request: 7 errors occured\",\n   \"errors\": [\n       \"body[code] = 0 | Product code field must be a valid non whitespace string\",\n       \"body[kind] = 55 | Product kind must be an int: 0, 1 or 2\",\n       \"body[amounts[0].amount] = -1 | Amount must be a valid, positive number: e.g. 25,000 or 256.78\",\n       \"body[providerId] = undefined | A provider id must be included\",\n       \"body[paymentCurrency] = Wrong | PaymentCurrency field must be uppercase\",\n       \"body[timeout] = -1 | Timeout field must be a positive integer\",\n       \"body[observation] = 0 | Oservation field must be a valid string\"\n   ],\n   \"code\": 422\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/purchase/externalId/:externalId",
    "title": "GET",
    "name": "GetPurchaseByExternalId",
    "group": "Purchase",
    "description": "<p>Gets the purchase with the specified <code>externalId</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "externalId",
            "description": "<p>Purchase unique <code>externalId</code>.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "purchase",
            "description": "<p>The purchase with the specified <code>externalId</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"purchase\": {\n        \"_id\": \"5c199729cfa9d647882640a9\",\n        \"product\": \"AIL\",\n        \"user\": \"5c1996e35e015bc3483c153b\",\n        \"destination\": \"5529714880\",\n        \"amount\": 200,\n        \"comment\": \"super padre\",\n        \"statusLog\": [\n            {\n                \"updatedAt\": \"2018-12-19T00:56:09.231Z\",\n                \"code\": 0,\n                \"message\": \"INIT_PURCHASE\"\n            }\n        ],\n        \"createdAt\": \"2018-12-19T00:56:09.251Z\",\n        \"updatedAt\": \"2018-12-19T00:56:09.251Z\",\n        \"externalId\": \"000000000001\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/PurchaseController.ts",
    "groupTitle": "Purchase",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/purchase/externalId/:externalId"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "PurchaseNotFound",
            "description": "<p>No purchase with the specified identifier could be found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ExternalIdInvalid",
            "description": "<p>The <code>id</code> for the request is not a external id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ExternalIdInvalid:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n    \"message\": \"(GET) /api/purchase/externalId/56 | Invalid request: 1 error occured\",\n    \"errors\": [\n        \"params[externalId] = 56 | Specified param extenralId is invalid, must be a 12 digit number as a string\"\n    ],\n    \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "PurchaseIdNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error finding purchase: Purchase item not found\",\n  \"code\": 404\n}",
          "type": "json"
        },
        {
          "title": "PurchaseExternalIdNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(PUT) /api/product/externalId/000000000007 |  Error finding purchase: Purchase item not found\",\n  \"code\": 404\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/purchase/:id",
    "title": "GET",
    "name": "GetPurchaseById",
    "group": "Purchase",
    "description": "<p>Gets the purchase with the specified <code>id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Purchase unique <code>id</code>.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "purchase",
            "description": "<p>The purchase with the specified <code>id</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"purchase\": {\n        \"_id\": \"5c199729cfa9d647882640a9\",\n        \"product\": \"AIL\",\n        \"user\": \"5c1996e35e015bc3483c153b\",\n        \"destination\": \"5529714880\",\n        \"amount\": 200,\n        \"comment\": \"super padre\",\n        \"statusLog\": [\n            {\n                \"updatedAt\": \"2018-12-19T00:56:09.231Z\",\n                \"code\": 0,\n                \"message\": \"INIT_PURCHASE\"\n            }\n        ],\n        \"createdAt\": \"2018-12-19T00:56:09.251Z\",\n        \"updatedAt\": \"2018-12-19T00:56:09.251Z\",\n        \"externalId\": \"000000000001\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/PurchaseController.ts",
    "groupTitle": "Purchase",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/purchase/:id"
      }
    ],
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "PurchaseNotFound",
            "description": "<p>No purchase with the specified identifier could be found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ObjectIdInvalid",
            "description": "<p>The <code>id</code> for the request is not a correct MongoDb ObjectId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ObjectIdInvalid:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"(PUT) /api/product/asd | Invalid request: 1 error occured\",\n  \"errors\": [\n   \"params[id] = asd | Specified param Id is invalid, must be an ObjectId\",\n  ],\n  \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "PurchaseIdNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error finding purchase: Purchase item not found\",\n  \"code\": 404\n}",
          "type": "json"
        },
        {
          "title": "PurchaseExternalIdNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(PUT) /api/product/externalId/000000000007 |  Error finding purchase: Purchase item not found\",\n  \"code\": 404\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/purchase/user/:id",
    "title": "GET",
    "name": "GetPurchasesByClientId",
    "group": "Purchase",
    "description": "<p>Gets all the purchase associated to a specified client <code>id</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique <code>id</code>.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "purchases",
            "description": "<p>The purchases with the specified client <code>id</code>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"purchases\": [\n     {\n         \"_id\": \"5c199729cfa9d647882640a9\",\n         \"product\": \"AIL\",\n         \"user\": \"5c1996e35e015bc3483c153b\",\n         \"destination\": \"5529714880\",\n         \"amount\": 200,\n         \"comment\": \"super great\",\n         \"statusLog\": [\n             {\n                 \"updatedAt\": \"2018-12-19T00:56:09.231Z\",\n                 \"code\": 0,\n                 \"message\": \"INIT_PURCHASE\"\n             }\n         ],\n         \"createdAt\": \"2018-12-19T00:56:09.251Z\",\n         \"updatedAt\": \"2018-12-19T00:56:09.251Z\",\n         \"externalId\": \"000000000001\",\n         \"__v\": 0\n     },\n     {\n         \"_id\": \"5c1a5522babc4291c8286293\",\n         \"product\": \"AYN\",\n         \"user\": \"5c1996e35e015bc3483c153b\",\n         \"destination\": \"5529714880\",\n         \"amount\": 20,\n         \"comment\": \"super nice\",\n         \"statusLog\": [\n             {\n                 \"updatedAt\": \"2018-12-19T14:26:42.762Z\",\n                 \"code\": 0,\n                 \"message\": \"INIT_PURCHASE\"\n             },\n             {\n                 \"updatedAt\": \"2018-12-19T14:26:43.155Z\",\n                 \"code\": 1,\n                 \"message\": \"PURCHASE_SUCCEEDED\"\n             }\n         ],\n         \"createdAt\": \"2018-12-19T14:26:42.782Z\",\n         \"updatedAt\": \"2018-12-19T14:26:43.159Z\",\n         \"externalId\": \"000000000002\",\n         \"__v\": 0\n     },\n     {\n         \"_id\": \"5c1a6305babc4291c8286294\",\n         \"product\": \"ADA\",\n         \"user\": \"5c1996e35e015bc3483c153b\",\n         \"destination\": \"5500000099\",\n         \"amount\": 10,\n         \"comment\": \"super cool\",\n         \"statusLog\": [\n             {\n                 \"updatedAt\": \"2018-12-19T15:25:57.248Z\",\n                 \"code\": 0,\n                 \"message\": \"INIT_PURCHASE\"\n             },\n             {\n                 \"updatedAt\": \"2018-12-19T15:25:57.602Z\",\n                 \"code\": 3,\n                 \"message\": \"PURCHASE_FAILED: NewUision: \\\"Usuario destino no esta registrado\\\"\"\n             }\n         ],\n         \"createdAt\": \"2018-12-19T15:25:57.252Z\",\n         \"updatedAt\": \"2018-12-19T15:25:57.602Z\",\n         \"externalId\": \"000000000003\",\n         \"__v\": 0\n     },\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/PurchaseController.ts",
    "groupTitle": "Purchase",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/purchase/user/:id"
      }
    ],
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ObjectIdInvalid",
            "description": "<p>The <code>id</code> for the request is not a correct MongoDb ObjectId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ObjectIdInvalid:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"(PUT) /api/product/asd | Invalid request: 1 error occured\",\n  \"errors\": [\n   \"params[id] = asd | Specified param Id is invalid, must be an ObjectId\",\n  ],\n  \"code\": 422\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/purchase",
    "title": "CREATE",
    "group": "Purchase",
    "description": "<p>Creates a new purchase and forwards the purchase request to the thid party provider. If the third party provider returns an error a new product is still returned, but with an error status in its <code>statusLog</code>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "purchase",
            "description": "<p>The new purchse data to carry out the purchase operation with the third party.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Create product Request-Example:",
          "content": "{\n\t \"productId\": \"AIL\",\n\t \"user\": \"5c1996e35e015bc3483c153b\",\n\t \"amount\": 300,\n\t \"destination\": 5511829394,\n\t \"comment\": \"This should result in a succesful purchase object with a succesful status (1)\"\n}",
          "type": "json"
        },
        {
          "title": "Create product with third party error Request-Example:",
          "content": "{\n\t \"productId\": \"AIL\",\n\t \"user\": \"5c1996e35e015bc3483c153b\",\n\t \"amount\": 60,\n\t \"destination\": 5500000094,\n\t \"comment\": \"This should result a response 200 but with an error status due to a NV error: rcode 03 'Usuario destino no esta registrado'\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>The product that was inserted in the database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Create product Success-Response:",
          "content": "{\n \"purchase\": {\n     \"_id\": \"5c1bfa07818aa0b36885534d\",\n     \"product\": \"AIL\",\n     \"user\": \"5c1996e35e015bc3483c153b\",\n     \"destination\": \"5511829394\",\n     \"amount\": 300,\n     \"comment\": \"This should result in a succesful purchase object with a succesful status (1)\",\n     \"statusLog\": [\n         {\n             \"updatedAt\": \"2018-12-20T20:22:31.856Z\",\n             \"code\": 0,\n             \"message\": \"INIT_PURCHASE\"\n         },\n         {\n             \"updatedAt\": \"2018-12-20T20:22:32.210Z\",\n             \"code\": 1,\n             \"message\": \"PURCHASE_SUCCEEDED\"\n         }\n     ],\n     \"createdAt\": \"2018-12-20T20:22:31.868Z\",\n     \"updatedAt\": \"2018-12-20T20:22:32.211Z\",\n     \"externalId\": \"000000000009\",\n     \"__v\": 0\n }\n}",
          "type": "json"
        },
        {
          "title": "Create purchase with third party error Response:",
          "content": "{\n   \"purchase\": {\n       \"_id\": \"5c1bfcce818aa0b36885534e\",\n       \"product\": \"AIL\",\n       \"user\": \"5c1996e35e015bc3483c153b\",\n       \"destination\": \"5500000094\",\n       \"amount\": 60,\n       \"comment\": \"This should result a response 200 but with an error status due to a NV error: rcode 03 'Usuario destino no esta registrado'\",\n       \"statusLog\": [\n           {\n               \"updatedAt\": \"2018-12-20T20:34:22.522Z\",\n               \"code\": 0,\n               \"message\": \"INIT_PURCHASE\"\n           },\n           {\n               \"updatedAt\": \"2018-12-20T20:34:22.727Z\",\n               \"code\": 3,\n               \"message\": \"PURCHASE_FAILED: NewUision: \\\"Usuario destino no esta registrado\\\"\"\n           }\n       ],\n       \"createdAt\": \"2018-12-20T20:34:22.525Z\",\n       \"updatedAt\": \"2018-12-20T20:34:22.727Z\",\n       \"externalId\": \"000000000010\",\n       \"__v\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/PurchaseController.ts",
    "groupTitle": "Purchase",
    "name": "PostApiPurchase",
    "sampleRequest": [
      {
        "url": "https://newt-mx-rest-api.azurewebsites.net/api/purchase"
      }
    ],
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "PurchaseProductDoesNotSupportAmount",
            "description": "<p>The specified <code>amount</code> is not supported by the product with <code>productId</code>.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "PurchaseProductNotFound",
            "description": "<p>No product for the purchase with the <code>productId</code> could be found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "NewPurchaseFieldsInvalid",
            "description": "<p>The fields for the new purchase payload are missing or incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NewPurchaseFieldsInvalid (1):",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n    \"message\": \"(POST) /api/purchase | Invalid request: 4 errors occured\",\n    \"errors\": [\n        \"body[productId] = undefined | Product code field must be present\",\n        \"body[user] = undefined | User id must be present\",\n        \"body[destination] = undefined | Must be a valid positive number\",\n        \"body[amount] = undefined | Amount must be a valid positive number\"\n    ],\n    \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "NewPurchaseFieldsInvalid (2):",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"(POST) /api/purchase | Invalid request: 4 errors occured\",\n  \"errors\": [\n      \"body[user] = invalidobjectid | User id must be a valid mongoId\",\n      \"body[destination] = ffffff | Must be a valid positive number\",\n      \"body[amount] = -4 | Amount must be a valid positive number\",\n      \"body[comment] = 0 | Comment must be a valid string\"\n  ],\n  \"code\": 422\n}",
          "type": "json"
        },
        {
          "title": "PurchaseProductNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"(POST) /api/purchase | Error creating purchase: Product XKXKXK for purchase not found\",\n  \"code\": 404\n}",
          "type": "json"
        },
        {
          "title": "PurchaseProductDoesNotSupportAmount:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"message\": \"(POST) /api/purchase | Error creating purchase: Specified amount: 20 for purchase not supported by product AIL\",\n \"code\": 400\n}",
          "type": "json"
        }
      ]
    }
  }
] });
