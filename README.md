# React: Collapsible-Faq

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![Screen-Recording-2022-08-22-at-1](https://user-images.githubusercontent.com/110250951/186084131-dd26ce68-e6f7-4807-9aeb-f6812d83fbd5.gif)

## Functionality Requirements

The component must have the following functionalities:

- Should initially display 3 FAQ questions.
- Clicking on any FAQ should: 
  - Display its answer and collapses the answer of any other FAQ (if opened)
  - Toggle its visibility i.e. open it if it is closed and vice versa (the visibility of faq answer should be controlled by 'open' and 'closed' classes)
  - Change the sign beside it from '+' to '-' if it is opened and vice versa
- Should delete the corresponding FAQ on clicking the delete button.
- Clicking the Add button should: 
  - Display an alert with the text 'Please add both question and answer' if either of the text boxes is empty
  - Create a new Question and Answer and show it on the screen
  - Adding a new FAQ should collapse any opened FAQ

## Project Specifications

**Read Only Files**

    - src/App.test.js
    - src/data/faqList.js
    - src/App.css
    - src/App.js
    - src/index.css
    - src/index.js
    - src/registerServiceWorker.js
    - src/components/collapsible-faq/styles.css


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
# 0029a360-5ab9-4f02-8953-bf6e908af7fa
