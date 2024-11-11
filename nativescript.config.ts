import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.defrostapp',
  appPath: 'src',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  preview: {
    android: false,
    ios: false
  }
} as NativeScriptConfig;