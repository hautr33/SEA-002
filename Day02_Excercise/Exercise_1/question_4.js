// Write the function get the get the Extension of file: “image.png” => “png”. “Sound.mp3” => “mp3”

function getFileExtension(filename) {
    if (typeof filename !== 'string') return ''
    const parts = filename.split('.')
    return parts.length > 1 ? parts.pop().toLowerCase() : ''
}
const testFilenames = ['document.pdf', 'image.jpeg', 'archive.zip', 'script.js', 'noExtension']
testFilenames.forEach((filename) => {
    if (getFileExtension(filename) === '') {
        console.log(`The file "${filename}" dont has extension.`)
    }
    else {
        console.log(`The file "${filename}" has the extension "${getFileExtension(filename)}".`)
    }
});  