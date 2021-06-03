# Yee: An Employee-Management-System
Yee is an employee management device that will be useful to the people who have to go to their jobs physically. Since providing hands-free interaction with the logging and tracing of attendance will reduce any touch, it is conceivable that COVID-19 will develop. Employee Management System (EMS) is a set of employee management tools for the human resources department to manage and monitor employee information/records and payrolls all in one consolidated software. It includes employee self-service, as well as time & attendance management, absence & leaves management, and employee database, among others, with two user types: human resources and employee and the inclusion of team leader and team members classification under employee user type.

## Requirements/Dependencies
**Dependencies**
1. Node.js
2. Java SDK
3. React v.17.0.1
4. React Native cli
5. Yarn
6. react-native-picker/picker 1.15.0
7. React Navigation

**IDE**
1. Jetbrains Webstorm IDE
2. Android Studio
3. Xcode

## Environment Set-up
Video Guide: https://www.youtube.com/watch?v=F7xdbsjFGtU \
Textual Guide: https://reactnative.dev/docs/environment-setup

**Installing and Setting-up the IDE & Emulators**
1. Download Webstorm from https://www.jetbrains.com/webstorm/download/  \
   Alternatively, download Visual Studio Code from https://code.visualstudio.com/Download
2. Download Android Studio from https://developer.android.com/studio for the Android Emulator
3. Configure Android Studio Emulator
   1. Upon completion of download, launch Android Studio.
   2. Click on Configure (bottom right) and select SDK Manager from the drop-down list.
   3. Check the box beside `Show Package Details` (bottom right), then click on the arrow beside `Android 10.0 (Q)` to unfold it. Make sure the following are ticked on:
      * `Android SDK Platform 29`
      * `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image` \
      Click `OK` to install if they were not checked before. 
   4. Click on Configure again, this time select the AVD Manager.
   5. Click on `Create Virutal Device` then choose any phone moodel. Click on `Next` then choose the Q API Level 29 image. Click `Next` then `Finish` to accomplish configuring your Android virtual device.

4. If you are using MacBook, download XCode from the AppStore.
   
**Downloading the Dependencies**
1. Look up Command Prompt, right click it, then select 'Run as Administrative'
2. Download Node.js and Java SDK by typing in the following line to cmd: \
   `choco install -y nodejs.install openjdk8`
3. Download Yarn package manager (will be used later to download and manage our project dependencies easier) by typing the following line in cmd: \
   `npm install --global yarn`
4. For React Native cli and related dependencies, Webstorm automatically downloads what are needed, so just follow the prompts in Webstorm later on when we clone the project.

**Installing the Project**
1. Open up Webstorm. At the Menu bar, select `Git` > `Clone`. 
2. In the pop-up window `Get from Version Control`, copy paste this Git Reporsitory's link in the `URL` input field. In the `Directory` field, input the path where you want the project/local Git repository to be cloned at.
3. Click the `Clone` button to create our project.
4. Open the newly created project.
5. Navigate to the `Terminal` tab at bottom, right above the status bar.
6. Run the following command install all the project dependencies: \
   `yarn install` 
8. Under the Project files, expand the project file and `Trial_EMS` folder. Scroll down to `package.json` file and click on it to open. In the editor area, click the green play button at the start of the line: `"android": "react-native run-android",` to run the application on Android Emulator.

## Revision logs
April 8 2021:
Completion of initial UI/UX design.
## Contributors
  John Erwin Bisa - email: john_erwin_bisa@dlsu.edu.ph\
  Joyce Yuenlam Cai - email: joyce_yuenlam_cai@dlsu.edu.ph\
  Patrick Joel Gomez - email: pjgomez.16@gmail.com
