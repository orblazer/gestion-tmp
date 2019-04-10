import { WebsiteTemplateModule, Lang } from '~/lib/enum'
import { User } from './user'
import Lib from '../lib'
import { JSONType } from '@types'

declare namespace Website {
  interface Field {
    name: string;
    value: string | string[];
  }

  interface WebsiteTemplateField {
    type: string;
    localize?: Lang;
    name: string;
    label: string;
    errorName?: string;
    placeholder?: string;
    validate?: JSONType;
    options?: { name: string; value: string }[];
  }

  interface WebsiteTemplate {
    readonly _id: string;
    name: string;
    description: string;
    version: string;
    enabled: boolean;
    createdAt: Date;
    author: User;
    modules: WebsiteTemplateModule[];
    localization: Lang[];
    fields: WebsiteTemplateField[];
    file: Lib.UploadedFile;
    preview: Lib.UploadedImage;
  }

  interface Website {
    readonly _id: string;
    ftp: {
      host: string;
      user: string;
      password: string;
      directory: string;
    };
    name: string;
    description: string;
    url: string;
    createdAt: Date;
    users: User[];
    template: WebsiteTemplate;
    enabledModules: WebsiteTemplateModule[];
    fields?: Field[];
    enabled: boolean;
  }

  type WebsiteType = Website | null
}

export = Website
