# API server for phone forwarder

this application is for a server that recives and shows text content recived from a forward SMS to Rest API phone application.


## how it works
a mobile phone recives an SMS message, the forwarding application takes the SMS number and and text content and sends it as JSON to the a server.

the server then saves the SMS information and can be shown to whoever has the link.

## API calls 
http://URL/?phone=<phone>&text=<text>
http://url or local host/?phone=0780291130&text=hi there 1



## future plans
1. add passwords so only those with passwords are able to access information
2. more encomapssing filter system
3. refactor code to not be in one file