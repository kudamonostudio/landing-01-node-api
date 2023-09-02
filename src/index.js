import app from "./app.js";
import { connectToDB } from "./config/mongoose.js";

async function main() {
  await connectToDB();
  app.listen(3000);
  console.log(`port running ${process.env.PORT}`);
}

main()
