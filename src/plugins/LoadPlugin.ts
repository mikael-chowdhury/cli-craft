import { Plugin } from "./Plugin";
import { PluginRegistry } from "./PluginRegistry";

export const LoadPlugin = (plugin: Plugin): void => {
  PluginRegistry.Set(plugin.name, plugin);

  plugin.initPlugins();
  plugin.initRenderers();
  plugin.onReady();
};
