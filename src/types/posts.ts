import octokit from '@/lib/github';
import {GetResponseDataTypeFromEndpointMethod} from '@octokit/types';

export type IssuesResponseType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listForRepo>;
export type IssueResponseType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.get>;
