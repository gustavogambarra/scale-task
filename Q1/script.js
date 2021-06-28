function getAPI(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

let page = 1;

function getData() {
    let data = getAPI(`https://reqres.in/api/users?page=${page}`);
    let dataObject = JSON.parse(data);
    return dataObject
}

const data = getData();

function getUsers() {
    const users = []

    for (page; page <= data.total_pages; page++) {
        let data = getData();
        for (let j = 0; j < data.per_page; j++) {
            users.push(data.data[j])
        }
    }
    return users
}

const users = getUsers();

//=========================================================

const state = {
    page: 1,
    perPage: data.per_page,
    totalPage: data.total_pages
}

console.log(users)

console.log(data)

const html = {
    get(element) {
        return document.querySelector(element)
    }
}

const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage
        if (lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--

        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1
        }

        state.page = page

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        })

        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        })
        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        })
        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
}

const list = {
    create(item) {
        const tr = document.createElement('tr')
        const tdAvatar = document.createElement("td");
        const tdName = document.createElement("td");
        const tdEmail = document.createElement("td");

        tdAvatar.innerHTML = `<img src=${item.avatar} alt="">`
        tdName.innerHTML = `<p>${item.first_name} ${item.last_name}</p>`
        tdEmail.innerHTML = `<a href='mailto:${item.email}'>${item.email}</a>`

        tr.appendChild(tdAvatar);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);

        tr.classList.add('item')

        html.get('.list').appendChild(tr)


    },
    update() {
        html.get('.list').innerHTML = ""

        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage

        const paginatedItems = users.slice(start, end)

        paginatedItems.forEach(list.create)
    }
}

const pageIndex = {
    update() {
        html.get('.numbers').innerHTML = `${state.page}/${state.totalPage}`;
    }
}

function update() {
    list.update()
    pageIndex.update()
}

function init() {
    update()
    controls.createListeners()
}

init()