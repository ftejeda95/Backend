
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
    data.forEach(element => {
      tr.innerHTML = `<td>${element.id}</td> <td>${element.title}</td> <td>${element.price}</td>  <td><img src=${element.thumbnail} alt=${element.title} width="50px"></td>`;
      tableProducts.appendChild(tr);
    });
    

  };

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
   const formMessage = document.getElementById("form-message");
   const inputEmail = document.getElementById("input-email");
   const inputMessage = document.getElementById("input-message");
   const listMessages = document.getElementById("list-messages");

   let messages = [];
 
   function htmlList(mensajes) {
   mensajes.forEach(mensaje => {
      const li = document.createElement("li");
      li.innerHTML =  `<li style="color:green;"><strong style="color:blue;">${mensaje.email}</strong>--<span style="color:red;">${mensaje.date}</span>: ${mensaje.message}</li>`
      listMessages.appendChild(li);
    });
}
   formMessage.addEventListener("submit", (event) => {
     event.preventDefault();
     const dataChat = {
       email: inputEmail.value,
       message: inputMessage.value,
     };
     socket.emit("new-message", dataChat);
     inputMessage.value = "";
     inputMessage.focus();
   });
 
   socket.on("notification", (dataChat) => {
    const li = document.createElement("li");
    li.innerHTML =  `<li style="color:green;"><strong style="color:blue;">${dataChat.email}</strong>--<span style="color:red;">${dataChat.date}</span>: ${dataChat.message}</li>`
    listMessages.appendChild(li);

   });


