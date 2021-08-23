// Projek Muhamad Risqi Khasani

//dom
const LIST_BELUM_DIBACA = "incompleteBookshelfList";
const LIST_SUDAH_DIBACA = "completeBookshelfList";
const LIST_ITEM_ID = "bukuId";

const inputan = (event) => {
  event.preventDefault();

  const rakBelumDIbaca = document.getElementById(LIST_BELUM_DIBACA);
  const rakSudahDibaca = document.getElementById(LIST_SUDAH_DIBACA);

  const inputJudul = document.getElementById("inputJudul");
  const inputPenulis = document.getElementById("inputPenulis");
  const inputTahun = document.getElementById("inputTahun");
  const inputSelesai = document.getElementById("inputSelesai");

  const isiInputan = {
    judul: inputJudul.value,
    penulis: inputPenulis.value,
    tahun: inputTahun.value,
    selesai: inputSelesai.checked,
  };

  const buku = buatBuku(
    isiInputan.judul,
    isiInputan.penulis,
    isiInputan.tahun,
    isiInputan.selesai
  );

  const inputBukuObjek = Objectbuku(
    isiInputan.judul,
    isiInputan.penulis,
    isiInputan.tahun,
    isiInputan.tahun
  );

  console.log(inputBukuObjek);

  buku[LIST_ITEM_ID] = inputBukuObjek.id;
  rakBuku.push(inputBukuObjek);

  if (isiInputan.selesai) {
    rakSudahDibaca.appendChild(buku);
  } else {
    rakBelumDIbaca.appendChild(buku);
  }

  updateDataStorage();
};

const buatBuku = (judul, penulis, tahun, selesai) => {
  const container = document.createElement("article");
  container.classList.add("book_item");
  const elementJudulBuku = document.createElement("h3");
  elementJudulBuku.innerText = judul;
  const elementPenulisBuku = document.createElement("h4");
  elementPenulisBuku.innerText = penulis;
  const elementTahunBuku = document.createElement("p");
  elementTahunBuku.innerText = tahun;

  const containerButton = document.createElement("div");
  containerButton.classList.add("action");

  container.appendChild(elementJudulBuku),
    container.appendChild(elementPenulisBuku),
    container.appendChild(elementTahunBuku);

  if (selesai) {
    containerButton.append(buatButtonBelumSelesai(), buatButtonHilang());
  } else {
    containerButton.append(buatButtonSelesai(), buatButtonHilang());
  }

  container.appendChild(containerButton);

  return container;
};

const tambahBukuKeSelesai = (elementBuku) => {
  const rakSudahDibaca = document.getElementById(LIST_SUDAH_DIBACA);

  const judulBuku = elementBuku.querySelector(".book_item > h3").innerText;
  const penulisBuku = elementBuku.querySelector(".book_item > h4").innerText;
  const tahunBuku = elementBuku.querySelector(".book_item> p").innerText;

  const bukuBaru = buatBuku(judulBuku, penulisBuku, tahunBuku, true);
  const buku = findbuku(elementBuku[LIST_ITEM_ID]);
  buku.selesai = true;
  bukuBaru[LIST_ITEM_ID] = buku.id;

  rakSudahDibaca.appendChild(bukuBaru);
  elementBuku.remove();

  updateDataStorage();
};

const tambahKesebelumSelesai = (elementBuku) => {
  const rakBelumDIbaca = document.getElementById(LIST_BELUM_DIBACA);
  const judulBuku = elementBuku.querySelector(".book_item > h3").innerText;
  const penulisBuku = elementBuku.querySelector(".book_item > h4").innerText;
  const tahunBuku = elementBuku.querySelector(".book_item > p").innerText;

  const bukuBaru = buatBuku(judulBuku, penulisBuku, tahunBuku, false);
  const buku = findbuku(elementBuku[LIST_ITEM_ID]);
  buku.selesai = false;
  bukuBaru[LIST_ITEM_ID] = buku.id;

  rakBelumDIbaca.appendChild(bukuBaru);
  elementBuku.remove();

  updateDataStorage();
};

function dialogHapus(elementBuku) {
  const konfir = confirm("Apakah anda yakin menghapus buku ini ? ");
  if (konfir === true) {
    hilangBuku(elementBuku);
  }
}

function hilangBuku(elementBuku) {
  const bukuPosisi = findBukuIndex(elementBuku[LIST_ITEM_ID]);
  rakBuku.splice(bukuPosisi, 1);

  elementBuku.remove();
  updateDataStorage();
}

const buatButton = (classButton, textButtton, eventListener) => {
  const button = document.createElement("button");
  button.classList.add(classButton);
  button.innerText = textButtton;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
};

function buatButtonBelumSelesai() {
  const buttonBelumSelesaiBaca = buatButton(
    "green",
    "Belum Selesai dibaca",
    function (event) {
      tambahKesebelumSelesai(event.target.parentElement.parentElement);
    }
  );
  return buttonBelumSelesaiBaca;
}

function buatButtonSelesai() {
  const buttonSelesai = buatButton("green", "Selesai Baca", function (event) {
    tambahBukuKeSelesai(event.target.parentElement.parentElement);
  });
  return buttonSelesai;
}

function buatButtonHilang() {
  const buttonHilang = buatButton("red", "Hapus Buku", function (event) {
    dialogHapus(event.target.parentElement.parentElement);
  });
  return buttonHilang;
}

const cariBuku = (bukuDicari) => {
  bukuDicari.preventDefault();
  const cariJudulBuku = document.getElementById("cariJudulBuku").value;

  const rakBelumDibaca = document.getElementById(LIST_BELUM_DIBACA);
  const rakSudahDibaca = document.getElementById(LIST_SUDAH_DIBACA);

  let filterBuku = rakBuku.filter((buku) => {
    return buku.judul.includes(cariJudulBuku);
  });
  const sumRakBelumDibaca =
    document.getElementById(LIST_BELUM_DIBACA).childElementCount;
  const sumRakSudahDibaca =
    document.getElementById(LIST_SUDAH_DIBACA).childElementCount;

  let i = 0;

  while (i < sumRakBelumDibaca) {
    rakBelumDibaca.removeChild(rakBelumDibaca.lastElementChild);
    i++;
  }

  while (i < sumRakSudahDibaca) {
    rakSudahDibaca.removeChild(rakSudahDibaca.lastElementChild);
    i++;
  }

  for (buku of filterBuku) {
    const bukuBaru = buatBuku(
      buku.judul,
      buku.penulis,
      buku.tahun,
      buku.selesai
    );
    bukuBaru[LIST_ITEM_ID] = buku.id;

    if (buku.selesai) {
      rakSudahDibaca.append(bukuBaru);
    }
    if(buku.selesai === false) {
      rakBelumDibaca.append(bukuBaru);
    }
  }
};

//main
window.addEventListener("load", function () {
  const input = document.getElementById("inputBuku"),
    cari = document.getElementById("cariBuku");

  input.addEventListener("submit", inputan),
    cari.addEventListener("submit", cariBuku);

  if (isStorageExist()) {
    loadDatadariStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshData();
});
