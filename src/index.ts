import app from "./app";
require("dotenv").config();
console.log(process.env);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
