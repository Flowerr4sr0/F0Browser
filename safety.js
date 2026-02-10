let blacklist = [];

fetch("blacklist.txt")
.then(r => r.text())
.then(text => {
    blacklist = text.split("\n").map(x => x.trim().toLowerCase());
});

function isBlocked(url) {

    try {
        const domain = new URL(url).hostname.toLowerCase();

        return blacklist.some(b => domain.includes(b));
    } catch {
        return false;
    }
}
