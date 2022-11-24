import { Router } from 'express';


const STATUS_CODE = {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      NOT_FOUND: 404,
    };
const router = Router();

router.get('/info', (req, res) => {
      const argv =process.argv[1]
      const plataforma =process.platform
      const version =process.version
      const memory=process.memoryUsage()
      const exec= process.execPath
      const pid = process.pid
      const cwd=process.cwd()
      res.status(STATUS_CODE.OK).json({argumentosEntrada :argv,NombrePlataforma:plataforma,versionNode:version,memoriaReservada:memory,pathEjecucion:cwd,ProcessId:pid,CarpetaProyecto:exec});
      }
);

export default router;