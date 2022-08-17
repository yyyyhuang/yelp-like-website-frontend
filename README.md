# 2% Milk Team - Yelp-Like Restaurant Recommendation Website
# Team members: Yingjie Huang, Wanqing Guo


**Links**
The link to the deployed frontend application
https://restaurant-recommend-frontend.herokuapp.com/

The link to the deployed backend application

https://restaurant-recommend-backend.herokuapp.com/

The link to the frontend GitHub repo

https://github.ccs.neu.edu/NEU-CS5610-SU22/2--Milk--frontend

The link to the backend GitHub repo

https://github.ccs.neu.edu/NEU-CS5610-SU22/2--Milk--backend

**Itertaion 3**
1. Requirements
    - We have 5 database tables: businesses(stores restaurant information), collections(stores each user's collections of their favorite restuarants), users(stores user information), photos(stores photo information) and reviews(stores each review information). Our website uses all 4 CRUD operations (create, read, update, delete) on reviews and collections database tables.
    - 4 different UI routes: landing page, restaurant detail page, user profile page and collections page.
    - We use Dropdown from Bootstrap/dropdown for entering user profile and logging out.
    - We use ReactStars from "react-rating-stars-component" in src/components/RestaurantsList.js and src/components/AddReview.js for static and dynamic star ratings.

    use of Bootstrap:
    <img width="1440" alt="bootstrap" src="/screenshot/bootstrap.jpg">
    use of third party:
    <img width="1440" alt="third party" src="/screenshot/third_party.jpg">

2. Implemented functionalities:
    - Landing Page:
        - Google Login and Logout
        - Show Collections, Favorites, and Profile pages for login users
        - Search bar to search by name
        - Filter restaurants by distance based on user's current location
    - Restaurant Detail Page:
        - Show restaurant details, address, categories, and a dynamic image gallery
        - Show sorted reviews by date
        - Login users can write, edit, delete reviews
        - Login users can add/remove the restaurant to collections
    - Collection Page:
        - Show collections for login users
        - User can edit/delete collections
    - Favorite Page:
        - Show saved restaurants for a collection
    - User Profile Page:
        - Login users can view its information and recent activities

3. Dependencies and Node version:

Run npm install to install all the dependencies

Frontend:
node version: v17.6.0

Backend:
node version: v17.6.0

4. Members' contribution
    - Yingjie Huang:
        - add landing page filter by distance 
        - sort reviews by date
        - get user geolocation
        - update README
    - Wanqing Guo:
        - reformat database
        - all pages style
        - update user profile page and collection page
        - deploy to Heroku

5. Screenshots
    Landing page:
    Detail Page:
    User Profile Page:
    Collections Page:
    Collection Detail/Favorite List Page:
    Add Review Page:


**Iteration 2**

1. Progress
    - Query photo data from backend and display in Home Page
    - Add search bar (search by restaurant name) in Home Page
    - Update navbar: when user is not logged in, display all restaurants, when user logged in, user also have access to collections and profile (No function)
    - Integrate Google Map API to get user location for future filter function
    - Add more UI components, e.g. react-rating-stars
    - Add gallery component in Restaurant Detail Page, which allows to browse all photos 
    - Query rating and reviews from backend and display in Restaurant Detail Page

2. Members' contribution
    - Yingjie Huang:
        - Photo and review queries 
        - Google Map API integration
        - Add search bar
        - Add photo gallery and rating star component
    - Wanqing Guo:
        - Navbar update & routing fix
        - Set up JWT token verification
        - update README & deploy to Heroku

3. Screenshots of progress
    <img width="1440" alt="landing_photo" src="/screenshot/landing_photo.png">
    <img width="1440" alt="detail_gallery" src="/screenshot/detail_gallery.png">
    <img width="1440" alt="detail_review" src="/screenshot/detail_review.png">


**Iteration 1**

1. Progress
    - In the iteration 1, our group has ported starter code (Movie Time boilerplate) and made changes from it for the landing page. We also explored multiple 3rd party libraries that we can integrate.  
2. Members' contribution
    - Yingjie Huang:
        - made changes for the landing page component
    - Wanqing Guo:
        - made changes for the service module
    
3. Issues
    - The key issue is that we have not found any free React implementation of the multi-filter component yet. In next iteration, our group needs to find 3rd party library and React implementation that we can incorporate. Also, we need to integrate Google Map API with the filter function.

4. Screenshots of progress
    <img width="1440" alt="landing_page" src="/screenshot/landing_page.png">
