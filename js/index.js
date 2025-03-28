// B1: Lay du lieu cua nguoi dung nhap vao 
const Key_Local = "arrNhanVien"
let arrNhanVien = getDataNhanVienLocal();
let arrFilterNhanVien = [];
renderListNhanVien();

document.getElementById("btnThemNV").onclick = function (e) {

    let arrField = document.querySelectorAll("#fromQLNV input , #fromQLNV select");
    console.log(arrField)
    let gioLam = document.getElementById("gioLam").value * 1;
    console.log(arrField);
    let nhanVien = {};
    for (let field of arrField) {
        console.log(field);
        let { id, value } = field;
        nhanVien[id] = value;
    }
    console.log(nhanVien);
    nhanVien.xepLoai = kiemTraXepLoaiNhanVien(gioLam);
    arrNhanVien.push(nhanVien);
    saveDataNhanVienLocal();
    console.log(arrNhanVien)
    let chucVu = nhanVien.chucvu;
    nhanVien.tongLuong = tinhTongLuong(chucVu);
    tinhTongLuong(chucVu);
    kiemTraXepLoaiNhanVien(gioLam);
    renderListNhanVien();
    document.getElementById("fromQLNV").reset();
}


//B2 render hien thi nhung nguoi dung len tren giao dien

function renderListNhanVien(arr = arrNhanVien) {
    let content = "";
    for (let nhanVien of arr) {
        let { tknv, name, email, password, datepicker, tongLuong, chucvu, xepLoai } = nhanVien

        content += `
        <tr>
        <td>${tknv}</td>
        <td>${name}</td>
        <td>${email}</td> 
        <td>${datepicker}</td>
        <td>${chucvu}</td>
        <td>${tongLuong}</td>
        <td>${xepLoai}</td>
       
        <td>
        <button onclick="xoaSinhVien('${tknv}')" class="btn btn-danger">Xóa </button>
        <button onclick="laythongTinSV('${tknv}')" class=" btn btn-warning">Sửa</button>
        </td>
        </tr>`;
    }
    document.getElementById("tableDanhSach").innerHTML = content;

}

// tao ham kiem tra xep loai nhan vien
function kiemTraXepLoaiNhanVien(gioLam) {
    if (gioLam >= 192) {
        return "Xuất Sắc";
    } else if (gioLam >= 176) {
        return "Giỏi";
    } else if (gioLam >= 160) {
        return "Khá";
    } else {
        return "Trung Bình";
    }
}

// Tinh Tong Luong
function tinhTongLuong(chucVu,) {
    let luongCB = document.getElementById("luongCB").value * 1;
    saveDataNhanVienLocal();
    if (chucVu == "Sếp") {
        return luongCB * 3;
    } else if (chucVu == "Trưởng phòng") {
        return luongCB * 2;
    } else {
        return luongCB * 1;
    }

}
// // reset
// function reset() {
//     document.querySelectorAll("#fromQLNV input , #fromQLNV select").value = "";
// }


// B3: Luuw truwx xuoongs local

// setItem()
function saveDataNhanVienLocal() {
    let dataString = JSON.stringify(arrNhanVien);
    localStorage.setItem("Key_Local", dataString);
    console.log(saveDataNhanVienLocal)

}
// getItem()
function getDataNhanVienLocal() {
    let dataLocal = localStorage.getItem("Key_Local");
    return dataLocal ? JSON.parse(dataLocal) : [];

}

// Phuongw thuwcs Xoa Phan Tu Mang (splice(vitricanxoa,soluong))
function xoaSinhVien(taiKhoan) {
    console.log(tknv);
    // fineindex
    let viTri = arrNhanVien.findIndex((item, index) => {
        return item.tknv === taiKhoan
    });
    if (viTri != -1) {
        arrNhanVien.splice(viTri, 1);
        saveDataNhanVienLocal();
        renderListNhanVien();
    }
}

// Sua
function laythongTinSV(taiKhoan) {
    // dungf taikhoan de tim kiem sinh vien trong mang
    let nhanVien = arrNhanVien.find((item) => {
        return item.tknv === taiKhoan;

    })
    if (nhanVien) {
        let arrField = document.querySelectorAll("#fromQLNV input , #fromQLNV select");
        for (let field of arrField) {
            console.log(arrField)
            let { id } = field
            field.value = nhanVien[id];
            if (id === "tknv") {
                field.readOnly = true;
            }
        }


    }
    // dua du lieu thong tin sinh vien vao cac input va select
    // ngan chan nguoi dung sua mssv
}
function capNhatThongTinSV() {
    //  gan function vao su kien click cua button capnhat
    // lay du lieu tu form 
    //  tim kiem xem phan tu dang can chinh sua nam o vi tri index nao trong mnag
    //  goij toi vi tri index do va thay the du lieu cu vs du lieu moi
    //  cap nhat dl o local
    // render
    // clear du lieu tu form va bo readonly cho tknv
}
document.getElementById("searchName").oninput = function (e) {

    let keyWord = removeVietnameseTones(e.target.value.toLowerCase());
    console.log(keyWord);
    let arrFilter = arrNhanVien.filter((item, index) => {
        let xepLoaiNV = item.xepLoai;
        let converXLNV = removeVietnameseTones(xepLoaiNV.toLowerCase());
        console.log(converXLNV);
        return converXLNV.includes(keyWord);
    })
    console.log(arrFilter)
    arrFilterNhanVien = arrFilter;
    renderListNhanVien(arrFilterNhanVien);
}
// KHI Loc can phai tao mot mang moi de khi kh loc con mang de tra ve