# http2-express

A HTTP and HTTP/2 server implementation for node.js with a server push example

## Installation

```
npm install
npm start
```

## Create a self-signed SSL certificate
```
$ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
...
$ openssl rsa -passin pass:x -in server.pass.key -out server.key
writing RSA key
$ rm server.pass.key
$ openssl req -new -key server.key -out server.csr
...
Country Name (2 letter code) [AU]:CH
State or Province Name (full name) [Some-State]:St.Gallen
...
A challenge password []:
...
$ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

## Test in Chrome on https://localhost with a self-signed certificate
```
$ google-chrome --allow-insecure-localhost  https://localhost:3001
```
