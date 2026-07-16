// =============================================
//  TAMBAH.JS — Logika halaman tambah siswa baru
// =============================================

function simpanSiswa() {
  const nama  = document.getElementById('nama').value.trim();
  const nis   = document.getElementById('nis').value.trim();

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

  // Cek NIS duplikat
  const existing = getAllSiswa().find(s => s.nis === nis);
  if (existing) {
    showToast('⚠️ NIS sudah digunakan siswa lain!', 'error');
    return;
  }

  const siswa = {
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

  const id = tambahSiswa(siswa);
  showToast('✅ Data siswa berhasil disimpan!');

  // Redirect ke detail setelah toast tampil
  setTimeout(() => {
    window.location.href = `detail.html?id=${id}`;
  }, 1200);
}
