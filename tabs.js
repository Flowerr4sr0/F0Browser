let tabs = [];
let activeTab = null;

function createTab(url = "https://floweryt6.github.io/Flower%20Search/") {

    const id = "tab" + Date.now();

    const iframe = document.createElement("iframe");
    iframe.dataset.id = id;

    document.getElementById("browserArea").appendChild(iframe);

    tabs.push({ id, iframe, history: [], index: -1 });

    addTabButton(id);
    switchTab(id);

    loadURL(url);
}

function addTabButton(id) {

    const tabBtn = document.createElement("div");
    tabBtn.className = "tab";
    tabBtn.innerText = "New Tab";
    tabBtn.dataset.id = id;

    tabBtn.onclick = () => switchTab(id);

    document.getElementById("tabs").appendChild(tabBtn);
}

function switchTab(id) {

    activeTab = tabs.find(t => t.id === id);

    document.querySelectorAll("iframe").forEach(f => f.style.display = "none");
    activeTab.iframe.style.display = "block";

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelector(`.tab[data-id="${id}"]`).classList.add("active");
}
