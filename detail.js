// =============================================
//  DETAIL.JS — Logika halaman detail siswa
// =============================================

let currentId = null;

/** Format tanggal dari YYYY-MM-DD ke DD/M/YYYY */
function formatTanggal(str) {
  if (!str) return '-';
  const d = new Date(str);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

/** Isi semua elemen detail dengan data siswa */
function isiDetail(s, nomor) {
  document.getElementById('avatarInisial').textContent = getInisial(s.nama);
  document.getElementById('detailNama').textContent    = s.nama        || '-';
  document.getElementById('detailNIS').textContent     = `NIS: ${s.nis || '-'}`;

  document.getElementById('dNoUrut').textContent = nomor;

  const ttl = (s.tempatLahir && s.tanggalLahir)
    ? `${s.tempatLahir}, ${s.tanggalLahir}`
    : (s.tempatLahir || s.tanggalLahir || '-');
  document.getElementById('dTtl').textContent         = ttl;
  document.getElementById('dJk').textContent          = s.jenisKelamin || '-';
  document.getElementById('dAgama').textContent       = s.agama        || '-';
  document.getElementById('dKelas').textContent       = s.kelas        || '-';
  document.getElementById('dTelepon').textContent     = s.telepon      || '-';
  document.getElementById('dAlamat').textContent      = s.alamat       || '-';
  document.getElementById('dNamaOrtu').textContent    = s.namaOrtu     || '-';
  document.getElementById('dTeleponOrtu').textContent = s.teleponOrtu  || '-';
  document.getElementById('dTanggal').textContent     = s.ditambahkan  || '-';
}

/** Buka modal hapus */
function bukaModal() {
  document.getElementById('modalHapus').style.display = 'flex';
}

/** Tutup modal hapus */
function tutupModal() {
  document.getElementById('modalHapus').style.display = 'none';
}

/** Konfirmasi hapus */
function konfirmasiHapus() {
  hapusSiswa(currentId);
  showToast('🗑️ Data siswa berhasil dihapus!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1200);
}

/** Inisialisasi halaman */
function init() {
  currentId = getIdFromURL();
  if (!currentId) {
    window.location.href = 'index.html';
    return;
  }

  const siswa = getSiswaById(currentId);
  if (!siswa) {
    showToast('❌ Data tidak ditemukan!', 'error');
    setTimeout(() => window.location.href = 'index.html', 1500);
    return;
  }

  // Cari nomor urut
  const semua  = getAllSiswa();
  const nomor  = semua.findIndex(s => s.id === currentId) + 1;
  isiDetail(siswa, nomor);

  // Pasang event tombol
  document.getElementById('btnEdit').onclick  = () => {
    window.location.href = `edit.html?id=${currentId}`;
  };
  document.getElementById('btnHapus').onclick = bukaModal;
}

document.addEventListener('DOMContentLoaded', init);
