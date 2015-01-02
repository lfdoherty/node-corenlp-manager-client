
//if you're on OS X running boot2docker, you need to use "boot2docker ip" to get the IP of the VM.
//otherwise I think host is just 'localhost'
require('./client').connect({host: '192.168.59.103'},function(err,c){
	if(err) throw err
	c.makePipeline(['tokenize', 'ssplit'/*, 'pos', 'lemma', 'ner', 'parse', 'dcoref'*/], function(err, pipeline){
		if(err) throw new Error(JSON.stringify(err))

		pipeline.process('Parse this text please.', function(err, result){
			if(err) throw err

			console.log('parsed: ' + JSON.stringify(result))
			process.exit(0)
		})
	})
})