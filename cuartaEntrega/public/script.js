const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("input-title");
const inputPrice = document.getElementById("input-price");
const inputThumbnail = document.getElementById("input-thumbnail");
const tableProducts = document.getElementById("show-products");
// SOCKET PRODUCTOS
let newProducts = [];

const socket = io();

function showProducts(data) {
  const tr = document.createElement("tr");
  data.forEach((element) => {
    tr.innerHTML = `<td>${element.id}</td> <td>${element.title}</td> <td>${element.price}</td>  <td><img src=${element.thumbnail} alt=${element.title} width="50px"></td>`;
    tableProducts.appendChild(tr);
  });
}

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: inputTitle.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
  };
  socket.emit("new-products", data);
});

socket.on("add", (newProducts) => {
  showProducts(newProducts);
});

//SOCKET CHAT
const tilte = document.getElementById("title")
const formMessage = document.getElementById("form-message");
const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const inputEdad = document.getElementById("input-edad");
const inputAlias = document.getElementById("input-alias");
const inputAvatar = document.getElementById("input-avatar");
const inputEmail = document.getElementById("input-email");
const inputMessage = document.getElementById("input-message");
const listMessages = document.getElementById("list-messages");

let messages = [];

function htmlList(mensajes) {
  mensajes.forEach((mensaje) => {
    const li = document.createElement("li");
    li.innerHTML = `<li style="color:green;"><strong style="color:blue;">${mensaje.email}</strong>--<span style="color:red;">${mensaje.date}</span>: ${mensaje.message}</li>`;
    listMessages.appendChild(li);
  });
}
formMessage.addEventListener("submit", (event) => {
  event.preventDefault();
  const dataChat = {
    email: inputEmail.value,
    message: inputMessage.value,
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    edad: inputEdad.value,
    alias: inputAlias.value,
    avatar: inputAvatar.value,
  };
  socket.emit("new-message", dataChat);
  inputMessage.value = "";
  inputMessage.focus();
});

socket.on("notification", (data) => {
  const authorScheme = new normalizr.schema.Entity(
    "author",
    {},
    { idAttribute: "email" }
  );

  const messageScheme = new normalizr.schema.Entity("mensaje", {
    author: authorScheme,
  });
  const postScheme = new normalizr.schema.Entity("mensaje", {
    mensaje: [messageScheme],
  });
  const dataReversed = normalizr.denormalize(
    data.result,
    postScheme,
    data.entities
  );

  const originalSize = JSON.stringify(dataReversed).length;
  const normalizedSize = JSON.stringify(data).length;
  const resultSata = (normalizedSize * 100) / originalSize;
  let totalTotal = resultSata.toFixed(2);
  console.log(data, normalizedSize);

  console.log(
    "--------------------------------------------------------------------"
  );
  console.log(dataReversed, originalSize);
  tilte.innerText = "";
  console.log(`Porcentaje de compresion: ${totalTotal}%`);
  tilte.innerText = `Porcentaje de compresion: ${totalTotal}%`;
  const li = document.createElement("li");
  li.innerHTML = `<li style="color:green;"><strong style="color:blue;">${dataReversed.author.email}</strong>--<span style="color:red;">${dataReversed.date}</span> <img img src="${dataReversed.author.avatar}" alt="${dataReversed.author.nombre}" width="50px">: ${dataReversed.text}</li>`;
  listMessages.appendChild(li);
});
