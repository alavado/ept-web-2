export const urltoFile = (url, filename, mimeType) => fetch(url)
  .then(res => res.arrayBuffer())
  .then(buf => new File([buf], filename, { type: mimeType }))