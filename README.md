# stock-buddy
1. `yarn watch`
2. add as unpacked extension to Chrome


# Dev
* some weird dev bugs w/ parcel on WSL2, need to test on mac
    * `parcel watch --no-hmr src/{background.js, content-script.js}` is not catching updates to files, this worked on WSL1 so it's confusing and not a well documented bug.