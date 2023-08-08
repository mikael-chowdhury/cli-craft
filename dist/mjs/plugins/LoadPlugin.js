import { PluginRegistry } from "./PluginRegistry";
export const LoadPlugin = (plugin) => {
    PluginRegistry.Set(plugin.name, plugin);
    plugin.initPlugins();
    plugin.initRenderers();
    plugin.onReady();
};
