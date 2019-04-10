import { ToastOptions, ToastType } from 'vue-toasted'
import Vue from 'vue'

import './process'
import './vue'

import * as Lib from './lib'

import * as User from './database/user'
import * as Website from './database/website'

export type JSONType = object | any[]

export interface Flash {
  type: ToastType|string;
  message: string;
  options: ToastOptions;
}

export type Sidebar = 'website' | 'admin'

export { Lib, User, Website }

declare global {
  interface Window {
    onNuxtReady(callback: (app: Vue) => void): void;
  }
}
