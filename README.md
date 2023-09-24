# scine

Simple website presenting latest (rollerblading) videos from Youtube. The project aims to be fully automated - videos cannot be added manually.

## CI/CD

All automation for this project is powered by Github actions. Currently there are 4 workflows:
- `update-channels` - This workflow adds a new Youtube channel to the list of tracked channels. The job contains one parameter - channel name (ommit `@` at the beggining). Only manual trigger allowed.
- `update-videos` - This workflow runs periodically according to the cron configuration in the workflow definition, but it can be also triggered manually. It goes over the list of all tracked channels and creates a list of videos to be displayed on the website.
- `preview-pr` - This workflow is used for previewing new changes to the website.
- `deploy-live` - This workflow is used for publishing freshly built version of the website.

This repository also contains a few actions aimed to be used only with this project's workflows.

## Developing

- Firstly, install all dependencies using `npm install`.
- Create a sample video dataset in `/src/lib/videos.json` (filtered out by gitignore, no video dataset should ever be committed as it is generated dynamically by github actions).
- start a local development server using `npm run dev`.
