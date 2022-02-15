# Spacestagram

An image sharing application that displays NASA's Astronomy Picture of the Day in the style of an instagram feed. Users can like the pictures and click the share button to copy the link of the image. Users can also keep scrolling down the feed to see more pictures. The liked pictures are saved into a different tab where users can see all the pictures that they liked.

## My process

### Built with

- React
- Redux
- React Router
- Styled Components
- NASA APOD API
- date-fns
- react-infinite-scroll-component

### What I learned

In this project, I learned how to setup and use Redux to manage the global state. I used createAsyncThunk to handle the API request. I also used createEntityAdapter to create a normalized state object structure for the data. With createEntityAdapter, I was able to use the built-in CRUD functions to update certain fields in the state. I also was able to append the newly fetched data to the current state. I learned how to create a snackbar component using the useImperativeHandle and useRef hook. Since useRef cannot be used on components, I used forwardRef to access the reference of the snackbar component and then used the useImperativeHandle hook to create a function that is to be passed down the component tree. I also learned how to error handle an API call by checking the response status. Since the fetch API only handles network errors, the HTTP errors are not caught in the catch block. To fix this we have to check the status of the response and if it is successful we should set the data received.

### Live URL

https://jacksonj97.github.io/spacestagram/
