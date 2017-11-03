# ![](https://i.imgur.com/d1EPJRC.jpg)

### Overview
StoryBook is a social media mobile-app that allows users to share their stories in a very unique way. The user simply has to post a photo, and anyone can see the photo and where their photo was posted. Users can also see all nearby photos as Augmented Reality objects in their camera view.

### Tech Stack
* nodejs 
* heroku
* aws S3
* aws ec2
* aws rds
* aws cognito
* express
* postgresql
* sequelize
* python
* flask
* sqlalchemy
* react
* react-native
* react-native-arkit
* react-native-map
* react-navigation (stack & tab)
* react-native-elements
* image-cropper
* redux 
* facebook SDK
* socket io

### Start Up
THIS APP IS CURRENTLY ONLY FOR IOS

In order to get this app running, begin with 'npm install'. Then, follow the instructions on "https://developers.facebook.com/docs/ios/getting-started/" and make the necessary modifications on XCode. 

If there are issues with FaceBook SDK, please read through here: "https://developers.facebook.com/docs/ios/getting-started/"
If there are issues with react native ar kit, please read through here: "tbd"

Once everything is configured correctly, run 'react-native link' just once.
Then build your app on XCode.

### RESTful API
You can find the request routes at server > routes > index.js

All routes will be prefixed with 'api/'

### Environmental Variables
You will need 5 variables in you a file named 'sensitive.json' in your root directory:
* AWS_IDENTITY_ID: your AWS Cognito id
* rds_endpoint: your AWS rds endpoint
* username: username for AWS rds
* password: password for AWS rds
* flask_server: uri to AWS flask instance
* react_server: uri to Node instance for socket.io

### Developers
The developers of this app:
* Daniel Chong(project owner)
* Angie Tang (scrum master)
* Jaafar Skafi (developer)
* Jordan Daniels (developer)
