const _ = require('lodash');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: true }));

let projects =
{
    on_track: [
        {
            subject: "CBSE- Grade 5 Maths Algebra", topic: "core", instructors: [
                { id: 1, name: "Ramesh Jain" }, { id: 2, name: "Suresh Jain" }, { id: 3, name: "Bhadresh Jain" }
            ], assigned_date: "01-03-2020", progress: 75
        },

        {
            subject: "CBSE- Grade 5 Maths Trignometry", topic: "core", instructors: [
                { id: 1, name: "Ramesh Jain" }, { id: 3, name: "Bhadresh Jain" }
            ], assigned_date: "20-03-2020", progress: 45
        },

        {
            subject: "CBSE- Grade 3 English", topic: "language", instructors: [
                { id: 1, name: "Ramesh Jain" }
            ], assigned_date: "01-01-2020", progress: 20
        }
    ],

    delayed: [
        {
            subject: "CBSE- Grade 7 French", topic: "language", instructors: [
                { id: 6, name: "Ramesh Shetty" }, { id: 7, name: "Rama Joe" }, { id: 8, name: "Jesus Christ" }
            ], assigned_date: "01-03-2020", progress: 75
        },

        {
            subject: "CBSE- Grade 1 Maths Science", topic: "core", instructors: [
                { id: 4, name: "John Doe" }, { id: 5, name: "John Cena" }
            ], assigned_date: "20-03-2020", progress: 45
        },
    ],

    on_hold: [
        {
            subject: "CBSE- Grade 2 Social Science ", topic: "core", instructors: [
                { id: 6, name: "Ramesh Shetty" }, { id: 7, name: "Rama Joe" }, { id: 8, name: "Jesus Christ" }
            ], assigned_date: "09-05-2020", progress: 55
        },

        {
            subject: "CBSE- Grade 5 Hindi", topic: "language", instructors: [
                { id: 4, name: "John Doe" }, { id: 5, name: "John Cena" }
            ], assigned_date: "01-01-2020", progress: 90
        },

    ]
}

const getSortedSubjects = (projects, sort) => {
    let filteredProjects = {
        on_track: _.filter(projects.on_track, ['topic', sort]),
        delayed: _.filter(projects.delayed, ['topic', sort]),
        on_hold: _.filter(projects.on_hold, ['topic', sort]),
    }
    return filteredProjects
}


app.get('/projects', (req, res) => {
    const { field, sort, filter } = req.query;
    console.info('request.query', req.query)
    let projectResponse = projects;
    if (filter === 'on_track') {
        projectResponse = { on_track: projects.on_track };
    } else if (filter === 'on_hold') {
        projectResponse = { on_hold: projects.on_hold };
    } else if (filter === 'delayed') {
        projectResponse = { delayed: projects.delayed };
    } else {
        projectResponse === projects;
    }
    if (sort === 'language') {
        projectResponse = getSortedSubjects(projectResponse, 'language')
    } else if (sort === 'core') {
        projectResponse = getSortedSubjects(projectResponse, 'core')
    } else {
        projectResponse = projectResponse;
    }
    return res.send(projectResponse)
});

exports.api = functions.https.onRequest(app);