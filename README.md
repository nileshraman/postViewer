# postViewer

# Home Page (Post List)

When you first open the app, you'll see a list of posts on the home page.
Each post displays a title and a brief description.
You can click on any post to view its full details.
The "+" (Create New Post button) at the bottom will take you to the page for creating a new post.
Use the "Previous" and "Next" buttons at the bottom of the page to navigate through different pages of posts.


# Viewing a Post

Click on any post from the list to view its full details.
You'll be taken to a new page showing the complete title and body of the post.
Use the "Back" button to return to the home page.

# Creating a New Post

Click the "+" button on the home page.
You'll be taken to a form where you can enter the details of your new post:

Title (required): Enter the title of your post.
Description: Enter the body of your post (limited to 1000 characters).

Use the "back" buttons at the bottom of the page to navigate back to home page.

When the post is submitted then a alert will be shown and wait for 3 sec.

The character count for the description is displayed below the text area.
Click the "Create Post" button to submit your new post.
If successful, you'll be redirected back to the home page, and your new post should appear in the list.

# Features

Responsive design: The app is mobile-friendly and adapts to different screen sizes.
Pagination: The post list is paginated for easier navigation.
Client-side caching: React Query is used to cache post data, reducing unnecessary API calls.
Loading indicators: Skeleton loaders are displayed while content is being fetched.
Animations: Smooth transitions and animations enhance the user experience.
Error handling: The app displays error messages if there are issues with API requests.
