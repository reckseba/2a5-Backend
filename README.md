# 2a5
url shortner

## Setup local

create process.env file in main directory and put:

ENVIRONMENT=test  
DB=mongodb+srv://....  
PROTOCOL=http  
HOSTNAME=localhost  
PORTBACKEND=5000  
PORTFRONTEND=3000  

## Setup prod

put to process.env:

ENVIRONMENT=prod  
DB=mongodb+srv://....  
PROTOCOL=https  
HOSTNAME=example.com  
PORTBACKEND=5000  
PORTFRONTEND=443  

## Local Test Run
> node server.js

## Prod Run
npm install forever -g
forever start server.js

## SSL

Follow letsencrypt instructions and create folder "ssl" and put chain, cert and privkey file there. chmod 600.
