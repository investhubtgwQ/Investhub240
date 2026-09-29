import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import plansRouter from "./plans";
import investmentsRouter from "./investments";
import transactionsRouter from "./transactions";
import dashboardRouter from "./dashboard";
import walletRouter from "./wallet";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(plansRouter);
router.use(investmentsRouter);
router.use(transactionsRouter);
router.use(dashboardRouter);
router.use(walletRouter);
router.use(adminRouter);

export default router;
