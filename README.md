# Trello Awesomeness

## Development Story

created the branch with a vite template then created a new branch to scaffold the app and layout the structure and the tools necessary for the project initially

- changed the typescript semantic versioning from '^ minor releases' to '~ patch releases' because of a nested dependency '@typescript-eslint/typescript-estree' SUPPORTED TYPESCRIPT VERSIONS: >=4.7.4 <5.6.0
- I am keeping folder structure very simple as the required functionality is very limited and does not give me enough depth of the domain
- for the git workflow there would be 3 branches types : feature , chore , bug/hotfix and can be strict on commits using Commitizen ( not used in this repo)

### The great plan

before defining the steps , lets define the app scope
in a nutshell this app is a trello clone but very limited to only one board (one page) and three lists (todo , doing , done) where the user would be able to create , move and edit cards ( latest would be an extra to do it in realtime )

1 - Show the lists and todos
2 - create todo inside a list
3 - edit todos title
4 - move todo by dragging
5 - open todo in a popup to edit more details ( description and labels )
6 - edit todo in realtime ( maybe only title ?)
7 - work on further features/actions ( dates , checklist, comments , archived , attachments ) ? <== this were organized by priority/importance
