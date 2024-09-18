'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const Qonversion = core.registerPlugin('Qonversion', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.QonversionWeb()),
});

class QonversionWeb extends core.WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    QonversionWeb: QonversionWeb
});

exports.Qonversion = Qonversion;
//# sourceMappingURL=plugin.cjs.js.map
