function addDiacritics(word) {
  let newWord = word;
  const substitutions = {
    cx: "ĉ",
    gx: "ĝ",
    hx: "ĥ",
    jx: "ĵ",
    sx: "ŝ",
    ux: "ŭ"
  }
  Object.keys(substitutions).forEach((digraph) => {
    newWord = newWord.replace(new RegExp(digraph, "g"), substitutions[digraph])
  })
  return newWord;
}

export default addDiacritics;