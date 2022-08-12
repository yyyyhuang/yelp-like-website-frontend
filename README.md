# 2% Milk Team - Yelp-Like Restaurant Recommendation Website
# Team members: Yingjie Huang, Wanqing Guo

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