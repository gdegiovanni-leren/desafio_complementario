import { Router } from 'express'
/* import ProductController from '../DAO/filemanagers/productController.js' */
import ProductManager from '../DAO/dbmanagers/productManager.js'
import CartManager from '../DAO/dbmanagers/cartManager.js'

const router = Router()


//solo listado de productos
router.get('/', async (req, res) => {

    const PM = new ProductManager()

    const products = await PM.getProducts()

    res.render('index', {
        products,
        style: 'index.css',
        title : 'LISTADO DE PRODUCTOS ESTATICO'
    })
})


//listado de productos con websockets + alta y baja de producto
router.get('/realtimeproducts', async (req,res) => {

    res.render('realTimeProducts', {
        style: 'index.css',
        title : 'LISTADO DE PRODUCTOS WEBSOCKET'
    })

})

// mock para añadir producto al carrito, via websockets
router.get('/cart', async (req, res) => {

    const PM = new ProductManager()
    const CM = new CartManager()

    let cart_id = await CM.createCart()

    const products = await PM.getProducts()

    res.render('cart', {
        products,
        cart_id,
        style: 'index.css',
        title : 'CARRITO DE COMPRAS'
    })
})


router.get('/chat', (req,res) => {
    res.render('chat',{
    style: 'index.css',
    title : 'CHAT'
    })
})



export default router