const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

const projects = [
    {
        on_track: [
            {
                subject: "CBSE- Grade 5 Maths Algebra", instructors: [
                    { id: 1, name: "Ramesh Jain" }, { id: 2, name: "Suresh Jain" }, { id: 3, name: "Bhadresh Jain" }
                ], assigned_date: "01-03-2020", progress: 75
            },

            {
                subject: "CBSE- Grade 5 Maths Trignometry", instructors: [
                    { id: 1, name: "Ramesh Jain" }, { id: 3, name: "Bhadresh Jain" }
                ], assigned_date: "20-03-2020", progress: 45
            },

            {
                subject: "CBSE- Grade 3 Maths Algebra", instructors: [
                    { id: 1, name: "Ramesh Jain" }
                ], assigned_date: "01-01-2020", progress: 20
            }
        ]
    },
    {
        delayed: [
            {
                subject: "CBSE- Grade 2 Maths English", instructors: [
                    { id: 6, name: "Ramesh Shetty" }, { id: 7, name: "Rama Joe" }, { id: 8, name: "Jesus Christ" }
                ], assigned_date: "01-03-2020", progress: 75
            },

            {
                subject: "CBSE- Grade 1 Maths Science", instructors: [
                    { id: 4, name: "John Doe" }, { id: 5, name: "John Cena" }
                ], assigned_date: "20-03-2020", progress: 45
            },
        ]
    },
    {
        on_hold: [
            {
                subject: "CBSE- Grade 2 Social Science ", instructors: [
                    { id: 6, name: "Ramesh Shetty" }, { id: 7, name: "Rama Joe" }, { id: 8, name: "Jesus Christ" }
                ], assigned_date: "09-05-2020", progress: 55
            },

            {
                subject: "CBSE- Grade 5 Moral Science", instructors: [
                    { id: 4, name: "John Doe" }, { id: 5, name: "John Cena" }
                ], assigned_date: "01-01-2020", progress: 90
            },

        ]
    }
];

exports.getProjects = functions.https.onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*"); // you can also whitelist a specific domain like "http://127.0.0.1:4000"
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.send(projects);
});

// app.get('/projects', (req, res) => {
//     admin.
//         firestore()
//         .collection('projects')
//         .get()
//         .then(data => {
//             let projects = [];
//             data.forEach(doc => {
//                 projects.push({
//                     projectId: doc.id,
//                     on_track: doc.data().on_track,
//                     delayed: doc.data().delayed,
//                     on_hold: doc.data().on_hold,
//                 });
//             });
//             return res.json(projects);
//         })
//         .catch(err => console.error(err));
// });

// exports.api = functions.https.onRequest(app);