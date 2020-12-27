# 2a5
url shortner

## Setup

create process.env file in main directory and put:

DB=mongodb+srv://....  
PROTOCOL=https  
HOSTNAME=localhost  
PORTBACKEND=5000  
PORTFRONTEND=3000  

## Local Test Run
>> `node index.js`

## SSL

Follow letsencrypt instructions and create folder "ssl" and put chain, cert and privkey file there. chmod 600.
