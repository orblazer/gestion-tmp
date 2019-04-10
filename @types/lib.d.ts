declare namespace Lib {
  interface UploadedFile {
    id: false | string;
    filename: string;
    mimetype: string;
    encoding: string;
    path: string;
    fullPath: string;
    folderPath: string;
  }

  interface UploadedImage extends UploadedFile {
    thumbnail?: string;
    preview?: string;
  }
}

export = Lib
