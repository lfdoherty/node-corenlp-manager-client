
var jot = require('json-over-tcp');
var uuid = require('node-uuid')

exports.connect = connect

var DefaultPort = 8099
var DefaultHost = 'localhost'
function connect(config, cb){
	if(arguments.length === 1){
		cb = config
		config = {}
	}
	config.port = config.port || DefaultPort
	config.host = config.host || DefaultHost

	console.log('connecting to ' + config.host+':'+config.port)

	var waiting = {}

	var handle = {
		makePipeline: function(annotators, cb){
			var req = uuid.v4()
			socket.write({
				type: 'create-pipeline',
				req: req,
				annotators: annotators
			})

			waiting[req] = function(err, msg){
				if(err){
					cb(err)
					return
				}
				cb(undefined, {
					process: function(str, cb){
						var pReq = uuid.v4()
						socket.write({
							type: 'process',
							pipeline: req,
							req: pReq,
							text: str
						})
						waiting[pReq] = function(err,json){
							cb(err, json)
						}
					}
				})
			}
		}
	}

	var socket = jot.connect(config, function(){
		cb(undefined, handle)
	});

	socket.on('data', function(data){
		if(data.req){
			var w = waiting[data.req]
			if(w){
				if(data.type === 'error'){
					w(data)
				}else{
					w(undefined, data)
				}
				delete waiting[data.req]
			}
		}
	});

	cb


}