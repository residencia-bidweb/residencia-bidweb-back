import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./src/config/database"; // ← ajusta se seu db.ts estiver em outro lugar

async function run() {
    console.log("🚀 Aplicando migrações...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Migrações aplicadas com sucesso!");
    process.exit(0);
}

run().catch(err => {
    console.error("❌ Erro na migração:", err);
    process.exit(1);
});