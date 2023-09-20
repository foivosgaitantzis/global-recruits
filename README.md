<p align="center"><img src="logo.png?raw=true" width="30%" height="30%" alt="Global Recruits Logo"></p>

## General

Welcome to the **Official GlobalRecruits Repository**, which houses the complete collection of development files encompassing the entire code base of the now deprecated GlobalRecruits project, formerly available at globalrecruits.net.

**Original Author**: Foivos Gaitantzis

<img src="https://avatars.githubusercontent.com/u/47535153?v=4" width="20%" height="20%" alt="Global Recruits Logo">


## Project Description

GlobalRecruits (https://www.globalrecruits.net) was designed as a community for student-athletes, focusing on the essential aspects of mindset, skill development, strength training, and more. The project was driven by a commitment to security and cost-efficiency, as it began with a modest budget. To achieve these goals, a carefully balanced mix of custom and off-the-shelf solutions was adopted, all while keeping scalability in mind to accommodate a growing user base and content library.

## Key Components

This repository encompasses several critical components:

- Azure Serverless Functions Node.js API: The back-end of the GlobalRecruits project is powered by Azure Serverless Functions, utilizing Node.js (TypeScript) for optimal performance and cost-efficiency.

- React Landing Page & Member Dashboard: The front-end of the project, built with React (Typescript), provides users with an intuitive and dynamic interface for accessing resources and connecting with the community.

- Custom Email Trigger Lambda Code: This code is used in conjunction with AWS Cognito to send custom-formatted emails for confirmation and password reset links, leveraging Lambdas.

## Infrastructure & Services

- Serverless Cloud Platform: Both the back-end and front-end are hosted on a serverless cloud platform, utilizing Azure Static Web Apps (SWA) and Azure Function Apps. This approach optimizes performance while minimizing costs through consumption-based billing.

- CI/CD Pipelines: Continuous integration and continuous delivery pipelines have been established using GitHub Actions. This enables seamless code delivery to different environments, ensuring a smooth development workflow.

- File Storage: Azure Blob Storage serves as the file store for the project, chosen for its cost-effectiveness compared to market competitors.

- Video Streaming: For streaming learning materials, CloudFlare Stream is planned to be utilized, providing efficient video delivery.

- Identity Provider: AWS Cognito serves as the identity provider, with custom Lambda triggers for confirmation emails and password reset links.

- Payment Gateway: Stripe is the chosen payment gateway due to its worldwide availability, ease of integration, and robust customer support. It facilitates subscription management and payment processing.

## Disclaimer

This repository serves as a comprehensive resource for studying the architecture and components of the GlobalRecruits project. It is not intended for production use, and no support or updates will be provided. Please use this repository responsibly and in compliance with any relevant legal and ethical considerations.

## Demo

<h3 align="center">Landing Page</h3>

<p align="center"><img src="demo/LandingPageOne.png?raw=true" alt="Landing Page One"></p>
<p align="center"><img src="demo/LandingPageTwo.png?raw=true" alt="Landing Page Two"></p>
<p align="center"><img src="demo/LandingPageThree.png?raw=true" alt="Landing Page Three"></p>

<h3 align="center">Invite Only Authentication</h3>

<p align="center"><img src="demo/Authentication.png?raw=true" alt="Invite Only Authentication"></p>

<h3 align="center">Onboarding</h3>

<p align="center"><img src="demo/OnboardingOne.png?raw=true" alt="Onboarding Page Two"></p>
<p align="center"><img src="demo/OnboardingTwo.png?raw=true" alt="Onboarding Team Page"></p>

<h3 align="center">Email Forgot Password Template</h3>

<p align="center"><img src="demo/EmailTemplate.png?raw=true" alt="Forgot Password Email"></p>
