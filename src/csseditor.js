// Script to ensure up to a length that the CSS the user types stays within the preview box.

export default function CSSEditor(css) {
  const bodyRegex = /^body{$|^body {$/g;
  const anotherRegex = /,/g;

  if (typeof css !== "string") {
    throw new Error("Invalid Type passed");
  }

  let splitcss = css.split("\n");

  for (let line in splitcss) {
    // Going by the css line by line.
    if (bodyRegex.test(splitcss[line])) {
      splitcss[line] = splitcss[line].replace(bodyRegex, ".previewBox{");
    }

    if (
      splitcss[line].includes("{") &&
      !splitcss[line].includes(".previewBox")
    ) {
      splitcss[line] = ".previewBox " + splitcss[line];

      if (anotherRegex.test(splitcss[line])) {
        splitcss[line] = splitcss[line].replace(anotherRegex, ",.previewBox "); // Multiple Occurances.
      }
    }
  }

  return splitcss.join("\n");
}
