
function doesPopupExist() {
    const popupExists = document.querySelector("#stock-buddy-popup");
    if (popupExists) {
        return true
    }
    return false
}


function updatePopupWithStockInfo(stock) {
    // fetch("https://query1.finance.yahoo.com/v8/finance/chart/GME?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance", {
    //     "headers": {
    //       "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
    //       "sec-ch-ua-mobile": "?0"
    //     },
    //     "referrer": "https://finance.yahoo.com/quote/GME?p=GME&.tsrc=fin-srch",
    //     "referrerPolicy": "no-referrer-when-downgrade",
    //     "body": null,
    //     "method": "GET",
    //     "mode": "cors",
    //     "credentials": "omit"
    //   }).then(response => {
    //       console.log(response.json());
    //   });
}

function createPopup(left, top) {
    var popup = document.createElement('iframe');
    popup.classList.add("stock-buddy-popup");
    popup.style = "position: absolute; z-index:2147483647;"
    popup.style.left = `${left}px`
    popup.style.top = `${top}px`
    popup.id = "stock-buddy-popup"
    popup.src = "https://google.com"
    // container.appendChild(popup)
    document.body.appendChild(popup);
}

function updatePopup(left, top) {
    const renderedPopup = document.querySelector("#stock-buddy-popup");
    renderedPopup.style.left = `${left}px`
    renderedPopup.style.top = `${top}px`
}

function replaceStonks() {
    var reg = /[$]\w+/gm;
    console.log("RUN!")
    // console.log("run : " + count.toString());
    var elementStack = document.getElementsByTagName('*');
    console.log(elementStack.length);
    for (var i = 0; i < elementStack.length; i++) {
        var element = elementStack[i];
        if (element.text && reg.test(element.text) && !element.classList.contains("stock-buddy-seen")) {
            element.classList.add("stock-buddy-seen");
        }    
    }
}


function addEventListeners() {
    const stonks = document.querySelectorAll(".stock-buddy-seen");
    stonks.forEach(stonk => {
        stonk.addEventListener("mouseover", e => {
            if (!doesPopupExist()) {
                createPopup(e.pageX, e.pageY);
                updatePopupWithStockInfo(e.target.text);
            } else {
                updatePopup(e.pageX, e.pageY);
                updatePopupWithStockInfo(e.target.text);
            }
        });
        // stonk.addEventListener("mouseout", e => {
        //     // destroyPopup();
        //     console.log('destroy this');
        // });
    });
}

setTimeout(replaceStonks, 2000);
setTimeout(addEventListeners, 4000);