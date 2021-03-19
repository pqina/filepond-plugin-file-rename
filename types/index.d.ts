// @ts-ignore
import { FilePondOptions } from "filepond";

declare module "filepond" {
  export interface FilePondOptions {
    /** Enable or disable file renaming */
    allowFileRename?: boolean;

    /** A function that receives an objecting containing file information like basename, extension and name. It should return either a string value or a Promise that resolves with a string value. */
    fileRenameFunction?:
      | undefined
      | null
      | ((options: {
          basename: string;
          extension: string;
          name: string;
        }) => string)
      | Promise<string>;
  }
}
