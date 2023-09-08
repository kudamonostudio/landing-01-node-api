import app from "./app.js";
import { connectToDB } from "./config/mongoose.js";
import { PORT } from "./config/environment.js";

async function main() {
  await connectToDB();
  app.listen(PORT);
  console.log(`port running ${process.env.PORT}`);
}

main()
