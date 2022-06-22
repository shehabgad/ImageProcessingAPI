# Image processing API

## Scripts availble for running/testing/building

![run scripts](https://github.com/shehabgad/ImageProcessingAPI/blob/master/screenshots/allscripts.PNG)


### to run the server you can use
npm run start

### to test the application 
npm run test

### to build 
npm run build

### to use lint
npm run lint

### to use prettier
npm run prettier


## Endpoints
there is only one endpoint and that is  http://localhost:3000/api/images?fileName=examplename&width=examplewidthheight=exampleheight
filename should be string, width a number and hight also a number
the endpoint will return the new resized imaged (it wont resize if it resized the same image before with the same dimensions in the cachedImages foleder so it will just cache it) or it will return some error if you send something wrong
![endpoint example](https://github.com/shehabgad/ImageProcessingAPI/blob/master/screenshots/endpointExample.PNG)
