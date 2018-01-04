const express=require('express');
const app = express();
const fs=require('fs');

app.get('/',(req,res)=>{
	fs.readFile('index.html',(err,data)=>{
		if (err) {res.end('some errors happen')}
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		res.end()
	})
})
app.get('/:id',(req,res)=>{
	res.setHeader('Content-Type', 'application/json')
	let unix=req.params.id;
	let natural=new Date(Number(unix)).toDateString();
	if (natural==="Invalid Date"){
		natural=new Date(unix).toDateString()
		if (natural==="Invalid Date"){
		unix=null;
		natural=null;
		}else{
			unix=Number(new Date(natural).getTime()/1000).toFixed(0)
		}
	}
	const returnObject=JSON.stringify({unix:unix,natural:natural});
	res.send(returnObject);
})

app.listen(1337)
