import { q, client } from '../index'

export const CreateProject = 
    async (projectName, goalName, userId) => {
        const project = await client.query(
            q.Create(q.Collection('Projects'), {
                data: {
                    name: projectName,
                    goal: goalName,
                    user: userId,
                }
            })
        )
        return project
    }

export const CreateMilestone = 
    async (milestoneTitle, projectId) => {
        const milestone = await client.query(
            q.Create(q.Collection('Milestones'), {
                data: {
                    title: milestoneTitle,
                    completed: false,
                    current_video: 1,
                    videos: [],
                    project: q.Ref(q.Collection('Projects'), projectId),
                }
            })
        )
        return milestone
    }

export const submitProject = 
    async (projectName, goalName, milestoneArray, userId) => {

    }

export const getMilestonesByProject = 
    async (projectId) => {
        const projectMilestones = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('Milestones_by_project'),
                        projectId
                    )
                ),
                q.Lambda('x', q.Get(q.Var('x')))
            )
        )
        return projectMilestones
    }