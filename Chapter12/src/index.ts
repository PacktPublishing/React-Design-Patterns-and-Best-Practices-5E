import express from "express";
import { config } from "./config";
import "./db/index";
import { registerDynamicRoutes } from "./api/factory";
import { registerRelationalRoutes } from "./api/relational";
import { registerDynamicRelationalRoutes } from "./api/relational-factory";
import { registerCachedRoutes } from "./api/cached-factory";
import { registerSearchRoutes } from "./api/search";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

registerCachedRoutes(app);
registerDynamicRoutes(app);
registerRelationalRoutes(app);
registerDynamicRelationalRoutes(app);
registerSearchRoutes(app);

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log("📊 Database connected");
  console.log("⚡ Dynamic APIs active");
});

export default app;
