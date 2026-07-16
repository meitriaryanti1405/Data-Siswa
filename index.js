// =============================================
//  INDEX.JS — Logika halaman daftar siswa
// =============================================

let semuaSiswa = [];

/** Render tabel siswa */
function renderTabel(daftar) {
  const tbody  = document.getElementById('tableSiswa');
  const empty  = document.getElementById('emptyState');
  const jumlah = document.getElementById('jumlahSiswa');

  jumlah.textContent = `${daftar.length} siswa terdaftar`;

  if (daftar.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  tbody.innerHTML = daftar.map((s, i) => `
    <tr>
      <td class="td-no">${i + 1}</td>
      <td class="td-nis">${s.nis || '-'}</td>
      <td class="td-nama">${s.nama || '-'}</td>
      <td>
        <button class="btn-detail" onclick="lihatDetail('${s.id}')">Detail</button>
      </td>
    </tr>
  `).join('');
}

/** Navigasi ke halaman detail */
function lihatDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

/** Filter pencarian */
function filterSiswa() {
  const kata = document.getElementById('searchInput').value.toLowerCase();
  const hasil = semuaSiswa.filter(s =>
    (s.nama  || '').toLowerCase().includes(kata) ||
    (s.nis   || '').toLowerCase().includes(kata) ||
    (s.kelas || '').toLowerCase().includes(kata)
  );
  renderTabel(hasil);
}

/** Inisialisasi halaman */
function init() {
  semuaSiswa = getAllSiswa();

  // Tambahkan data contoh "Zahrotul Jannah Agustin" jika masih kosong
  if (semuaSiswa.length === 0) {
    tambahSiswa({
      nama:         'Zahrotul Jannah Agustin',
      nis:          '242510201',
      tempatLahir:  'Bandung',
      tanggalLahir: '2007-08-15',
      jenisKelamin: 'Perempuan',
      agama:        'Islam',
      kelas:        '11 PPLG B',
      telepon:      '085712345678',
      alamat:       'Jln. Soekarno Hatta No. 12, RT02/RW03, Kel. Sukapura, Kec. Kiaracondong, Kota Bandung',
      namaOrtu:     'Ahmad Agustin',
      teleponOrtu:  '081234567890',
    });
    semuaSiswa = getAllSiswa();
  }

  renderTabel(semuaSiswa);
}

document.addEventListener('DOMContentLoaded', init);
