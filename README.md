
Book-club-app

A fullstack web app using React on the frontend and Spring Boot on the backend. This web app allows the user to login/sign up into an account to post a comment on a number of book forums. The user can also view their comments and edit/delete their previous comments.

The app uses custom validation for creating an account. Proper formatting is thus required for creating an email, password, and account name. Error validation will display to the user logging in or signing up for an account. Validation is also used for posting a comment or updating a comment. Axios is used on the React frontend to make http requests to the backend where spring restcontroller is used to handle rests apis. ReactPaginate allows pagination to be used on the frontend to display a larger amount of forums than would be possible under the default React option. UseContext is used in React to store a signed in account for any component in the app and to logout from the account. User accounts can have either the 'member' or 'admin' role, where the admin role can create, edit, and delete forums. The admin role can also perform all the actions a member user can.

Here are some demos to demonstrate what this app can do:


https://github.com/m0rp3d/book-club-full-stack-app/assets/104413936/da31e87f-0e70-4071-abb6-59bd42cbf408

https://github.com/m0rp3d/book-club-full-stack-app/assets/104413936/45d98659-5d6e-4989-a6a6-b522a4fe6040


