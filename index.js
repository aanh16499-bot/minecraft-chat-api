const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const OPENAI_KEY = "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";

app.post("/chat", async (req,res)=>{

 const {player,message} = req.body;

 if(!message.toLowerCase().includes("@luuly")){
  return res.json({reply:null});
 }

 const text = message.replace("@luuly","");

 try{

 const ai = await fetch("https://api.openai.com/v1/chat/completions",{
  method:"POST",
  headers:{
   "Content-Type":"application/json",
   "Authorization":`Bearer ${OPENAI_KEY}`
  },
  body:JSON.stringify({
   model:"gpt-4o-mini",
   messages:[
    {role:"system",content:"Bạn là AI trong server Minecraft"},
    {role:"user",content:text}
   ]
  })
 });

 const data = await ai.json();

 const reply = data.choices[0].message.content;

 res.json({
  reply:`@${player} ${reply}`
 });

 }catch(e){

 res.json({
  reply:`@${player} AI đang lỗi`
 });

 }

});

app.listen(3000,()=>{
 console.log("AI API running");
});
