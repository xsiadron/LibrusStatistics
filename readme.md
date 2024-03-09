
# Librus Statistics
A web application that retrieves user data from [portal.librus.pl/rodzina](https://portal.librus.pl/rodzina) and then calculates some of what the user did not see but had access to. None of the resources to which one has no access are and cannot be obtained.

## Features
Librus Statistics gets data from [portal.librus.pl/rodzina](https://portal.librus.pl/rodzina) and converts it's structure saving into local storage until logout and after some time.
### Here is list what you can do with it:
- [x] Get your percentage & detailed attendances in the subject
- [x] Get the days on which the subject takes place
- [x] Get your grades in the subject
- [x] Filter subjects through timetable, semesters & search

## Demo
Visit [ls.xsiadron.com](https://ls.xsiadron.com) and log in getting real data, or if you don't have one, use the available preview displaying sample data.

## Install on your own
If you are terrified of providing data on my site, you can always run your own instance of such an application having full open-source access to it.

### 1. Make sure to have latest version of Node.js

### 2. Clone LibrusStatistics repository
```s
git clone https://github.com/xsiadron/LibrusStatistics
```

### 3. Install packages in client & server
```s
cd LibrusStatistics/client/
npm install
```
```s
cd ../server/RequestListener
npm install
```

### 4. Setup client config & server config
```s
cd ../../
code client/src/config/librus-config.js
code server/RequestListener/config.js
```

### 5. Run & Have Fun!
```s
cd client/
npm run start
```
```s
cd ../server/RequestListener
npm run start
```


> ### Important!
> - I am not responsible for any errors that occur, risks or any problems related to the code and its launch.


## Feedback

If you have any feedback, please reach out to me at lukasz.frydrych@xsiadron.com
Thank you!



## Authors

- [@xsiadron](https://www.github.com/xsiadron)

