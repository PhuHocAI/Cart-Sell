document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  if (name.trim() == "") {
    alert("Vui lòng nhập tên sản phẩm");
    return;
  }
  let price = document.querySelector("#price").value;
  let amount = document.querySelector("#amount").value;
  let image = document.querySelector("#image").value;
  let description = document.querySelector("#product-description").value;
  let id = "10" + name.trim() + price + "01";
  let item = {
    id: id,
    name: name.trim(),
    price: price.trim(),
    amount: amount.trim(),
    image: image.trim(),
    description: description.trim(),
    sellprice: price * 0.5,
  };
  console.log(item);
  let confirmAdd = confirm("Bạn có muốn thêm sản phẩm này không?");
  if (confirmAdd) {
    addItemToUI(item);
    addItemToLS(item);
  }
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#amount").value = "";
  document.querySelector("#image").value = "";
  document.querySelector("#product-description").value = "";
});

const addItemToUI = ({
  name,
  id,
  price,
  amount,
  image,
  description,
  sellprice,
}) => {
  let newCard = document.createElement("div");
  newCard.className = "_product border border-dark mb-4";
  newCard.innerHTML = `
    <div class="product-pic">
      <img
        src="${image}"
      />
    </div>
    <div class="product-content p-2">
      <h3>${name}</h3>
      <div class="d-flex justify-content-between">
        <div>
          <h4>${sellprice}$</h4>
        </div>
        <div>
          <h4 style="text-decoration: line-through">${price}$</h4>
        </div>
      </div>
    </div>
  `;

  document.querySelector(".product").appendChild(newCard);
};

const getProduct = () => {
  return JSON.parse(localStorage.getItem("product")) || [];
};
const addItemToLS = (item) => {
  let product = getProduct();
  product.push(item);
  localStorage.setItem("product", JSON.stringify(product));
};
const init = () => {
  let product = getProduct(); //lấy danh sách từ local storage xuống
  //chơi 1 con for chạy qua từng item trong list
  product.forEach((item) => {
    //hiển thị item lên UI
    addItemToUI(item);
  });
};
init();

//CHỨC NĂNG XÓA SẢN PHẨM
document.querySelector(".btn-delete").addEventListener("click", (event) => {
  let name = document.querySelector("#name").value;
  let price = document.querySelector("#price").value;
  let amount = document.querySelector("#amount").value;

  if (name.trim() == "" || price.trim() == "" || amount.trim() == "") {
    alert("Vui lòng nhập đầy đủ thông tin để xóa sản phẩm");
    return;
  }

  let isConfirm = confirm(
    `Bạn có muốn xóa ${amount} sản phẩm ${name} với giá gốc là ${price} không?`
  );
  if (isConfirm) {
    idRemove = "10" + name + price + "01";
    removeItemFromLS(idRemove, amount);
  }
});

const removeItemFromLS = (idRemove, amount) => {
  let product = getProduct(); // Lấy danh sách từ Local Storage
  // Cập nhật danh sách sản phẩm
  product = product
    .map((item) => {
      if (item.id == idRemove) {
        item.amount -= amount; // Giảm số lượng
      }
      return item;
    })
    .filter((item) => item.amount > 0); // Loại bỏ sản phẩm nếu số lượng <= 0

  alert("Đã cập nhật số lượng idol thành công!");
  window.location.reload();
  localStorage.setItem("product", JSON.stringify(product));
};

//CHỨC NĂNG CLEAR
document.querySelector(".btn-clear").addEventListener("click", (event) => {
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#amount").value = "";
  document.querySelector("#image").value = "";
  document.querySelector("#product-description").value = "";
});

//CHỨC NĂNG FILTER
document.querySelector(".btn-search").addEventListener("click", (event) => {
  event.preventDefault();
  let searching = document.querySelector(".search-input").value;
  console.log(searching);
  let product = getProduct();
  product = product.filter((item) => item.name.includes(searching));

  document.querySelector(".product").innerHTML = "";
  product.forEach((item) => {
    addItemToUI(item);
  });
});
