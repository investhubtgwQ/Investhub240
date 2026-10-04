import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import plansRouter from "./plans.js";
import investmentsRouter from "./investments.js";
import transactionsRouter from "./transactions.js";
import dashboardRouter from "./dashboard.js";
import walletRouter from "./wallet.js";
import adminRouter from "./admin.js";

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
