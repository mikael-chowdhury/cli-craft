"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadPlugin = void 0;
const PluginRegistry_1 = require("./PluginRegistry");
const LoadPlugin = (plugin) => {
    PluginRegistry_1.PluginRegistry.Set(plugin.name, plugin);
    plugin.initPlugins();
    plugin.initRenderers();
    plugin.onReady();
};
exports.LoadPlugin = LoadPlugin;
