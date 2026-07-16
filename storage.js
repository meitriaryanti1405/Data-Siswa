// =============================================
//  STORAGE.JS — Modul manajemen data localStorage
//  Semua fungsi CRUD untuk data siswa
// =============================================

const STORAGE_KEY = 'dataSiswa';

/** Ambil semua data siswa */
function getAllSiswa() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/** Simpan array siswa ke localStorage */
function saveAllSiswa(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Tambah siswa baru, return id baru */
function tambahSiswa(siswa) {
  const data = getAllSiswa();
  siswa.id = Date.now().toString();
  siswa.ditambahkan = new Date().toLocaleDateString('id-ID');
  data.push(siswa);
  saveAllSiswa(data);
  return siswa.id;
}

/** Cari siswa by id */
function getSiswaById(id) {
  return getAllSiswa().find(s => s.id === id) || null;
}

/** Update siswa by id */
function updateSiswa(id, dataBaru) {
  const data = getAllSiswa();
  const idx = data.findIndex(s => s.id === id);
  if (idx === -1) return false;
  data[idx] = { ...data[idx], ...dataBaru };
  saveAllSiswa(data);
  return true;
}

/** Hapus siswa by id */
function hapusSiswa(id) {
  const data = getAllSiswa().filter(s => s.id !== id);
  saveAllSiswa(data);
}

/** Ambil id dari URL param ?id=xxx */
function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

/** Tampilkan toast notifikasi */
function showToast(pesan, tipe = 'success') {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = pesan;
  t.className = `toast ${tipe}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/** Generate inisial dari nama (untuk avatar) */
function getInisial(nama) {
  if (!nama) return '??';
  const parts = nama.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
