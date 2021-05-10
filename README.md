# webdriverio-test

Clone the git repo and run "npm install" .
If the tests are being executed on local then make changes to the wdio.conf.ts file. Change the services from 'docker' to 'chromedriver'. 
If it is being executed on docker containers let the service be 'docker' itself.
Once the env has been setup run 'docker-compose up' on one terminal and 'npm run test' on another terminal.
'npm run test' will execute all the tests under the tests/specs/ folder.
'npm run report' will generate the report from allure-result folder.

The docker-compose.yml file will spin up two containers. A selenium hub container and selenium node chrome container. chrome container is scaled to 2.
When the tests are executed with 'npm run test' it is run on these chrome containers.

Making use of wdio-image-comparison-service to verify images and if video is playing or not.

The above tests are run in parallel with 'npm run test'

Allure reporter is used for reporting,run 'npm run test' first and then 'npm run report'. Once the command is executed it will launch a dashboard of all executed 
tests.

If we have have any custom commands to add. We can add custom command to the before function hook. We will also need to declare the command in 'wdio.d.ts' file and
include type in the 'tsconfig.json' file.

Kubernetes can be setup with thw follwoing commands: 
kubectl create -f deploy.yml
kubectl create -f service.yml
kubectl create -f repchome.yml
kubectl create -f repff.yml

fetch the ip address and port number with : kubectl describe service 

once the services are running, we can try running our tests on it. Currently i m NOT able to run tests as the selenium hub is not able to interact with the
chrome node.
