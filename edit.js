// =============================================
//  EDIT.JS — Logika halaman edit data siswa
// =============================================

let currentId = null;

/** Isi form dengan data siswa yang ada */
function isiForm(s) {
  document.getElementById('nama').value         = s.nama          || '';
  document.getElementById('nis').value          = s.nis           || '';
  document.getElementById('tempatLahir').value  = s.tempatLahir   || '';
  document.getElementById('tanggalLahir').value = s.tanggalLahir  || '';
  document.getElementById('kelas').value        = s.kelas         || '';
  document.getElementById('telepon').value      = s.telepon       || '';
  document.getElementById('alamat').value       = s.alamat        || '';
  document.getElementById('namaOrtu').value     = s.namaOrtu      || '';
  document.getElementById('teleponOrtu').value  = s.teleponOrtu   || '';

  // Select jenis kelamin
  const jk = document.getElementById('jenisKelamin');
  for (let opt of jk.options) {
    if (opt.value === s.jenisKelamin) { opt.selected = true; break; }
  }

  // Select agama
  const ag = document.getElementById('agama');
  for (let opt of ag.options) {
    if (opt.value === s.agama) { opt.selected = true; break; }
  }
}

/** Simpan perubahan data siswa */
function updateSiswa() {
  const nama = document.getElementById('nama').value.trim();
  const nis  = document.getElementById('nis').value.trim();

  // Validasi wajib
  if (!nama) {
    showToast('⚠️ Nama lengkap wajib diisi!', 'error');
    document.getElementById('nama').focus();
    return;
  }
  if (!nis) {
    showToast('⚠️ NIS wajib diisi!', 'error');
    document.getElementById('nis').focus();
    return;
  }

  // Cek NIS duplikat (kecuali milik siswa ini sendiri)
  const duplikat = getAllSiswa().find(s => s.nis === nis && s.id !== currentId);
  if (duplikat) {
    showToast('⚠️ NIS sudah digunakan siswa lain!', 'error');
    return;
  }

  const dataBaru = {
    nama,
    nis,
    tempatLahir:  document.getElementById('tempatLahir').value.trim(),
    tanggalLahir: document.getElementById('tanggalLahir').value,
    jenisKelamin: document.getElementById('jenisKelamin').value,
    agama:        document.getElementById('agama').value,
    kelas:        document.getElementById('kelas').value.trim(),
    telepon:      document.getElementById('telepon').value.trim(),
    alamat:       document.getElementById('alamat').value.trim(),
    namaOrtu:     document.getElementById('namaOrtu').value.trim(),
    teleponOrtu:  document.getElementById('teleponOrtu').value.trim(),
  };

  // Panggil fungsi update dari storage.js
  // (nama fungsi di storage.js adalah updateSiswa, tapi itu sama dengan fungsi ini
  //  jadi kita panggil langsung dari storage dengan nama berbeda)
  const semua = getAllSiswa();
  const idx   = semua.findIndex(s => s.id === currentId);
  if (idx === -1) {
    showToast('❌ Data tidak ditemukan!', 'error');
    return;
  }
  semua[idx] = { ...semua[idx], ...dataBaru };
  saveAllSiswa(semua);

  showToast('✅ Data siswa berhasil diperbarui!');
  setTimeout(() => {
    window.location.href = `detail.html?id=${currentId}`;
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

  isiForm(siswa);

  // Tombol kembali & batal ke halaman detail
  document.getElementById('btnKembali').onclick = () => {
    window.location.href = `detail.html?id=${currentId}`;
  };
  document.getElementById('btnBatal').onclick = () => {
    window.location.href = `detail.html?id=${currentId}`;
  };
}

document.addEventListener('DOMContentLoaded', init);
