const products = [
  { id: 1, name: "Booster Box Topeng Kerusakan", lang: "id", price: 1050000, img: "EVOLVINGSKIES.jpg" }, 
  { id: 2, name: "Booster Box Kilat Perdana", lang: "id", price: 1100000, img: "prod-2.jpg" },    
  { id: 3, name: "Booster Box Takdir Gemerlap", lang: "id", price: 1250000, img: "prod-3.jpg" },  
  { id: 4, name: "Booster Box Scarlet & Violet Base", lang: "en", price: 2100000, img: "prod-4.jpg" }, 
  { id: 5, name: "Booster Box Paldea Evolved", lang: "en", price: 2300000, img: "prod-5.jpg" },    
  { id: 6, name: "Booster Box Obsidian Flames", lang: "en", price: 2450000, img: "prod-6.jpg" },   
  { id: 7, name: "Booster Box Shiny Treasure ex", lang: "jp", price: 1150000, img: "prod-7.jpg" },  
  { id: 8, name: "Booster Box Ruler of the Black Flame", lang: "jp", price: 1300000, img: "prod-8.jpg" }, 
  { id: 9, name: "Booster Box Clay Burst", lang: "jp", price: 1850000, img: "prod-9.jpg" }         
];

let cart = JSON.parse(localStorage.getItem('pbCart')) || [];
let discountApplied = false;

function saveCart() {
  localStorage.setItem('pbCart', JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function addToCart(id, event) {
  if (event) event.stopPropagation();
  const item = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  
  saveCart();
  toggleCartDrawer(true);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
}

function toggleDiscount(checked) {
  discountApplied = checked;
  renderCartDrawer();
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const total = cart.reduce((acc, curr) => acc + curr.qty, 0);
    badge.textContent = total;
  }
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.toggle('open', open);
}

function toggleMobileMenu() {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('open');
}

function renderCartDrawer() {
  const cartContainer = document.getElementById('cartItems');
  const totalPriceEl = document.getElementById('cartTotal');
  const checkboxEl = document.getElementById('discountCheckbox');
  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted); margin-top:20px;">Keranjang Anda kosong.</p>';
  }

  let total = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  if (checkboxEl) {
    checkboxEl.checked = discountApplied;
  }

  if (discountApplied) {
    total = total * 0.9;
  }

  cart.forEach(item => {
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" class="cart-item-img" alt="${item.name}">
        <div style="flex:1;">
          <h4 style="font-size:0.85rem;">${item.name}</h4>
          <p style="color:var(--secondary-gold); font-weight:700; font-size:0.85rem;">
            Rp ${item.price.toLocaleString('id-ID')}
          </p>
          <small>Qty: ${item.qty}</small>
        </div>
        <button class="btn-delete-item" onclick="removeFromCart(${item.id})">🗑️</button>
      </div>
    `;
  });

  if (totalPriceEl) {
    totalPriceEl.textContent = `Rp ${Math.round(total).toLocaleString('id-ID')} ${discountApplied ? '(Kupon 10%)' : ''}`;
  }
}

/* Audio persistence handling across pages */
function initAudioState() {
  const audio = document.getElementById('bgAudio');
  const btn = document.getElementById('audioBtn');
  if (!audio) return;

  const audioState = localStorage.getItem('pbAudioStatus');
  
  if (audioState === 'playing') {
    audio.play().then(() => {
      if (btn) btn.textContent = '🔊';
    }).catch(() => {
      if (btn) btn.textContent = '🔇';
    });
  } else {
    audio.pause();
    if (btn) btn.textContent = '🔇';
  }
}

function toggleAudio() {
  const audio = document.getElementById('bgAudio');
  const btn = document.getElementById('audioBtn');
  if (!audio) return;

  if (audio.paused) {
    audio.play().then(() => {
      localStorage.setItem('pbAudioStatus', 'playing');
      if (btn) btn.textContent = '🔊';
    }).catch(err => {
      console.log("Audio playback blocked:", err);
    });
  } else {
    audio.pause();
    localStorage.setItem('pbAudioStatus', 'paused');
    if (btn) btn.textContent = '🔇';
  }
}

function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartDrawer();
  initAudioState();
});
