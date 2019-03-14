
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8081
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
	res.send(`<h1>Running user-submitted code in Docker</h1>
		<h3>
		Run 'docker build -t virtual_machine .' in the root of this project, then send a /POST request to port ${PORT} with some untrusted code javascript code as JSON like this:</h3>

		<p>
		{
			</br>
			<p style="margin-left:40px">"code": "while(true){console.log('infiniteloop')}"</p>
			</br>
		}
		</p>
		</br>

		`)
})

app.post('/', (req, res, next) => {
	console.log('recd!')

    let exec = require('child_process').exec;
    let fs = require('fs');

	exec(`docker run --rm --stop-timeout 3 -e CODE="${req.body.code}" virtual_machine`, (err, stdout, stderr) => {
		console.log('err:', err)
		console.log('stdout:', stdout)
		console.log('stderr:', stderr)
		res.send(stdout)
	})
    
})

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))


