import { Router } from 'express';
import compression from "compression";
import logger from '../../logger.js'

const STATUS_CODE = {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      NOT_FOUND: 404,
    };
const router = Router();

router.get('/info',  compression(), (req, res) => {
      try {
            const data = {
                  cpus: os.cpus().length,
                  arg: process.argv.slice(2),
                  so: process.platform,
                  vn: process.version,
                  rss: process.memoryUsage().rss,
                  pe: process.execPath,
                  pid: process.pid,
                  carp: process.cwd(),
            };
            logger.info(`Ruta ${req.originalUrl} metodo GET`);
            res.render('./info', data);
      } catch (error) {
            next(error);
      }}
);

export default router;