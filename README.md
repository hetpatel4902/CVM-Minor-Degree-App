# 📱 CVMU Minor Degree App

A React Native mobile application developed for the **CVMU Minor Degree Project** to simplify the student-side minor degree process, including registration, choice filling, announcements, learning materials, online quizzes, and academic results.

The application was developed as part of the **Bachelor of Engineering in Information Technology** program at **G. H. Patel College of Engineering & Technology**.

---

## 📌 Overview

The CVMU Minor Degree process involved several activities such as student registration, subject preference submission, minor degree allotment, announcements, learning materials, and online assessments.

The project was developed to bring these student-facing activities together into a single mobile application.

The broader system consisted of three interfaces:

- **Student Mobile Application** — for registration, choice filling, announcements, learning materials, quizzes, and results.
- **Admin Website** — for student verification, college and branch management, subject management, choice-allotment publishing, announcements, and results.
- **Faculty Website** — for faculty authentication, quiz creation, announcements, and learning-material uploads.

This repository contains the **React Native Student Mobile Application**.

---

## 🎯 Problem Statement

The Minor Degree enrollment process required students to submit their preferences for the subjects they wanted to study. After students submitted their choices, the Minor Degree administration had to manually sort students according to their priorities and allot subjects.

The project aimed to digitize this process by allowing students to submit their preferences through a mobile application and view the published allotment results.

Another challenge was conducting online quizzes using conventional form-based tools. The project introduced a controlled quiz environment that monitors certain application and Android navigation events during an active quiz and can automatically submit the quiz after repeated violations.

---

## ✨ Features

### 🔐 Student Authentication

- Student registration
- Admin-verified student registration
- Login using email ID and password
- Forgot password functionality
- OTP-based password recovery
- Password reset
- Persistent authentication state

During registration, students provide information including:

- Name
- Email ID
- Phone number
- Enrollment number
- Current CPI
- Password
- College
- Department / Branch

---

### 📝 Minor Degree Choice Filling

Students can submit their preferences for the subjects offered under the Minor Degree program.

The application supports:

- Viewing available Minor Degree subjects
- Selecting first-choice subject
- Selecting second-choice subject
- Selecting third-choice subject
- Submitting choices in priority order
- Viewing the published choice-filling result

Students select three subjects according to their preference order, after which the allotment result can be published by the administration.

---

### 📢 Announcements

Students can view announcements published by:

- Admin
- Faculty

Announcements are displayed within the student application so that students can access academic updates from a central location.

---

### 📚 Learning Material

Students can access learning materials provided for their Minor Degree subjects.

The application provides a dedicated **Material** section for accessing the available resources.

---

### 📊 Academic Results

Students can view published academic results through the application, including:

- Minor Degree choice-filling / allotment result
- Semester results

---

### 🧪 Online Quizzes

The application provides a dedicated **Tests** section where students can:

- View pending quizzes
- Start a quiz
- Answer multiple-choice questions
- Navigate between questions
- Submit a quiz
- View completed quiz results

The Tests section separates available quizzes from previously attempted quizzes and provides a dedicated area for viewing quiz results.

---

## 🔒 Controlled Quiz Environment

One of the distinctive features of the application is its controlled quiz mechanism.

During an active quiz, the application monitors application-state changes and certain Android navigation events.

### Quiz Workflow

```text
Start Quiz
    │
    ▼
Display Quiz Rules
    │
    ▼
Begin Quiz Attempt
    │
    ▼
Monitor Application State
    │
    ├── Student remains in quiz
    │       │
    │       ▼
    │    Continue Quiz
    │
    └── Student leaves / backgrounds application
            │
            ▼
       Warning Triggered
            │
            ▼
      Repeated Violations
            │
            ▼
      Automatic Submission
            │
            ▼
        Quiz Result
```

During an active quiz:

- In-app navigation is restricted.
- Application state changes are monitored.
- Leaving or backgrounding the application can trigger a warning.
- Repeated violations can result in automatic quiz submission.
- The Android hardware back button is handled during the quiz.
- Once the configured violation threshold is reached, the student cannot attempt the same quiz again.

This approach was designed to provide a more controlled assessment environment than a conventional form-based online quiz.

---

## 🔄 Student Application Flow

```text
Registration
     │
     ▼
Email Verification
     │
     ▼
Login
     │
     ▼
Student Home
     │
     ├───────────────┬────────────────┬─────────────────┐
     ▼               ▼                ▼                 ▼
Announcements   Choice Filling   Learning Material   Tests
                     │                                   │
                     ▼                                   ▼
              Select 3 Choices                    Available Quizzes
                     │                                   │
                     ▼                                   ▼
             Submit Preferences                    Attempt Quiz
                     │                                   │
                     ▼                                   ▼
             Published Result                      Quiz Result
```

---

## 🏗️ System Architecture

The broader CVMU Minor Degree system was designed around three user groups:

```text
                    CVMU Minor Degree System
                              │
              ┌───────────────┼────────────────┐
              │               │                │
              ▼               ▼                ▼
        Student App      Admin Website    Faculty Website
              │               │                │
              ▼               ▼                ▼
       Student Services   System Admin    Academic Content
              │               │                │
              ├── Registration │                ├── Quiz Creation
              ├── Choice Filling │              ├── Material Upload
              ├── Tests        │                └── Announcements
              ├── Material     │
              ├── Results      ├── Student Verification
              └── Announcements ├── College Management
                                ├── Branch Management
                                ├── Subject Management
                                ├── Choice Allotment
                                ├── Results
                                └── Announcements
```

---

## 🧩 Application Structure

```text
CVM-Minor-Degree-App/
│
└── cvmapp/
    │
    ├── Router/
    │   ├── Authentication navigation
    │   ├── Bottom tab navigation
    │   └── Quiz navigation
    │
    ├── screens/
    │   ├── Authentication
    │   ├── Home
    │   ├── Choice Filling
    │   ├── Tests
    │   ├── Learning Material
    │   └── Results
    │
    ├── components/
    │   ├── Quiz components
    │   ├── Choice filling components
    │   └── UI components
    │
    ├── src/
    │   └── Context/
    │       └── Authentication state
    │
    ├── android/
    ├── ios/
    ├── assets/
    ├── App.js
    ├── package.json
    └── ...
```

---

## 🛠️ Technology Stack

### Mobile Application

- **React Native**
- **JavaScript**
- **React**

### Navigation

- **React Navigation**
- Stack Navigation
- Bottom Tab Navigation

### Networking

- **Axios**
- REST API communication

### Local Storage & Application State

- **AsyncStorage**
- **NetInfo**

### UI & User Experience

- **React Native Vector Icons**
- **Lottie React Native**
- **React Native Linear Gradient**

### Device & Platform Features

- **React Native System Setting**
- Android application lifecycle and navigation event handling

### Development Platform

- **Android**
- **iOS project configuration**

---

## 🔑 Authentication Flow

The application provides a complete authentication workflow for students.

```text
                ┌───────────────┐
                │   Register    │
                └───────┬───────┘
                        │
                        ▼
              ┌───────────────────┐
              │ Email Verification│
              └─────────┬─────────┘
                        │
                        ▼
                ┌───────────────┐
                │     Login     │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Student Home  │
                └───────────────┘
```

### Forgot Password Flow

```text
Forgot Password
      │
      ▼
  Enter Email
      │
      ▼
  Receive OTP
      │
      ▼
  Verify OTP
      │
      ▼
 Reset Password
      │
      ▼
    Login
```

---

## 📝 Choice Filling Workflow

The choice-filling module allows students to submit their Minor Degree preferences in priority order.

```text
View Available Subjects
          │
          ▼
    Select 1st Choice
          │
          ▼
    Select 2nd Choice
          │
          ▼
    Select 3rd Choice
          │
          ▼
    Submit Choices
          │
          ▼
    Wait for Allotment
          │
          ▼
  View Published Result
```

---

## 🧪 Quiz Workflow

```text
View Available Tests
          │
          ▼
      Select Quiz
          │
          ▼
    View Quiz Rules
          │
          ▼
      Start Quiz
          │
          ▼
   Answer Questions
          │
          ▼
     Submit Quiz
          │
          ▼
      Quiz Result
```

The application also monitors relevant application-state changes during an active quiz and handles Android back navigation to maintain the controlled assessment flow.

---

## 📱 Main Screens

The student application includes screens for:

- Registration
- Login
- Forgot Password
- OTP Verification
- Password Reset
- Home
- Choice Filling
- Choice Filling Result
- Semester Result
- Tests
- Quiz
- Quiz Result
- Learning Material
- Profile

---

## 🗂️ Main Application Modules

### Authentication

Responsible for:

- Registration
- Login
- Email verification
- Password recovery
- OTP verification
- Password reset
- Authentication state

### Home

Provides students with:

- Announcements
- Choice filling access
- Result access
- Profile access

### Choice Filling

Responsible for:

- Fetching available subjects
- Selecting subject priorities
- Submitting student choices
- Viewing the published allotment result

### Tests

Responsible for:

- Displaying available quizzes
- Starting quiz attempts
- Managing quiz questions
- Monitoring quiz state
- Submitting quizzes
- Displaying quiz results

### Material

Provides access to learning material associated with the Minor Degree program.

### Results

Provides students with access to published Minor Degree and semester results.

---

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure the following are installed and configured:

- Node.js
- npm
- Java Development Kit
- Android Studio
- Android SDK
- Android emulator or physical Android device
- React Native development environment

For iOS development:

- macOS
- Xcode
- CocoaPods
- iOS development environment for React Native

---

### 1. Clone the Repository

```bash
git clone https://github.com/hetpatel4902/CVM-Minor-Degree-App.git
```

---

### 2. Navigate to the Application

```bash
cd CVM-Minor-Degree-App/cvmapp
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start Metro

```bash
npm start
```

---

### 5. Run on Android

With an Android emulator running or a physical Android device connected:

```bash
npm run android
```

---

### 6. Run on iOS

On macOS with the required iOS development environment configured:

```bash
npm run ios
```

---

## ⚙️ Configuration

The application communicates with backend services through API endpoints configured within the project.

The original project was developed against backend infrastructure that may no longer be available.

Before attempting to run the application against a backend environment, verify that the required API endpoints and services are configured for the target environment.

> **Note:** This is an academic project developed during the 2022–23 academic year. The original backend infrastructure and API endpoints may no longer be active.

---

## 📂 Project Structure

```text
CVM-Minor-Degree-App/
│
├── cvmapp/
│   │
│   ├── Router/
│   │   ├── index.js
│   │   └── BottomTabNav.js
│   │
│   ├── screens/
│   │   ├── Authentication/
│   │   ├── Home/
│   │   ├── ChoiceFilling.js
│   │   ├── Tests/
│   │   ├── Material/
│   │   └── Results/
│   │
│   ├── components/
│   │
│   ├── src/
│   │   └── Context/
│   │
│   ├── assets/
│   │
│   ├── android/
│   │
│   ├── ios/
│   │
│   ├── App.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 📚 Project Background

This project was developed as a **Summer Project during Semester VI** of the Bachelor of Engineering program in Information Technology at **G. H. Patel College of Engineering & Technology** during the **2022–23 academic year**.

The project was developed to address practical challenges in the Minor Degree enrollment and assessment process.

The main objectives were:

- Reduce manual work involved in subject allocation.
- Provide students with a centralized mobile application.
- Digitize Minor Degree choice filling.
- Provide centralized announcements and learning materials.
- Provide online quizzes through the mobile application.
- Introduce a controlled environment for online assessments.

---

## 🎓 Academic Context

**Project:** CVMU Minor Degree Mobile App

**Program:** Bachelor of Engineering — Information Technology

**Institution:** G. H. Patel College of Engineering & Technology

**University:** Charutar Vidya Mandal University

**Semester:** VI

**Academic Year:** 2022–23

**Project Guide:** Prof. Miral Patel

---

## 🔮 Future Scope

The original project identified several possible future extensions:

- Support for iOS users.
- Additional restrictions during quizzes.
- Showing questions answered incorrectly along with quiz results.

One proposed enhancement was to require students to enable airplane mode before starting a quiz and automatically submit the quiz if airplane mode was disabled during the attempt.

These items represent the **future scope documented in the original academic project report** and are not presented as current features of this repository.

---

## 📄 Project Documentation

The project was documented as an academic Summer Project under the title:

**CVMU Minor Degree Mobile App**

The project documentation covers:

- Problem identification
- System workflow
- Admin functionality
- Faculty functionality
- Student application functionality
- Authentication
- Choice filling
- Results
- Online quizzes
- Future scope

---

## 👨‍💻 Author

**Het Patel**

Bachelor of Engineering — Information Technology  
G. H. Patel College of Engineering & Technology

[GitHub](https://github.com/hetpatel4902)

---

## ⭐ Project Highlights

- React Native student mobile application
- Complete student authentication workflow
- Email verification and OTP-based password recovery
- Priority-based Minor Degree choice filling
- Digital subject allotment workflow
- Centralized announcements
- Learning material access
- Academic result access
- Online quiz system
- Controlled quiz environment
- Application-state monitoring during quizzes
- Android hardware back-button handling
- Student-focused academic workflow
