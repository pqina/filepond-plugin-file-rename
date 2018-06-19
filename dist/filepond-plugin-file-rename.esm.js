/*
 * FilePondPluginFileRename 1.0.1
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */
var plugin$1 = ({ addFilter, utils }) => {
  // get quick reference to Type utils
  const {
    Type,
    renameFile,
    isFile,
    getExtensionFromFilename,
    getFilenameWithoutExtension
  } = utils;

  // called for each file that is loaded
  // right before it is set to the item state
  // should return a promise
  addFilter(
    'LOAD_FILE',
    (file, { query }) =>
      new Promise((resolve, reject) => {
        // reject
        const allowFileRename = query('GET_ALLOW_FILE_RENAME');
        const renameFunction = query('GET_FILE_RENAME_FUNCTION');
        if (!isFile(file) || !allowFileRename || !renameFunction) {
          resolve(file);
          return;
        }

        resolve(
          renameFile(
            file,
            renameFunction({
              name: file.name,
              basename: getFilenameWithoutExtension(file.name),
              extension: `.${getExtensionFromFilename(file.name)}`
            })
          )
        );
      })
  );

  return {
    options: {
      // Enable or disable file renaming
      allowFileRename: [true, Type.BOOLEAN],

      // Rename function to run for this
      fileRenameFunction: [null, Type.FUNCTION]
    }
  };
};

if (typeof navigator !== 'undefined' && document) {
  // plugin has loaded
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin$1 })
  );
}

export default plugin$1;
