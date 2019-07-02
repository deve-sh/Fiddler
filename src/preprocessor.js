// Function to sanitize the javascript entered by the user so it doesn't mess with the real DOM.

function jsPreprocessor(js) {
  let regex = /document.get/g,
    regex1 = /document.write/g,
    regex2 = /document.body/g,
    regex3 = /localStorage.getItem("sandboxes")|localStorage.getItem('sandboxes')|localStorage.getItem(`sandboxes`)|localStorage.sandboxes/g;

  let newjs = js.replace(
    regex,
    `document.getElementsByClassName('previewBox')[0].get`
  );
  newjs = newjs.replace(regex1, `// document.write`); // Commenting out any instance of document.write and the rest of the line. Doesn't matter if its in a comment.
  newjs = newjs.replace(
    regex2,
    `document.getElementsByClassName('previewBox')[0]`
  );
  newjs = newjs.replace(regex3, `// localStorage.getItem('')`);
  return newjs;
}

export default jsPreprocessor;
