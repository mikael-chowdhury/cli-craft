"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = exports.PluginRegistry = exports.LoadPlugin = void 0;
const FilePathPrompt_1 = require("./FilePathPrompt");
var LoadPlugin_1 = require("./LoadPlugin");
Object.defineProperty(exports, "LoadPlugin", { enumerable: true, get: function () { return LoadPlugin_1.LoadPlugin; } });
var PluginRegistry_1 = require("./PluginRegistry");
Object.defineProperty(exports, "PluginRegistry", { enumerable: true, get: function () { return PluginRegistry_1.PluginRegistry; } });
exports.plugins = { FilePathPrompt: FilePathPrompt_1.FilePathPrompt };
