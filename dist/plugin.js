var capacitorQonversion = (function (exports, core) {
    'use strict';

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

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
