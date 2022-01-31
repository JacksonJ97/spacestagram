# Spacestagram

An image sharing application that displays NASA's Astronomy Picture of the Day in the style of an instagram feed. Users can like the pictures and click the share button to copy the link of the image. Users can also keep scrolling down the feed to see more pictures. The liked pictures are saved into a different tab where users can see all the pictures that they liked. The state also persists when users reload or leave the page.

## My process

### Built with

- React
- Styled Components
- NASA APOD API
- date-fns
- react-infinite-scroll-component
- Context API
- Local Storage
- React Router

### What I learned

In this project, I learned how to create a snackbar component using the useImperativeHandle and useRef hook. Since useRef cannot be used on components, I used forwardRef to access the reference of the snackbar component and then used the useImperativeHandle hook to create a function that is to be passed down the component tree. I also learned how to error handle an API call by checking the response status. Since the fetch API only handles network errors, the HTTP errors are not caught in the catch block. To fix this we have to check the status of the response and if it is successful we should set the data received. I also learned how to use the react-infinite-scroll-component to fetch more data that is to be displayed in an feed-like style. I learned how to use local storage to store state variables so that when users reload or leave the page the state still persists. I also learned how to use the Context API to pass state down the component tree without passing it down as props.

### Live URL

https://jacksonj97.github.io/spacestagram/
