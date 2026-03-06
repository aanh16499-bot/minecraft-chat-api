import express from "express";

const app = express();
app.use(express.json());

app.post("/chat", (req, res) => {
    const player = req.body.player;
    const message = req.body.message;

    const reply = `Xin chào ${player}, bạn nói: ${message}`;

    res.json({
        reply: reply
    });
});

app.listen(3000, () => {
    console.log("API chạy tại port 3000");
});