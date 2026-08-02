  // Pemetaan 9 Produk Pokebooster.tcg (Data Resmi 2026)
const products = [
  // --- SERI INGGRIS (EN) ---
  {
    id: 1,
    name: "Pokémon TCG Sword & Shield: Evolving Skies Booster Box (EN)",
    lang: "en",
    price: 38500000,
    img: "EVOLVINGSKIES.png",
    description: "Booster box ikonik dari era Sword & Shield. Terkenal dengan hit rate kartu Alternate Art sangat langka seperti Rayquaza VMAX dan 'Moonbreon' (Umbreon VMAX Alt Art). 100% factory sealed original."
  },
  {
    id: 2,
    name: "Pokémon TCG XY: Roaring Skies / Mega Evolution Series Booster Box (EN)",
    lang: "en",
    price: 18500000,
    img: "MEGAEVO.png",
    description: "Seri klasik era XY yang menampilkan kebangkitan Mega Evolution, termasuk Mega Rayquaza EX dan Mega Charizard. Pilihan wajib bagi kolektor retro & penggemar mekanik Mega."
  },
  {
    id: 3,
    name: "Pokémon TCG Sword & Shield: Darkness Ablaze / Pitch Black (EN)",
    lang: "en",
    price: 3800000,
    img: "PITCHBLACK.png",
    description: "Seri populer era Sword & Shield yang memuat kartu incaran utama Charizard VMAX beserta deretan Pokémon tipe Dark & Fire langka lainnya."
  },

  // --- SERI INDONESIA (ID) ---
  {
    id: 4,
    name: "Pokémon TCG Indonesia: Seri Hitam & Putih (S8b / AC6)",
    lang: "id",
    price: 1250000,
    img: "HITAM & PUTIH.png",
    description: "Seri resmi Bahasa Indonesia yang menghadirkan cetakan kartu Foil bertekstur, Secret Rare, dan kemudahan akses chase card favorit pemain lokal."
  },
  {
    id: 5,
    name: "Pokémon TCG Indonesia: Seri Kilau Hitam (Shiny Treasure / Paldean Fates ID)",
    lang: "id",
    price: 1100000,
    img: "KILAU HITAM.png",
    description: "Seri spesial Shiny Pokémon Bahasa Indonesia. Memuat puluhan Pokémon kilau (Shiny) serta Charizard ex Tera Type khusus kolektor Indonesia."
  },
  {
    id: 6,
    name: "Pokémon TCG Indonesia: Seri Topeng Kerusakan / Maid & Master Sub-Set (ID)",
    lang: "id",
    price: 950000,
    img: "MAID.png",
    description: "Rilisan resmi Bahasa Indonesia yang berisi dukungan kartu Supporter Full Art langka serta Pokémon ex meta kompetitif saat ini."
  },

  // --- SERI JEPANG (JP) ---
  {
    id: 7,
    name: "Pokémon TCG Japan: High Class Pack Mega Dream EX / VMAX Climax (JP)",
    lang: "jp",
    price: 2800000,
    img: "MEGA DREAM EX.png",
    description: "High Class Pack premium Jepang dengan jaminan Guaranteed Foil di setiap pack, kartu Character Rare (CHR/CSR), dan kualitas cetakan khas Jepang yang sangat halus."
  },
  {
    id: 8,
    name: "Pokémon TCG Japan: Phantasmal Flames / Ruler of the Black Flame (JP)",
    lang: "jp",
    price: 1850000,
    img: "PHANTASMAL FLAMES.png",
    description: "Rilisan Jepang populer yang memuat Darkness Tera Charizard ex SAR. Kualitas kertas dan detail texture embossing terbaik standar Jepang."
  },
  {
    id: 9,
    name: "Pokémon TCG Japan: Scarlet ex Booster Box (SV1S JP)",
    lang: "jp",
    price: 1450000,
    img: "SCARLET EX.png",
    description: "Seri pembuka era Scarlet & Violet Jepang yang memperkenalkan mekanik Terastalization, Koraidon ex SAR, dan Miradon/Gardevoir ex Special Art Rare."
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
      <div class="cart-item" style="display:flex; align-items:center; gap:10px; margin-bottom:12px; border-bottom:1px solid #eee; padding-bottom:8px;">
        <img src="${item.img}" class="cart-item-img" alt="${item.name}" style="width:45px; height:45px; object-fit:cover; border-radius:6px;">
        <div style="flex:1;">
          <h4 style="font-size:0.85rem; line-height:1.2; margin-bottom:4px;">${item.name}</h4>
          <p style="color:var(--secondary-gold); font-weight:700; font-size:0.85rem; margin:0;">
            Rp ${item.price.toLocaleString('id-ID')}
          </p>
          <small>Qty: ${item.qty}</small>
        </div>
        <button class="btn-delete-item" onclick="removeFromCart(${item.id})" style="background:none; border:none; cursor:pointer;">🗑️</button>
      </div>
    `;
  });

  if (totalPriceEl) {
    totalPriceEl.textContent = `Rp ${Math.round(total).toLocaleString('id-ID')} ${discountApplied ? '(Kupon 10%)' : ''}`;
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
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Produk tidak ditemukan.</p>`;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => goToDetail(product.id);
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.img}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=Pokebooster'">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
        <button class="btn-add-cart" onclick="addToCart(${product.id}, event)">+ Keranjang</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* Render Detail Produk di Halaman (detail.html) */
function renderProductDetail() {
  const detailContainer = document.getElementById('productDetailContainer');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')) || 1;
  const product = products.find(p => p.id === productId) || products[0];

  detailContainer.innerHTML = `
    <div class="product-detail-layout" style="display: flex; gap: 40px; flex-wrap: wrap; background: var(--card-bg); padding: 30px; border-radius: var(--radius-lg); border: 1px solid #e2ded4; box-shadow: var(--shadow-soft);">
      <div style="flex: 1; min-width: 280px; text-align: center;">
        <img src="${product.img}" alt="${product.name}" style="width: 100%; max-width: 380px; border-radius: 12px; border: 1px solid #ddd;" onerror="this.src='https://via.placeholder.com/380x380?text=Pokebooster'">
      </div>
      <div style="flex: 1.2; min-width: 280px; display: flex; flex-direction: column; justify-content: center;">
        <span class="badge" style="align-self: flex-start; background: var(--secondary-gold); color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 12px; text-transform: uppercase;">
          SERI ${product.lang.toUpperCase()}
        </span>
        <h1 style="font-size: 1.6rem; color: var(--jet-black); margin-bottom: 15px; line-height: 1.3;">${product.name}</h1>
        <h2 style="font-size: 1.5rem; color: var(--primary-red); margin-bottom: 20px; font-weight: 800;">Rp ${product.price.toLocaleString('id-ID')}</h2>
        
        <div style="background: var(--accent-cream); padding: 18px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid var(--secondary-gold);">
          <h4 style="margin-bottom: 6px; color: var(--jet-black);">Deskripsi Produk:</h4>
          <p style="color: var(--text-dark); line-height: 1.6; font-size: 0.95rem;">${product.description}</p>
        </div>

        <div style="display: flex; gap: 15px;">
          <button class="btn-primary" onclick="addToCart(${product.id}, event)" style="flex: 1; padding: 14px; font-size: 1rem;">+ Tambah ke Keranjang</button>
          <a href="produk.html" class="btn-secondary" style="padding: 14px 20px; text-decoration: none; border: 1px solid #ccc; border-radius: var(--radius-md); color: var(--jet-black); font-weight: 600;">Kembali</a>
        </div>
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

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartDrawer();
  initAudioState();

  if (document.getElementById('productDetailContainer')) {
    renderProductDetail();
  }

  if (document.getElementById('productGrid')) {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'all';
    renderProducts(lang);

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderProducts(lang, e.target.value);
      });
    }
  }
});
