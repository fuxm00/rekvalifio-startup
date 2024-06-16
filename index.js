import {app} from "./src/app.js";

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})