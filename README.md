
Provides a node API to a docker image running node-corenlp-manager-server, which maintains pipelines as needed.

Install: npm install node-corenlp-manager-client

Usage:

1. Get Docker.
2. Run the Docker image: 

docker run -d -p 8099:8099 lfdoherty/corenlp-manager-server /bin/sh -c "cd app/node-corenlp-manager-server; node server.js"

Then check it worked with "npm run example".  Note that if you are using boot2docker on OS X, you'll need to modify example.js to point to the IP of your VirtualBox.  (More info on this in example.js.)

You might need to increase your memory allocation to boot2docker (I give it 5GB):
http://stackoverflow.com/questions/24422123/change-boot2docker-memory-assignment