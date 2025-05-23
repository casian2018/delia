// script.js

// Funcție de adăugare în coș
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificăm dacă produsul există deja în coș
    let existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1; // Dacă există, creștem cantitatea
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let totalPrice = 0;
    cartItems.innerHTML = '';
  
    cart.forEach(item => {
      let li = document.createElement('li');
      li.textContent = `${item.name} - ${item.quantity} x ${item.price} RON`;
      cartItems.appendChild(li);
      totalPrice += item.price * item.quantity;
    });
  
    document.getElementById('total-price').textContent = `Total: ${totalPrice} RON`;
  }
  
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const product = {
        id: this.getAttribute('data-id'),
        name: this.getAttribute('data-name'),
        price: parseFloat(this.getAttribute('data-price'))
      };
      addToCart(product);
    });
  });
  
  // Eveniment pe formularul de checkout
  document.getElementById('checkout-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Trimite datele la Google Sheets prin Webhook
    const formData = new FormData();
    formData.append('entry.XXXX', name); // Înlocuiește cu ID-ul din Google Forms
    formData.append('entry.XXXX', email); // Înlocuiește cu ID-ul din Google Forms
    formData.append('entry.XXXX', address); // Înlocuiește cu ID-ul din Google Forms
    formData.append('entry.XXXX', JSON.stringify(cart)); // Produse în coș
  
    fetch('https://script.google.com/macros/s/AKfycbyoDa7CEeWjS0-LH7TuL006c_Rp6VbKNHi5_Qb0Q054wNnsOJh9d8kWGRoVn12JOoSJ/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      alert('Comanda a fost trimisă cu succes!');
      localStorage.removeItem('cart');
      updateCart();
    })
    .catch(error => {
      alert('A apărut o eroare, te rugăm să încerci mai târziu!');
    });
  });
  
  window.onload = updateCart;