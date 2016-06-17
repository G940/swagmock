'use strict';
var Chance = require('chance').Chance();
var Format = require('./format');

var Generators = module.exports = {
    object: objectMock,
    array: arrayMock,
    string: stringMock,
    integer: integerMock,
    number: numberMock,
    boolean: booleanMock,
    mock: mock
};

function mock(schema) {
    var mock;
    if (schema) {
        var type = schema.type;
        var example = schema.examples || schema.example;
        /**
         * Use examples as Mock if provided
         */
        if (example) {
            mock = example;
        } else if (type) {
            /**
             * Get the mock generator from the `type` of the schema
             */
            var generator = Generators[type];
            if (generator) {
                mock = generator.call(null, schema);
            }
        }
    }
    return mock;
}

function objectMock(schema) {
    var mockObj = {};
    var props = schema.properties;
    if (props) {
        Object.keys(props).forEach(function (key) {
            mockObj[key] = mock(props[key]);
        });
    /**
     * In the absense of `properties`, check if `additionalProperties` is defined or not.
     * (If additionalProperties is an object, that object is a schema that will be used to validate
     * any additional properties not listed in properties.)
     *
     * If present, use this to generate mocks.
     */
    } else if (schema.additionalProperties) {
        //Create a random property
        mockObj[Chance.word()] = mock(schema.additionalProperties);
    }
    return mockObj;
}

function arrayMock(schema) {
    var items = schema.items;
    var min = 0;
    var max = 1;
    var arr = [];

    if (items) {
        if (schema.minItems) {
            min = schema.minItems;
        }
        if (schema.maxItems) {
            max = schema.maxItems;
        }
        for (; min <= max; min++) {
            arr.push(mock(items));
        }
    }
    return arr;
}

function integerMock(schema) {
    var opts = {};
    if (schema.minimum) {
        opts.min = schema.minimum;
    }
    if (schema.maximum) {
        opts.max = schema.maximum;
    }
    return Chance.integer(opts);
}

function numberMock(schema) {
    var opts = {};
    if (schema.minimum) {
        opts.min = schema.minimum;
    }
    if (schema.maximum) {
        opts.max = schema.maximum;
    }
    return Chance.floating(opts);
}

function booleanMock() {
    return Chance.bool();
}

function stringMock(schema) {
    var mockStr;
    var opts = {};
    var minLength = schema.minLength || 1;
    var maxLength = schema.maxLength || minLength + 10;
    opts.min = minLength;
    opts.max = maxLength;

    if (schema.enum && schema.enum.length > 0) {
        /**
         * If `enum` is defined for the property
         */
        mockStr = enumMock(schema);
    } else if(Format[schema.format]) {
        /**
         * If a `format` is defined for the property
         */
        mockStr = Format[schema.format].call(null, schema);
    } else {
        mockStr = Chance.string({
            length: Chance.integer(opts)
        });
    }

    return mockStr;
}

function enumMock(schema) {
    var len = schema.enum.length;
    var opts = {
        min: 0,
        max: len - 1
    };
    return schema.enum[Chance.integer(opts)];
}
