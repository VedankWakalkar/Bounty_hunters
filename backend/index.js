const express = require("express")
const rootRouter=require("./routes/index")

const app = express();
app.use(cors());
app.use("/api/",rootRouter)
const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})