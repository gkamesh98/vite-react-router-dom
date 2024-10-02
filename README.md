# vite-react-router-dom

Use this package when you decide to use the react-router-dom and with vite. It simplifies most of the process using nextjs style of routing. 

## Installation

```bash
npm install vite-react-router-dom
```

and 

if you are currently using the react-router-dom remove it and update imports from the react-router-dom to vite-react-router-dom in entire application

```bash
npm uninstall react-router-dom
```

Since Entire context is being will use same context as the one react-router. In the dev and served time it will work but sometimes during the statically served then it might cause the issue.

It exports all exports of the react-router-dom. 

## Usage 

Here we are uplifting most of boiler plate code. By creating the provider and then specifying each individual route manually. You can 
``` 
import { ViteRoute } from 'vite-react-router-dom'

const App = () => {
  return <React.Fragment>
  <!-- rest of all -->
  <ViteRoute defaultErrorElement={<React.Fragment/>} fallbackElement={<React.Fragment/>} notFoundElement={<React.Fragment/>} routerType="browser"/>
  </React.Fragment>
}
```
And use it in the place of using the RouteProvider or Routes .....

That is more than enough no need to specify rest of the code. It will pull the routes from application. But you need to follow specific pattern to use it. Which is more similar to how nextjs uses.

Here you need to following rules 
1. ## File structure
    Under root repo you need to create src folder and under the src folder pages. Under the pages different page routes are accepted. File name has to end with the ` page.(js/jsx/ts/tsx) ` or ` layout.(js/jsx/ts/tsx) `. File page file immediately after the pages folder will be root pagepath (/) 

2. ## Page path pattern
    Folder between the pages and page will be route that page. 
    For example you want to create a page with route ` /hello/good ` so then your folder pattern has to be ` ./src/pages/hello/good/page.jsx ` in the page.jsx your code exists. And component exist in the layout.jsx will act the layout of the file for the With Preceeding Layout act as the parent layout's.

    And if you want any params then you can use the file name wrapping in the curly braces example ` /user/:userId/ ` where `userId` is param. So, it's file has to as follow's ` ./src/pages/user/{userId}/page.jsx `

3. ## File pattern 
    In react-router-dom we can specify the loader, action along component. So, in the ` page.jsx, layout.jsx ` we can specify them export and default one will be the component. It will loaded lazy. So, load of individual page will fast. 

    ```
    page.jsx / layout.jsx

    export default Page // Component or page which will be rendered. 

    export const action = async () => {
      // action functionality acts similar to the action props for Route
    }

    export const loader = async () => {
      // loader functionality acts similar to the loader props for Route. It can be asynchronous or synchronous
    }
    ```  
    In the layout component need to \<Outlet\> component which take in the child of layout from the page just similar to the react-router-dom \<Outlet\> 

## Api Reference
This package exports only one component. Which allows following props 
### defaultErrorElement
Error element which accepts the react type of element.
### fallbackElement
Fallback Element been shown during he load of the page. Type is the react element
### notFoundElement 
If Page is not found then this element will be displayed in the page.
### routerType 
It accepts [browser](https://reactrouter.com/en/main/routers/create-browser-router#createbrowserrouter), [hash](https://reactrouter.com/en/main/routers/create-hash-router#createhashrouter), [memory](https://reactrouter.com/en/main/routers/create-memory-router#creatememoryrouter). Default is browser. can learn about it more from here who they vary 
### basename
It take base path name that has to be accepted. On top of it will the base will be pathname in the useLocation. 

## Example
You can see a example over here github [pages](https://gkamesh98.github.io/vite-react-router-dom/)