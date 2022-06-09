// Ajax , Callback ,  hhtp request


class Request {
    constructor() {
        this.xhr = new XMLHttpRequest()

    }

    // Get Request

    get(url, callback) {
        this.xhr.open("GET", url)

        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, this.xhr.responseText)
            } else {
                callback("Herhangi bir hata oluştu", null)
            }
        }

        this.xhr.send();
    }

}
function loading(text, type, style) {
    let list = document.getElementById("loading");
    list.className = `btn btn-${type}`
    list.innerText = text
    list.style.display = style
}
const request = new Request()
request.get("https://jsonplaceholder.typicode.com/albums/1/photos", function (err, response) {
    if (err === null) {
        function getText() {
            setTimeout(function (callback) {
                loading("yükleniyor...", "success", "block")
                callback(pushText())
            }, 2000)
        }
        function pushText() {
            setTimeout(function () {
                let listhtml = document.getElementById("cardlist")
                const emp = JSON.parse(response)
                emp.forEach(function (e) {
                    listhtml.innerHTML += `
                    <div class="card" id=card style="width: 20rem; float:left;"> 
                        <img src="${e.url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${e.title}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>`
                })
                loading("", "", "none")
            }, 2000)
        }
        getText(pushText)

    } else {
        console.log(err)
    }
})
