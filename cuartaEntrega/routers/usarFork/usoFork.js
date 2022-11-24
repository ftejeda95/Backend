import { fork } from 'child_process'
// import { Router } from 'express';


// const router = Router();

// router.get('/randoms/:cant?', (req,res)=>{
//     const cant=req.params.cant || 2
//     const computo=fork('./routers/usarFork/calculo.js')
//     computo.send(parseInt(cant))
//     computo.on('message', repetido=>{
//         console.log(repetido);
//           res.end(JSON.stringify(repetido))
//     })
// })

// else if (url == "/api/randoms") {
//     let cant = 2000000;
//     const computo = fork("./routers/usarFork/calculo.js");
//     computo.send(parseInt(cant));
//     computo.on("message", (repetido) => {
//       console.log(repetido);
//       res.end(JSON.stringify(repetido));
//     });
//   }
// export default router