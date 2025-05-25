sequenceDiagram
    participant browser
    participant server

    %% USER ACTION
    Note over browser: User writes a note<br/>and clicks **Save**

    %% 1 - FORM SUBMISSION
    browser->>server: POST /exampleapp/new_note<br/>note="Hello world"
    activate server
    Note right of server: Server saves the note
    server-->>browser: 302 Found<br/>Location: /exampleapp/notes
    deactivate server

    %% 2 - REDIRECT: NEW PAGE LOAD
    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    %% 3 - STATIC ASSETS
    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: main.css
    deactivate server

    browser->>server: GET /exampleapp/main.js
    activate server
    server-->>browser: main.js
    deactivate server

    %% 4 - JS FETCHES DATA
    Note right of browser: main.js runs<br/>fetch('/exampleapp/data.json')
    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: Updated JSON (includes new note)
    deactivate server

    Note over browser: Callback updates the DOM