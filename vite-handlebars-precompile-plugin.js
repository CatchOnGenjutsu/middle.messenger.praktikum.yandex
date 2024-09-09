import Handlebars from "handlebars";
import { PluginOptions } from "vite";

export default function handlebarsPrecompilePlugin() {
  const fileRegex = /\.hbs$|\.handlebars$/;

  return {
    name: "vite-handlebars-precompile-plugin",
    transform(src, id) {
      if (!fileRegex.test(id)) {
        return;
      }
      debugger;
      const code = `
        import Handlebars from "handlebars/runtime";
        export default Handlebars.template(${Handlebars.precompile(src)});
      `;
      return {
        code,
      };
    },
  };
}
