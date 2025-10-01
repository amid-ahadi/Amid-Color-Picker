const colorInput = document.getElementById('color-input');
const hexInput = document.getElementById('hex-input');
const copyBtn = document.getElementById('copy-btn');
const status = document.getElementById('status');

// هنگامی که از انتخابگر گرافیکی رنگ تغییر کرد
colorInput.addEventListener('input', () => {
  hexInput.value = colorInput.value.toUpperCase();
  status.textContent = '';
});

// تابع اعتبارسنجی و آپدیت رنگ
function applyHexColor() {
  let val = hexInput.value.trim();

  if (!val) {
    status.textContent = 'Enter a HEX color';
    return;
  }

  let normalized = null;

  if (val.startsWith('#')) {
    const hexPart = val.slice(1);
    if (hexPart.length === 6 && /^[0-9A-F]{6}$/i.test(hexPart)) {
      normalized = val.toUpperCase();
    } else if (hexPart.length === 3 && /^[0-9A-F]{3}$/i.test(hexPart)) {
      const r = hexPart[0], g = hexPart[1], b = hexPart[2];
      normalized = `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
    }
  } else if (val.length === 6 && /^[0-9A-F]{6}$/i.test(val)) {
    normalized = '#' + val.toUpperCase();
  } else if (val.length === 3 && /^[0-9A-F]{3}$/i.test(val)) {
    const r = val[0], g = val[1], b = val[2];
    normalized = `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  if (normalized) {
    colorInput.value = normalized.toLowerCase();
    hexInput.value = normalized; // یکدستی: همیشه با #
    status.textContent = '';
  } else {
    status.textContent = 'Invalid HEX format';
  }
}

// فقط وقتی کاربر Enter بزنه
hexInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    applyHexColor();
  }
});

// یا وقتی فیلد رو ترک کنه (کلیک بیرون یا tab)
hexInput.addEventListener('blur', () => {
  // اختیاری: فقط اگر مقدار تغییر کرده بود، اعمال کن
  // ولی برای سادگی، همیشه اعمال می‌کنیم
  applyHexColor();
});

// مقدار اولیه
hexInput.value = colorInput.value.toUpperCase();

// کپی کردن
copyBtn.addEventListener('click', () => {
  const hex = colorInput.value.toUpperCase();
  navigator.clipboard.writeText(hex).then(() => {
    status.textContent = '✓ Copied!';
    setTimeout(() => status.textContent = '', 1500);
  }).catch(() => {
    status.textContent = '✗ Copy failed';
  });
});