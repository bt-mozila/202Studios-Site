import { useState } from 'react'
import { products, shopFilters } from '../data/products'
import { asset } from '../lib/utils'

const money = (n) => `$${n.toFixed(2)}`

export default function Shop() {
  const [filter, setFilter] = useState('*')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const visible = products.filter((p) => filter === '*' || `.${p.category}` === filter)

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...current, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id))

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section className="shop-section">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Our Store</h2>
          <p className="text-white">Browse our Selection of Quality Products and Services</p>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <ul id="shop-filters" className="d-flex justify-content-center gap-2">
              {shopFilters.map((f) => (
                <li
                  key={f.value}
                  data-filter={f.value}
                  className={`btn btn-outline-primary ${filter === f.value ? 'filter-active' : ''}`}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row" id="products-container">
          {visible.map((product, index) => (
            <div key={`${product.id}-${index}`} className={`col-lg-4 col-md-6 ${product.category}`}>
              <div className="product-card">
                <img src={asset(product.image)} alt={product.name} className="product-img" />
                <h4 className="text-white">{product.name}</h4>
                <p className="text-white-50">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white">${product.price}</span>
                  <button className="btn btn-primary add-to-cart" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="cart-toggle" id="cartToggle" aria-label="Toggle cart" onClick={() => setCartOpen(true)}>
        <i className="bi bi-cart3 text-white fs-5"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">
          {totalItems}
        </span>
      </button>

      <div className={`cart-sidebar ${cartOpen ? 'active' : ''}`} id="cartSidebar">
        <button className="cart-close" id="cartClose" aria-label="Close cart" onClick={() => setCartOpen(false)}>
          ×
        </button>
        <h4 className="text-white mb-4">Shopping Cart</h4>
        <div id="cartItems">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="d-flex justify-content-between">
                <span className="text-white">{item.name}</span>
                <span className="text-white">×{item.quantity}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="text-white-50">{money(item.price * item.quantity)}</span>
                <button className="btn btn-sm btn-danger remove-from-cart" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total mt-4">
          <h5 className="text-white">
            Total: <span id="cartTotal">{money(total)}</span>
          </h5>
          <button className="btn btn-primary w-100 mt-3">Checkout</button>
        </div>
      </div>
    </section>
  )
}
