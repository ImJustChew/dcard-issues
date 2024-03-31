import {Octokit} from 'octokit';

const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN,
});

export default octokit;