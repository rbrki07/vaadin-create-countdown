import globals from "globals";
import pluginJs from "@eslint/js";
import { fixupPluginRules } from "@eslint/compat";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  { 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  { 
    settings: { 
      react: { 
        version: "18.3.1" 
      } 
    } 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  { 
    plugins: { 
      "react-hooks": fixupPluginRules(pluginReactHooks) 
    } 
  },
  { 
    rules: { 
      "react/react-in-jsx-scope": "off",
      ...pluginReactHooks.configs.recommended.rules 
    } 
  },
];