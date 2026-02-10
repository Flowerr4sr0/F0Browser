const input = document.getElementById("urlInput");
const icon = document.getElementById("pageIcon");

function formatURL(text) {

    if (!text.startsWith("http")) {

        if (text.includes(".")) return "https://" + text;

        return "https://google.com/?q=" + encodeURIComponent(text);
    }

    return text;
}

function navigate() {
    loadURL(formatURL(input.value));
}

function loadURL(url) {

    if (!activeTab) return;

    if (isBlocked(url)) {
        return showError("blacklisted");
    }

    const tab = activeTab;

    tab.history.splice(tab.index + 1);
    tab.history.push(url);
    tab.index++;

    loadFrame(url);
}

function loadFrame(url) {

    const frame = activeTab.iframe;
    let loaded = false;

    frame.src = url;
    input.value = url;

    frame.onload = () => {

        loaded = true;
        updateTitle();
        updateIcon();

        try {
            frame.contentWindow.location.href;
        } catch {
            showError("refused-to-connect");
        }
    };

    setTimeout(() => {
        if (!loaded) showError("timeout");
    }, 5000);
}

function updateTitle() {

    try {
        const title = activeTab.iframe.contentDocument.title;
        document.querySelector(`.tab[data-id="${activeTab.id}"]`).innerText = title || "Tab";
    } catch {}
}

function updateIcon() {

    try {
        const doc = activeTab.iframe.contentDocument;
        const fav = doc.querySelector("link[rel*='icon']");

        if (fav) icon.src = fav.href;
    } catch {}
}

function goBack() {

    if (activeTab.index > 0) {
        activeTab.index--;
        loadFrame(activeTab.history[activeTab.index]);
    }
}

function goForward() {

    if (activeTab.index < activeTab.history.length - 1) {
        activeTab.index++;
        loadFrame(activeTab.history[activeTab.index]);
    }
}

function reloadPage() {
    loadFrame(activeTab.history[activeTab.index]);
}

function showError(type) {

    activeTab.iframe.src =
        `https://flowerr4sr0.github.io/F0Browser/error.html?error=${type}`;
}

/* Start with one tab */
createTab();
