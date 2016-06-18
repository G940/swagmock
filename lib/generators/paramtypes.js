'use strict';
var Generators = require('./index');

module.exports = {
    query: queryMock,
    path: queryMock,
    formData: queryMock,
    header: queryMock,
    body: bodyMock
};

var collectionFormat = {
    csv : function (val) {
        return val.join(',');
    },
    ssv: function (val) {
        return val.join(' ');
    },
    tsv: function (val) {
        return val.join('\t');
    },
    pipes: function (val) {
        return val.join('|');
    },
    multi: function (val, name) {
        return val.map(function (elem) {
            return name + '=' + elem
        }).join('&');
    }
}
/**
 * TODO : Handle type `file`
 */
function queryMock(param) {
    var mock;
    var value = Generators.mock(param);
    var seperator = collectionFormat.csv;
    //`collectionFormat` Determines the format of the array if type array is used.
    // Possible values are: csv, ssv, tsv. pipes and multi
    if (param.type === 'array' && param.collectionFormat) {
        seperator = collectionFormat[param.collectionFormat] || collectionFormat.csv;
        value = seperator(value, param.name);
    }
    mock = {
        name: param.name,
        value: value
    };
    //Add a special seperator field to identify the multi seperator
    if (param.collectionFormat === 'multi') {
        mock.seperator = 'multi';
    }
    return mock;
}

function formDataMock(param) {
    return {
        name: param.name,
        value: Generators.mock(param)
    }
}

function bodyMock(param) {
    return {
        name: param.name,
        value: Generators.mock(param.schema)
    }
}
