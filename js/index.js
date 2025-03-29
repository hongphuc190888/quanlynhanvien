// B1: Lay du lieu cua nguoi dung nhap vao
const Key_Local = "arrNhanVien";
let arrNhanVien = getDataNhanVienLocal();
let arrFilterNhanVien = [];
renderListNhanVien();
function layDLTuForm() {
    let arrField = document.querySelectorAll(
        "#fromQLNV input , #fromQLNV select"
    );
    console.log(arrField);

    let nhanVien = {};
    for (let field of arrField) {
        console.log(field);
        let { id, value } = field;
        nhanVien[id] = value;
    }
    return nhanVien;
}

document.getElementById("btnThemNV").onclick = function (e) {
    let nhanVien = layDLTuForm();
    console.log(nhanVien);

    // Lấy thẻ thông báo lỗi
    let tbTKNV = document.getElementById("tbTKNV");
    let tbTen = document.getElementById("tbTen");
    let tbEmail = document.getElementById("tbEmail");
    let tbMatKhau = document.getElementById("tbMatKhau");
    let tbNgay = document.getElementById("tbNgay");
    let tbLuongCB = document.getElementById("tbLuongCB");
    let tbChucVu = document.getElementById("tbChucVu");
    let tbGiolam = document.getElementById("tbGiolam");

    let erromsg = "Nhập Thông Tin";

    let isValid = true;

    // Kiểm tra các ô nhập có bị trống không
    isValid =

        kiemTraThongTinNhapVao(nhanVien.tknv, tbTKNV, erromsg) &&
        kiemTraThongTinNhapVao(nhanVien.name, tbTen, erromsg) &&
        kiemTraThongTinNhapVao(nhanVien.email, tbEmail, erromsg) &&

        kiemTraMatKhau(nhanVien.password, tbMatKhau, "Phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt") &&
        kiemTraThongTinNhapVao(nhanVien.datepicker, tbNgay, erromsg) &&

        isNumber(nhanVien.luongCB, tbLuongCB, 1000000, 20000000) &&
        kiemTraThongTinNhapVao(nhanVien.chucvu, tbChucVu, erromsg) &&

        isTime(nhanVien.gioLam, tbGiolam, 80, 200);


    let gioLam = Number(document.getElementById("gioLam").value);
    nhanVien.xepLoai = kiemTraXepLoaiNhanVien(gioLam);

    if (isValid) {
        arrNhanVien.push(nhanVien);
        saveDataNhanVienLocal();
        let chucVu = nhanVien.chucvu;
        nhanVien.tongLuong = tinhTongLuong(nhanVien.luongCB, chucVu);
        renderListNhanVien();
        document.getElementById("fromQLNV").reset();
    }
};

// Kiểm tra thông tin có bị trống không
function kiemTraThongTinNhapVao(value, span, erromsg) {
    if (value.trim() === "") {
        span.innerHTML = erromsg;
        span.style.display = "block";
        return false;
    } else {
        span.innerHTML = "";
        span.style.display = "none";
        return true;
    }
}

// Kiểm tra chức vụ có hợp lệ không
function kiemTraChucVu(value, span) {
    if (value === "") {
        span.innerHTML = "Chọn Chức Vụ";
        span.style.display = "block";
        return false;
    } else {
        span.innerHTML = "";
        span.style.display = "none";
        return true;
    }
}

// Kiểm tra số lương có hợp lệ không
function isNumber(value, span, min, max) {
    let numValue = Number(value);

    if (value.trim() === "") {
        span.innerHTML = "Vui lòng nhập giá trị";
        span.style.display = "block";
        return false;
    }

    if (isNaN(numValue)) {
        span.innerHTML = "Vui lòng nhập giá trị là số";
        span.style.display = "block";
        return false;
    }

    if (numValue < min || numValue > max) {
        span.innerHTML = `Vui lòng nhập giá trị từ ${min}-${max}`;
        span.style.display = "block";
        return false;
    }

    span.innerHTML = "";
    span.style.display = "none";
    return true;
}

// Kiểm tra số giờ làm có hợp lệ không
function isTime(value, span, min, max) {
    let numValue = Number(value);

    if (value.trim() === "") {
        span.innerHTML = "Vui lòng nhập số giờ làm";
        span.style.display = "block";
        return false;
    }

    if (isNaN(numValue)) {
        span.innerHTML = "Vui lòng nhập giá trị là số";
        span.style.display = "block";
        return false;
    }

    if (numValue < min || numValue > max) {
        span.innerHTML = `Nhập thời gian từ ${min} đến ${max}`;
        span.style.display = "block";
        return false;
    }

    span.innerHTML = "";
    span.style.display = "none";
    return true;
}

//B2 render hien thi nhung nguoi dung len tren giao dien

function renderListNhanVien(arr = arrNhanVien) {
    let content = "";
    for (let nhanVien of arr) {
        let {
            tknv,
            name,
            email,
            password,
            datepicker,
            tongLuong,
            chucvu,
            xepLoai,
        } = nhanVien;

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
        <button onclick="laythongTinSV('${tknv}')" class=" btn btn-warning"data-toggle="modal" data-target="#myModal">Sửa</button>
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
function tinhTongLuong(chucVu) {
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
function kiemTraMatKhau(password, span, erromsg) {
    if (!password || password.trim() === "") {
        span.innerHTML = "Vui lòng nhập mật khẩu!";
        span.style.display = "block";
        return false;
    }

    let regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;
    let checkpassword = regex.test(password);

    console.log(checkpassword);
    if (!checkpassword) {
        span.innerHTML = erromsg;
        span.style.display = "block";
        return false;
    }

    span.innerHTML = "";
    span.style.display = "none";
    return true;
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
    console.log(saveDataNhanVienLocal);
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
        return item.tknv === taiKhoan;
    });
    if (viTri != -1) {
        arrNhanVien.splice(viTri, 1);
        saveDataNhanVienLocal();
        renderListNhanVien();
    }
}

// Sua
function laythongTinSV(taiKhoan) {
    // Dùng tài khoản để tìm kiếm nhân viên trong mảng
    let nhanVien = arrNhanVien.find((item) => item.tknv === taiKhoan);

    if (nhanVien) {
        let arrField = document.querySelectorAll(
            "#fromQLNV input, #fromQLNV select"
        );

        for (let field of arrField) {
            let { id } = field;
            field.value = nhanVien[id];

            // Không cho phép chỉnh sửa tài khoản nhân viên
            if (id === "tknv") {
                field.readOnly = true;
            }
        }
    }
}

function capNhatThongTinSV() {
    let nhanVien = layDLTuForm();

    let viTriCanTim = arrNhanVien.findIndex(
        (item) => item.tknv === nhanVien.tknv
    );

    if (viTriCanTim !== -1) {
        // Cập nhật thông tin nhân viên trong mảng
        arrNhanVien[viTriCanTim] = nhanVien;

        // Lưu dữ liệu vào LocalStorage
        saveDataNhanVienLocal();

        // Hiển thị lại danh sách
        renderListNhanVien();

        // Reset form
        document.getElementById("fromQLNV").reset();

        // Cho phép sửa tài khoản sau khi cập nhật xong
        document.getElementById("tknv").readOnly = false;
    }
}

// Gán sự kiện đúng cách (chỉ gán hàm, không gọi ngay)
document.querySelector(".btn-capnhat").onclick = capNhatThongTinSV;

document.getElementById("searchName").oninput = function (e) {
    let keyWord = removeVietnameseTones(e.target.value.toLowerCase());
    console.log(keyWord);
    let arrFilter = arrNhanVien.filter((item, index) => {
        let xepLoaiNV = item.xepLoai;
        let converXLNV = removeVietnameseTones(xepLoaiNV.toLowerCase());
        console.log(converXLNV);
        return converXLNV.includes(keyWord);
    });
    console.log(arrFilter);
    arrFilterNhanVien = arrFilter;
    renderListNhanVien(arrFilterNhanVien);
};
// KHI Loc can phai tao mot mang moi de khi kh loc con mang de tra ve
