import octokit from '@/lib/github';
import { Octokit } from 'octokit';
import { cache } from 'react';

export const getPostByPage = cache(async (page: number) => {
    const { data } = await octokit.rest.issues.listForRepo({
        owner: "ImJustChew",
        repo: "dcard-issues",
        per_page: 10,
        page,
        state: "open"
    });
    return data;
})

export const getPostById = cache(async (id: string) => {
    const { data } = await octokit.rest.issues.get({
        owner: "ImJustChew",
        repo: "dcard-issues",
        issue_number: parseInt(id),
        state: "open"
    });
    return data;
})


export const updatePost = async (id: string, title: string, body: string, access_token: string) => {
    const octokit = new Octokit({
        auth: access_token
    });
    await octokit.rest.issues.update({
        owner: "ImJustChew",
        repo: "dcard-issues",
        issue_number: parseInt(id),
        title,
        body
    });
}

export const deletePost = async (id: string, access_token: string) => {
    const octokit = new Octokit({
        auth: access_token
    });
    await octokit.rest.issues.update({
        owner: "ImJustChew",
        repo: "dcard-issues",
        issue_number: parseInt(id),
        state: "closed"
    });
}

export const createPost = async (title: string, body: string, access_token: string) => {
    const octokit = new Octokit({
        auth: access_token
    });
    await octokit.rest.issues.create({
        owner: "ImJustChew",
        repo: "dcard-issues",
        title,
        body
    });
}