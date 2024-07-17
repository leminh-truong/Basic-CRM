# Basic-CRM
An implementation of a basic CRM

Developers:
 - Le Minh Truong (1078113)
 - Linhao Ying (987798)
 - Chang Yi Lee (1011107)
 - Tung Lam Nguyen (1012906)
 - Haodong GU (1039081)


This application is a system that allows a business owner (administrator) to store customers’ information, track customers’ activities and interact with customers in order to maximise customer satisfaction by studying their behaviours.

I. To run the application in the development server, do the following steps in the terminal:
  1. In the root directory, run the command "npm i" to install all backend packages used for this application

  2. Go to the "frontend" folder by the command "cd frontend", then run "npm i" to install all frontend packages

  4. Go back to the root directory by the command "cd .."

  5. Add a ".env" file to the root directory, which contains the MongoDB username and passwords, as well as 
  passport passwords and Mailgun API key.

  6. Begin running the development server by the command "npm run dev". This will automatically open the application in the default web browser

  7. To stop the development server, press CTRL + C in the terminal

II. Each page of the application can be accessed via the following URLs:
  1. http://localhost:5000/ : The customer page for entering email address. If the customer enters an email address and that email address is already registered (i.e. the customer is already registered), the customer will be redirected to a placeholder product page. If the email has not been registered, the customer will be redirected to the customer registration page.
  
  2. http://localhost:5000/product : The placeholder product page.

  3. http://localhost:5000/register : The customer registration page. Customer will be redirected to the placeholder product page upon successful registration.

  4. http://localhost:5000/login : Administrator login page. Only accessible to the administrators of the application. Not visible from customer pages.
      - Login credentials:
        Username: admin
        Password: 4567

  5. http://localhost:5000/customer-all : Dashboard page that displays all customers. Cannot be accessed without logging in. Clicking on each customer will redirect to that customer's detail page.

  6. http://localhost:5000/lists-all : Dashboard page that displays all customer lists. Cannot be accessed without logging in. Clicking on each list will redirect to that list's detail page

  7. http://localhost:5000/notloggedin : This page will appear when a user tries to access a private page without logging in

III. To access the deployed application in the Heroku server, use following link:
  1. For customers: https://crm-t60.herokuapp.com/

  2. For administrators: https://crm-t60.herokuapp.com/login
    - Login credentials:
      Username: admin
      Password: 4567

    - New credentials:
      Username: admin1
      Password: 12345
  
  3. To access other pages of the deployed application, use the same URLs shown in part II and replace  http://localhost:5000 with https://crm-t60.herokuapp.com

IV. Current functionalities of the application:
  1. Secure login for administrators

  2. Registering customers

  3. Tracking number of sites customers have visited

  4. Displaying details of registered customers

  5. Searching customers based on registration date and assigned administrators

  6. Editing customer details

  7. Assigning administrators to customers

  8. Sending emails with or without attachments to customer

  9. Deleting customers from the database

  10. Creating custom-made lists to group customers based on administrators' criteria

  11. Displaying custom lists of customers created by administrators

  12. Add customers to custom lists

  13. Remove customers from custom lists

  14. Delete custom lists

  15. Send emails with or without attachments to specific customers or all customers in custom lists.

  16. Rename lists

V. Important notes:
  1. The root directory is also the backend directory

  2. All backend functions for fetching data from the MongoDB database are defined in the "controllers" folder

  3. All database schemas are defined in the "models" folder

  4. All backend routes are defined in the "routes" folder

  5. A ".env" file which contains the MongoDB username and password, the passport password and the Mailgun API key must be present in the root directory in order to run the application in the development server.

  6. All frontend pages are defined in the folder "frontend/src/components"

  7. All frontend pages' CSS are defined in the folder "frontend/src/styles" and in the file "frontend/index.css"

  8. All frontend URLs are defined in the file "frontend/App.js"

  9. The "passport" package is intentionally kept at version 0.4.1. Updating this package to version 0.5.x will crash the application. Until a solution is found for this issue, this package must not be updated to versions above 0.4.x.

  10. The current email API used for this application is Mailgun with free plan. Therefore, the email functionality of this application only works when a valid recipient email address is registered in the administrator's Mailgun domain. This issue can be resolved by upgrading to the Mailgun paid, which allows for unlimited email deliveries and removes the need for registering email addresses prior to sending emails.

  11. The branch used for deploying the application to the Heroku server is named "deployment". This branch is up to date with the main branch.

