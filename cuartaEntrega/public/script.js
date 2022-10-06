
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
    tr.innerHTML = `<td>${data.id}</td> <td>${data.title}</td> <td>${data.price}</td>  <td><img src=${data.thumbnail} alt=${data.title} width="50px"></td>`;
    tableProducts.appendChild(tr);
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

  socket.on("add", (data) => {
    newProducts.push(data);
    showProducts(data);
  });

 
   //SOCKET CHAT
   const formMessage = document.getElementById("form-message");
   const inputEmail = document.getElementById("input-email");
   const inputMessage = document.getElementById("input-message");
   const listMessages = document.getElementById("list-messages");

   let messages = [];
 
   function htmlList(mensajes) {
    return mensajes.map(mensaje => {
        return ( `<li style="color:green;"><strong style="color:blue;">${mensaje.email}</strong>--<span style="color:red;">${mensaje.date}</span>: ${mensaje.message}</li>`) 
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
     messages.push(dataChat);
     console.log(messages)
     const li = htmlList(messages)
     listMessages.innerHTML = li;
   });


