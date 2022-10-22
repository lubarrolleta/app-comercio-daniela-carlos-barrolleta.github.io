import { productos } from "./productos.js"
const variables = {
    apiKey: 'b99019e921971d97a1faf457bfde735b',
    url: 'https://api.themoviedb.org/3/movie/popular?api_key=',
    page: 1,
    vistas: {
        main: document.body,
        resultados: null,
        contenedor: null,
        card: null,
        loading: document.createElement('div')
    },
    data: null,
    loadings: true,
    productos: {
        url: 'https://api.mercadolibre.com/sites/MLC/search?q=silla',
        tope: 48
    },
    isOk: true,
    btns: {
        showCustomProduct: null,
        showProductMl: null
    },
    delay: 2000,
    productosHardcodeados: productos,

    // numeral: 'https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js'



}
const metodos = {
    init: function() {
        // this.cargarPeliculas()
        this.renderInicial()

        variables.btns.showProductMl.addEventListener('click', () => metodos.cargarPeliculas(), false)
        variables.btns.showCustomProduct.addEventListener('click', () => metodos.cargarProductosCustom(), false)
        variables.btns.next.addEventListener('click', (e) => metodos.paginacion('next', e), false)
        variables.btns.back.addEventListener('click', (e) => metodos.paginacion('back', e), false)


    },
    fetchCustom: function(time, task) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (variables.isOk) {
                    resolve(task);
                } else {
                    reject("Error");
                }
            }, time);
        });
    },
    cargarProductosCustom: function() {
        console.log(variables.btns.showCustomProduct)
        variables.vistas.paginacion.classList.replace('show', 'hidden')
        metodos.showLoading(true)

        this.fetchCustom(variables.delay, variables.productosHardcodeados).then((data) => {
            if (data) return data

        }).then((response) => {
            this.renderResultado(response)
                // variables.vistas.loading.classList.replace('hidden', 'loading')
            metodos.showLoading(false)

        }).catch((err) => { console.error(err); return null })
    },
    cargarPeliculas: async() => {
        try {
            metodos.showLoading(true)

            // const response = await fetch(`${variables.url}${variables.apiKey}&page=${variables.page}`)
            const response = await fetch(`${variables.productos.url}&offset=${variables.page}`)

            console.log(response)
            if (response.ok) {
                const result = await response.json()
                console.log(result);
                metodos.showLoading(false)
                variables.vistas.paginacion.classList.replace('hidden', 'show')

                variables.data = result
                metodos.renderResultado(result.results)
                window.scrollTo(0, 0)
            } else {
                console.log(await response.json().result.status_message)
            }
        } catch (error) {
            console.error(error)
            return null
        }
    },
    showLoading: (action) => {
        console.log(variables.vistas.loading)
        if (action) {
            variables.vistas.loading.classList.replace('hidden', 'loading')

            variables.vistas.loading.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
                // variables.vistas.loading.innerHTML = `<div>hola mundo</div>`

            document.body.appendChild(variables.vistas.loading)
        } else {
            // variables.vistas.main.replaceChildren(loading)
            variables.vistas.loading.innerHTML = ``
            variables.vistas.loading.classList.replace('loading', 'hidden')

            // document.body.removeChild(variables.vistas.loading)
        }
    },
    renderInicial: function() {
        variables.vistas.contenedor = document.createElement('main')
        variables.vistas.contenedor.classList.add('contenedor')


        // variables.vistas.loading = document.createElement('div')
        variables.vistas.loading.setAttribute('class', 'spinner hidden')

        variables.btns.showCustomProduct = document.createElement('button')
        variables.btns.showCustomProduct.classList.add('btn')
        variables.btns.showCustomProduct.textContent = 'productos hardcodeados'
        variables.btns.showProductMl = document.createElement('button')
        variables.btns.showProductMl.classList.add('btn')
        variables.btns.showProductMl.textContent = 'productos mercado libre'

        // creanndo un nav
        variables.menu = document.createElement('nav')
        variables.menu.setAttribute('class', 'menu section')
            // agreagndo al body
        variables.menu.appendChild(variables.btns.showCustomProduct)
        variables.menu.appendChild(variables.btns.showProductMl)
            // creando paginacion
        variables.vistas.paginacion = document.createElement('section')
        variables.vistas.paginacion.setAttribute('class', 'paginacion section show')
            // creando los botones
        variables.btns.next = document.createElement('button')
        variables.btns.next.textContent = 'next'
        variables.btns.next.classList.add('btn')
        variables.btns.back = document.createElement('button')
        variables.btns.back.textContent = 'back'
        variables.btns.back.classList.add('btn')
            // agregando los botones a la section
        variables.vistas.paginacion.appendChild(variables.btns.back)
        variables.vistas.paginacion.appendChild(variables.btns.next)


        variables.vistas.main.appendChild(variables.menu)
        variables.vistas.main.appendChild(variables.vistas.paginacion)
        variables.vistas.main.appendChild(variables.vistas.contenedor)
        document.body.appendChild(variables.vistas.loading)




    },
    renderResultado: (data) => {
        console.log(data);
        variables.vistas.resultados = document.createElement('section')
        variables.vistas.resultados.setAttribute('class', 'resultados')
        data.forEach((product) => {
            variables.vistas.card = document.createElement('div')
                // variables.vistas.card.setAttribute('data', JSON.stringify({ data: { src: `http://image.tmdb.org/t/p/w500/${product.poster_path}` } }))
            variables.vistas.card.classList.add('card')
                // variables.vistas.card.setAttribute('style', `background-image: url(http://image.tmdb.org/t/p/w500/${product.poster_path})`)
            variables.vistas.img = document.createElement('img')
            variables.vistas.img.classList.add('poster')
            variables.vistas.img.src = ``
            variables.vistas.img.setAttribute('src', `${product.thumbnail}`)
                // variables.vistas.img.setAttribute('src', `http://image.tmdb.org/t/p/w500/${product.poster_path}`)

            variables.vistas.card.appendChild(variables.vistas.img)
            variables.vistas.containerTitles = document.createElement('div')
            variables.vistas.containerTitles.classList.add('titles')
            variables.vistas.title = document.createElement('h3')
            variables.vistas.title.classList.add('titulo')
            variables.vistas.title.innerHTML = `${product.title}`
            variables.vistas.containerTitles.appendChild(variables.vistas.title)
                // precio
            variables.vistas.price = document.createElement('h3')
            variables.vistas.price.textContent = `precio : ${product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`
            variables.vistas.containerTitles.appendChild(variables.vistas.price)
            variables.vistas.stock = document.createElement('h3')
            variables.vistas.stock.textContent = `disponibles : ${product.available_quantity}`
            variables.vistas.containerTitles.appendChild(variables.vistas.stock)
            variables.vistas.card.addEventListener('click', (e) => { console.log(e) }, false)
            variables.vistas.card.appendChild(variables.vistas.containerTitles)
                // agregando cards al section de resultados

            variables.vistas.resultados.appendChild(variables.vistas.card)

        })
        variables.vistas.contenedor.replaceChildren(variables.vistas.resultados)
            // metodos.scrolling()

    },
    scrolling: () => {
        // console.log(document.querySelector('main.contenedor').lastElementChild);
        // console.log(variables.vistas.contenedor);


        // const elementos = Array.from(variables.vistas.resultado)
        // console.log(elementos)
        const ver = new IntersectionObserver((child) => {

            child.forEach((c) => {
                if (c.isIntersecting) {

                    // console.log(c)
                    // console.log(variables.page)
                    ver.unobserve(c.target)
                        // console.log(c.target.firstElementChild)
                        // console.log(JSON.parse(c.target.getAttribute('data')))
                        // const src = c.target.firstElementChild.getAttribute('data')
                        // console.log(src);
                        // c.target.firstElementChild.src = JSON.parse(c.target.getAttribute('data')).data.src;
                        // console.log(Math.round(variables.data.paging.total / variables.data.paging.limit), 'data');
                    if (variables.page < Math.round(variables.data.paging.total / variables.data.paging.limit)) {
                        variables.page++;
                        metodos.cargarPeliculas()
                    }
                } else {
                    // c.target.firstElementChild.src = '#'
                }

            })
        }, { root: null, threshold: 0 })
        ver.observe(variables.vistas.card)

        let elementos = Array.from(variables.vistas.contenedor.children)
            // console.log(elementos.length)

        // elementos.forEach((ele) => {
        //     ver.observe(ele)


        // })
    },
    paginacion: function(action, e) {
        if (action === 'next') {
            console.log(e.target);

            variables.page++
                console.log(variables.page);
            this.cargarPeliculas()

            if (variables.page !== 1) {
                e.target.parentNode.firstElementChild.disabled = false
            }
        }
        if (action === 'back') {
            console.log(e)
            if (variables.page !== 1) {
                variables.page--
                    this.cargarPeliculas()
                console.log(variables.page);
            } else {
                e.target.disabled = true
            }
        }
    }
}
metodos.init()