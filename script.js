
function useTicket() {
    const currentCount = parseInt(localStorage.getItem("ticketCount") || "15");
    if (currentCount <= 0) {
        alert("使えるチケットはありません。");
        return;
    }

    const confirmed = confirm("こちらのチケットを使用しますか？");
    if (!confirmed) return;

    const newCount = currentCount - 1;
    localStorage.setItem("ticketCount", newCount.toString());

    const display = document.getElementById("ticket-count-display");
    display.textContent = "残り" + newCount + "枚";

    const now = new Date();
    const timestamp = now.toLocaleString("ja-JP");
    const entry = `1回増加チケット使用 - ${timestamp}`;

    const history = JSON.parse(localStorage.getItem("ticketHistory") || "[]");
    history.unshift(entry);
    if (history.length > 10) history.length = 10;
    localStorage.setItem("ticketHistory", JSON.stringify(history));

    const list = document.getElementById("history-list");
    if (list) {
        list.innerHTML = "";
        history.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
    }
}

window.onload = function() {
    const count = parseInt(localStorage.getItem("ticketCount") || "15");
    const display = document.getElementById("ticket-count-display");
    if (display) display.textContent = "残り" + count + "枚";

    const history = JSON.parse(localStorage.getItem("ticketHistory") || "[]");
    const list = document.getElementById("history-list");
    if (list) {
        list.innerHTML = "";
        history.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
    }
}
