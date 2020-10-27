export const copyToClipboard = function(copyData) {
    const copy = require('clipboard-copy')
    copy(copyData);
};