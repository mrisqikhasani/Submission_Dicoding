//data
const STORAGE_KEY = "BUKU";

let rakBuku = [];

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const item = JSON.stringify(rakBuku);
  localStorage.setItem(STORAGE_KEY, item);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDatadariStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let item = JSON.parse(serializedData); 

  if (item !== null) 
    rakBuku = item;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataStorage() {
  if (isStorageExist()) 
      saveData();
}

function Objectbuku(judul, penulis, tahun, selesai) {
  return {
    id: +new Date(),
    judul,
    penulis,
    tahun,
    selesai,
  };
}

function findbuku(bukuId) {
  for (buku of rakBuku) {
    if (buku.id === bukuId) 
      return buku;
  }
  return null;
}

function findBukuIndex(bukuId) {
  let index = 0;
  for (buku of rakBuku) {
    if (buku.id === bukuId) 
        return index;

    index++;
  }

  return -1;
}

function refreshData() {
  const rakBelumDIbaca = document.getElementById(LIST_BELUM_DIBACA);
  const rakSudahDibaca = document.getElementById(LIST_SUDAH_DIBACA);

  for (buku of rakBuku) {
    const bukuBaru = buatBuku(
      buku.judul,
      buku.penulis,
      buku.tahun,
      buku.selesai
    );
    bukuBaru[LIST_ITEM_ID] = buku.id;   

    if (buku.selesai) {
      rakSudahDibaca.append(bukuBaru);
    } else {
      rakBelumDIbaca.append(bukuBaru);
    }
  }
}


