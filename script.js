const products = [
  // --- SERI INGGRIS (EN) ---
  {
    id: 1,
    name: "Evolving Skies Booster Box (EN)",
    lang: "en",
    price: 3850000,
    img: "EVOLVINGSKIES.png",
    description: "EVOLVING SKIES. Terkenal dengan hit rate kartu Alternate Art sangat langka seperti Rayquaza VMAX dan 'Moonbreon' (Umbreon VMAX Alt Art). 100% factory sealed original."
  },
  {
    id: 2,
    name: "Mega Evolution Series Booster Box (EN)",
    lang: "en",
    price: 2450000,
    img: "MEGAEVO.png",
    description: "Mega Evolution yang menampilkan ikon utama Mega Gardevoir dan Mega Lucario. Pilihan wajib bagi kolektor retro & penggemar mekanik Mega."
  },
  {
    id: 3,
    name: "Pitch Black Booster Box (EN)",
    lang: "en",
    price: 2100000,
    img: "PITCHBLACK.png",
    description: "Pitch Black yang memuat kartu incaran utama Mega Darkrai sang pengantar tidur di kegelapan beserta deretan Pokémon tipe Dark & Shadow langka lainnya."
  },

  // --- SERI INDONESIA (ID) ---
  {
    id: 4,
    name: "Hitam & Putih Booster box (ID)",
    lang: "id",
    price: 1850000,
    img: "HITAM & PUTIH.png",
    description: "Seri resmi Bahasa Indonesia yang menghadirkan cetakan kartu Foil bertekstur, Secret Rare, dan kemudahan akses chase card favorit pemain lokal."
  },
  {
    id: 5,
    name: "Kilau Hitam Booster Box (ID)",
    lang: "id",
    price: 1350000,
    img: "KILAU HITAM.png",
    description: "Seri spesial Shiny Pokémon Bahasa Indonesia. Memuat puluhan Pokémon kilau (Shiny) serta Charizard ex Tera Type khusus kolektor Indonesia."
  },
  {
    id: 6,
    name: "Evolusi Mega Booster Box (ID)",
    lang: "id",
    price: 1650000,
    img: "MAID.png",
    description: "Rilisan resmi Bahasa Indonesia edisi Mega Evolution yang menampilkan Mega Gardevoir dan Mega Lucario serta dukungan kartu Supporter Full Art langka."
  },

  // --- SERI JEPANG (JP) ---
  {
    id: 7,
    name: "High Class Pack Mega Dream EX (JP)",
    lang: "jp",
    price: 2950000,
    img: "MEGA DREAM EX.png",
    description: "High Class Pack premium Jepang dengan jaminan Guaranteed Foil di setiap pack, kartu EX/SAR pilihan, dan kualitas cetakan khas Jepang yang sangat halus."
  },
  {
    id: 8,
    name: "Phantasmal Flames Booster Box (JP)",
    lang: "jp",
    price: 2750000,
    img: "PHANTASMAL FLAMES.png",
    description: "Rilisan Jepang populer yang memuat Darkness Tera Charizard ex SAR. Kualitas kertas dan detail texture embossing terbaik standar Jepang."
  },
  {
    id: 9,
    name: "Scarlet ex Booster Box (JP)",
    lang: "jp",
    price: 1200000,
    img: "SCARLET EX.png",
    description: "Seri pembuka era Scarlet & Violet Jepang yang memperkenalkan mekanik Terastalization, Koraidon ex SAR, dan Miraidon/Gardevoir ex Special Art Rare."
  }
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
  if (!item) return;
  
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  
  saveCart();
  toggleCartDrawer(true);
}

function updateQuantity(id, change) {
  const item = cart.find(c => c.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  saveCart();
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
  if (!drawer) return;
  if (open) {
    drawer.style.right = '0';
    renderCartDrawer();
  } else {
    drawer.style.right = '-400px';
  }
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

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center; color:#777; margin-top:20px;">Keranjang belanja Anda masih kosong.</p>';
    if (totalPriceEl) totalPriceEl.textContent = 'Rp 0';
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div style="display:flex; gap:10px; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
      <img src="${item.img}" style="width:50px; height:50px; object-fit:contain; background:#f9f9f9; border-radius:6px; border:1px solid #ddd;" onerror="this.src='https://via.placeholder.com/50'">
      <div style="flex:1;">
        <h5 style="margin:0; font-size:0.9rem; color:#222;">${item.name}</h5>
        <p style="margin:4px 0 0; font-size:0.8rem; color:#c92a2a; font-weight:700;">Rp ${item.price.toLocaleString('id-ID')}</p>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <button onclick="updateQuantity(${item.id}, -1)" style="background:#ddd; border:none; width:22px; height:22px; border-radius:4px; cursor:pointer; font-weight:bold;">-</button>
        <span style="font-size:0.85rem; font-weight:bold;">${item.qty}</span>
        <button onclick="updateQuantity(${item.id}, 1)" style="background:#ddd; border:none; width:22px; height:22px; border-radius:4px; cursor:pointer; font-weight:bold;">+</button>
      </div>
    </div>
  `).join('');

  let subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  if (checkboxEl) checkboxEl.checked = discountApplied;
  let finalTotal = discountApplied ? subtotal * 0.9 : subtotal;

  if (totalPriceEl) {
    totalPriceEl.textContent = `Rp ${Math.round(finalTotal).toLocaleString('id-ID')}`;
  }
}

/* Render Produk di Halaman Catalog (produk.html) */
function renderProducts(filterLang = 'all', searchQuery = '') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = products.filter(p => {
    const matchLang = filterLang === 'all' || p.lang === filterLang;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLang && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Tidak ada booster box yang ditemukan.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="goToDetail(${p.id})" style="cursor:pointer; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #e2ded4; padding:15px; display:flex; flex-direction:column;">
      <div class="product-img-wrapper" style="width:100%; height:200px; display:flex; align-items:center; justify-content:center; background:#f9f8f5; border-radius:8px; overflow:hidden; padding:10px;">
        <img src="${p.img}" alt="${p.name}" style="max-height:100%; max-width:100%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/300x200?text=Pokebooster';">
      </div>
      <div class="product-info" style="display:flex; flex-direction:column; flex:1; margin-top:12px;">
        <span class="badge" style="background:var(--secondary-gold); color:#fff; padding:2px 8px; border-radius:10px; font-size:0.75rem; font-weight:700; text-transform:uppercase; width:fit-content;">SERI ${p.lang.toUpperCase()}</span>
        <h3 style="margin:8px 0; font-size:1.1rem; color:var(--jet-black);">${p.name}</h3>
        <p style="color:#c92a2a; font-weight:800; font-size:1.15rem; margin:4px 0 12px;">Rp ${p.price.toLocaleString('id-ID')}</p>
        <button class="btn-primary" onclick="addToCart(${p.id}, event)" style="width:100%; padding:10px; font-size:0.9rem; margin-top:auto; background:var(--jet-black); color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:700;">+ Keranjang</button>
      </div>
    </div>
  `).join('');
}

/* Render Detail Produk di Halaman (detail.html) */
function renderProductDetail() {
  const detailContainer = document.getElementById('productDetailContainer');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')) || 1;
  const product = products.find(p => p.id === productId) || products[0];

  detailContainer.innerHTML = `
    <div style="display:flex; gap:30px; background:var(--card-bg, #fff); padding:30px; border-radius:12px; align-items:center; flex-wrap:wrap; border:1px solid #e2ded4; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
      <div style="flex:1; min-width:280px; text-align:center; background:#ffffff; border-radius:8px; padding:15px; border:1px solid #eee;">
        <img src="${product.img}" style="width:100%; max-width:350px; aspect-ratio:1/1; object-fit:contain; border-radius:8px;" alt="${product.name}" onerror="this.src='https://via.placeholder.com/350x350?text=Pokebooster'">
      </div>
      <div style="flex:1.2; min-width:280px;">
        <span class="badge" style="display:inline-block; background:var(--secondary-gold); color:#fff; padding:4px 12px; border-radius:20px; font-size:0.8rem; font-weight:700; margin-bottom:12px; text-transform:uppercase;">
          SERI ${product.lang.toUpperCase()}
        </span>
        <h1 style="margin-bottom:10px; font-size:1.6rem; color:var(--jet-black); line-height:1.3;">${product.name}</h1>
        <h2 style="color:#c92a2a; font-size:1.8rem; margin-bottom:15px; font-weight:800;">Rp ${product.price.toLocaleString('id-ID')}</h2>
        
        <div style="background:#f9f8f3; padding:16px; border-radius:8px; margin-bottom:20px; border-left:4px solid var(--secondary-gold);">
          <p style="color:#333; line-height:1.6; font-size:0.95rem; margin:0;">
            ${product.description}
          </p>
        </div>

        <button class="btn-primary" onclick="addToCart(${product.id}, event)" style="padding:12px 24px; font-size:1rem; cursor:pointer; background:var(--jet-black); color:#fff; border:none; border-radius:8px; font-weight:700;">+ Masukkan Keranjang</button>
      </div>
    </div>
  `;
}

/* Audio persistence handling */
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

// Inisialisasi Utama saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartDrawer();
  initAudioState();

  if (document.getElementById('productDetailContainer')) {
    renderProductDetail();
  }

  // Interaksi pemutaran audio otomatis pertama kali klik di dokumen
  document.addEventListener('click', function() {
    const audio = document.getElementById('bgAudio');
    if (audio && audio.paused && localStorage.getItem('pbAudioStatus') !== 'paused') {
      audio.play().catch(error => console.log("Autoplay diblokir browser:", error));
    }
  }, { once: true });
});
