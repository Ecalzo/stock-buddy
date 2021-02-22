import cssText from "bundle-text:../dist/style.css";

const html =
`
<style>${cssText}</style>

<section id="popup" class="font-sans text-black z-50 w-full fixed top-0 right-0 shadow-xl new-event-form bg-white max-w-sm border-2 border-black p-5 rounded-lg border-b-6">
  <header class="flex mb-5 pl-1 items-center justify-between">
    <span id="stock-name-container" class="text-2xl text-black font-extrabold">New event!</span>
  </header>
</section>
`

const shadowHost = document.createElement("div");
shadowHost.id = "stock-buddy-dom"
document.body.insertAdjacentElement("beforebegin", shadowHost);
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

shadowRoot.innerHTML = html;

function updatePopup(left, top, stock) {
  const stockContainer = shadowRoot.querySelector("#stock-name-container");
  const renderedPopup = shadowRoot.querySelector("#popup");
  renderedPopup.style.left = `${left}px`
  renderedPopup.style.top = `${top - window.scrollY}px`
  stockContainer.textContent = stock;
}

function labelGivenStonks(queue) {
  let q = Array.from(queue)
  let labelled = [];
  let reg = /[$]\w+/gm;
  let curr;
  while (curr = q.pop()) {
    if (curr.nodeName == "SPAN" && reg.test(curr.textContent)) {
      curr.classList.add("stock-buddy-seen");
      labelled.push(curr);
    }
  }
  return labelled
}

function queryForNewStonks() {
  return Array.from(document.querySelectorAll("span:not(.stock-buddy-seen)"));
}

function labelStonks() {
  let reg = /[$]\w+/gm;
  let queue = queryForNewStonks()
  let curr;
  while (curr = queue.pop()) {
    if (reg.test(curr.textContent)) {
      curr.classList.add("stock-buddy-seen");
      addSingleEventListener(curr);
    }
    // if (queue.length < 2) {
    //   queue = queryForNewStonks()
    // }
  }
}

function doesPopupExist() {
  return false
}

function addSingleEventListener(stonk) {
  stonk.addEventListener("mouseover", e => {
    // if (e.target.text) {
    console.log('hover')
    updatePopup(e.pageX, e.pageY, e.target.text);
    // }
  });
}

function addEventListenersSpecific(stonks) {
  stonks.forEach(stonk => {
    stonk.addEventListener("mouseover", e => {
      if (e.target.text) {
        updatePopup(e.pageX, e.pageY, e.target.text);
      }
    });
  });
}

function addEventListeners() {
  const stonks = document.querySelectorAll(".stock-buddy-seen");
  stonks.forEach(stonk => {
      stonk.addEventListener("mouseover", e => {
          // if (!doesPopupExist()) {
          //     // createPopup(e.pageX, e.pageY);
          //     updatePopup(e.pageX, e.pageY, e.target.text);
          // } else {
          //     updatePopup(e.pageX, e.pageY, e.target.text);
          // }
          if (e.target.text) {
            updatePopup(e.pageX, e.pageY, e.target.text);
          }
        });
        // stonk.addEventListener("mouseout", e => {
          //     // destroyPopup();
          //     console.log('destroy this');
          // });
        });
}

function mutationCallback(mutationList, observer) {
  console.log("the mutation thing triggered")
  mutationList.forEach( (mutation) => {
    console.log(mutation);
    console.log(mutation.addedNodes);
    switch(mutation.type) {
      case 'childList':
        if (mutation.addedNodes.length > 0) {
          let labelledElements = labelGivenStonks(mutation.addedNodes);
          addEventListenersSpecific(labelledElements);
        }
        break;
    }
  })
}

// setTimeout(labelStonks, 2000);
// setTimeout(labelStonks, 6000);
// setTimeout(labelStonks, 10000);

const observerOptions = {
  childList: true,
  attributes: false,
  subtree: true
}
const targetNode = document.body
const observer = new MutationObserver(labelStonks);
observer.observe(targetNode, observerOptions);
