var config = require('./config');

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json());

app.listen(config.SERVER_PORT, () => {
    console.log(`Express server has started on port ${config.SERVER_PORT}`)
});

const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var moment = require('moment');

app.get('/', (req, res) => {
    console.log('hello');
    res.send({ test: "hi" });
});

app.post('/save_answer', (req, res) => {
    var answer_list = req.body.answer_list;
    var title = req.body.title;

    const file_name = `${title}_${moment().format()}.csv`;

    const csvWriter = createCsvWriter({
        path: `./data/user/${file_name}`,
        header: [
            { id: 'answer', title: 'Answer' }
        ]
    });

    csvWriter
        .writeRecords(answer_list.map(ans => ({ answer: ans })))
        .then(() => {
            res.send({ message: "ok", file_name: file_name });
        });
});

app.post('/get_result', (req, res) => {
    var file_name = req.body.file_name;

    let result_1 = [];
    let result_2 = [];
    let result = [];

    fs.createReadStream(`./data/user/${file_name}`)
        .pipe(csv())
        .on('data', (data) => result_1.push(data))
        .on('end', () => {
            fs.createReadStream(`./data/admin/${file_name.split('_')[0]}_answer.csv`)
                .pipe(csv())
                .on('data', (data) => result_2.push(data))
                .on('end', () => {
                    for (var i = 0; i < 100; i++) {
                        result.push({ user: result_1[i].Answer, answer: result_2[i].Answer })
                    }
                    res.send({ message: "ok", result: result });
                });
        });
})

// app.post('/save', (req, res) => {
//     var data = {
//         'word': req.body.word,
//         'definition': req.body.definition,
//         'date': moment().format('YYYY-MM-DD'),
//     }

//     conn.query(`SELECT * FROM dictionary AS t WHERE t.word = '${data.word}'`, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             if (result.length !== 0) {
//                 var sql = `UPDATE dictionary AS t`
//                     + ` SET`
//                     + `     t.check = 0`
//                     // + `     t.date = '2020-03-03'`
//                     + ` WHERE t.no = ${result[0].no};`
//                 conn.query(sql, (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         res.send({ success: false });
//                         throw err;
//                     }
//                     else {
//                         console.log('[success] save');
//                         res.send({ success: true });
//                     }
//                 });
//             }
//             else {
//                 conn.query('INSERT INTO dictionary SET ?', data, (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         res.send({ success: false });
//                         throw err;
//                     }
//                     else {
//                         console.log('[success] save');
//                         res.send({ success: true });
//                     }
//                 });
//             }
//         }
//     })
// });

// app.get('/list', (req, res) => {
//     var sql = "SELECT"
//         + "     t.no, t.word, t.definition, t.check, DATE_FORMAT(t.date, '%Y-%m-%d') as date"
//         + " FROM dictionary AS t"

//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] get list');
//             res.send({ success: true, list: result });
//         }
//     })
// });

// app.get('/test', (req, res) => {
//     var sql = "SELECT"
//         + "     t.no, t.word"
//         + " FROM dictionary AS t"
//         + " WHERE t.check = 0"
//         + " ORDER BY RAND()"
//         + " LIMIT 10;"
//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] get test');
//             res.send({ success: true, list: result });
//         }
//     })
// })

// app.post('/testCheck', (req, res) => {

//     var answer_list = req.body.answer_list;
//     var no_list = answer_list.reduce((full_str, item) => (full_str + ', ' + String(item.no)), '').slice(2);

//     var data = {}
//     answer_list.forEach(item => {
//         data[item.no] = { answer: item.answer };
//     })

//     var sql = `SELECT`
//         + `     t.no, t.definition`
//         + ` FROM dictionary AS t`
//         + ` WHERE t.no IN (${no_list});`

//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] get test check');
//             for (var item of result) {
//                 var answer = data[item.no].answer;
//                 var definition = item.definition.split(', ');

//                 data[item.no].definition = item.definition;

//                 if (definition.includes(answer)) {
//                     data[item.no].correct = true;
//                     sql = `UPDATE dictionary AS t SET t.check = 1 WHERE t.no = ${item.no};`
//                     conn.query(sql, err => {
//                         if (err) {
//                             console.error(err);
//                             throw err;
//                         }
//                         else {
//                             console.log('[success] modify');
//                         }
//                     })
//                 }
//                 else {
//                     data[item.no].correct = false;
//                 }

//             }
//             res.send({ success: true, data: data });
//         }
//     })
// })

// app.post('/getProblem', (req, res) => {
//     var subject_dict = req.body.subject_dict;
//     var problem_grade_dict = req.body.problem_grade_dict;

//     var subject = Object.keys(subject_dict).filter(key => subject_dict[key]);
//     var problem_grade = Object.keys(problem_grade_dict).filter(key => problem_grade_dict[key]);

//     var where_condition = '';

//     if (subject.length === 0) {
//         subject = Object.keys(subject_dict)
//     }

//     where_condition = ` WHERE t.subject IN (${subject.reduce((full_str, s) => (full_str + `, '${s}'`), '').slice(2)})`;

//     if (problem_grade.length !== 0) {
//         if (where_condition.length === 0) {
//             where_condition = ` WHERE t.grade IN (${problem_grade.reduce((full_str, s) => (full_str + `, '${s}'`), '').slice(2)})`;
//         }
//         else {
//             where_condition += ` AND t.grade IN (${problem_grade.reduce((full_str, s) => (full_str + `, '${s}'`), '').slice(2)})`;
//         }
//     }
//     var sql = `SELECT`
//         + `     t.problem, t.content, t.problem_no`
//         + ` FROM problem AS t`
//         + where_condition
//         + ` ORDER BY RAND()`
//         + ` LIMIT 1;`

//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] get problem');
//             res.send({ success: true, data: result });
//         }
//     })
// })

// app.post('/getProblemList', (req, res) => {
//     var subject_dict = req.body.subject_dict;
//     var subject = Object.keys(subject_dict).filter(key => subject_dict[key]);

//     var where_condition = '';

//     if (subject.length === 0) {
//         subject = Object.keys(subject_dict)
//     }
//     where_condition = ` WHERE t.subject IN (${subject.reduce((full_str, s) => (full_str + `, '${s}'`), '').slice(2)})`;

//     var sql = `SELECT`
//         + `     t.problem, t.problem_no`
//         + ` FROM problem AS t`
//         + where_condition

//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] get problem list');
//             res.send({ success: true, data: result });
//         }
//     })
// })

// app.post('/getTarget', (req, res) => {
//     var target_no = req.body.target_no;

//     var sql = `SELECT`
//         + `     t.problem, t.content, t.answer, t.subject, t.grade, t.answer_order`
//         + ` FROM problem AS t`
//         + ` WHERE t.problem_no=${parseInt(target_no)}`


//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] get target');
//             res.send({ success: true, data: result[0] });
//         }
//     })
// })

// app.post('/modifyProblem', (req, res) => {
//     // update problem set problem='test2', content='__answer', answer='test2' where problem_no=118;
//     var sql = `UPDATE problem set problem='${req.body.problem}', content='${req.body.content}', answer='${req.body.answer}', subject='${req.body.subject}', grade='${req.body.grade}', answer_order=${req.body.order} WHERE problem_no=${req.body.target_no}`
//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] save');
//             res.send({ success: true });
//         }
//     })
// })

// app.post('/study/save', (req, res) => {
//     var sql = `INSERT INTO problem (problem, content, answer, subject, grade, answer_order) `
//         + ` VALUES ('${req.body.problem}', '${req.body.content}', '${req.body.answer}', '${req.body.subject}', '${req.body.grade}', ${req.body.order});`
//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             console.log('[success] save');
//             res.send({ success: true });
//         }
//     })
// })

// app.post('/study/check', (req, res) => {
//     var sql = `SELECT t.answer, t.answer_order FROM problem as t`
//         + ` WHERE t.problem_no = ${req.body.problem_no}`

//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.send({ success: false });
//             throw err;
//         }
//         else {
//             var answer_list = result[0].answer.split(', ');
//             var user_answer = req.body.user_answer;

//             var answer_order = result[0].answer_order;

//             var check_result = {
//                 correct: true,
//                 check_list: []
//             }
//             if (answer_order) {
//                 for (var i = 0; i < user_answer.length; i++) {
//                     if (user_answer[i].toLowerCase().replace(/(\s*)/g, "") === answer_list[i].toLowerCase().replace(/(\s*)/g, "")) {
//                         check_result.check_list.push({
//                             user_answer: user_answer[i],
//                             correct: true
//                         });
//                     }
//                     else {
//                         check_result.check_list.push({
//                             user_answer: user_answer[i],
//                             answer: answer_list[i],
//                             correct: false
//                         });
//                         check_result.correct = false;
//                     }
//                 }
//             }
//             else {
//                 for (var i = 0; i < user_answer.length; i++) {
//                     var index = -1;
//                     for (var j = 0; j < answer_list.length; j++) {
//                         if (user_answer[i].toLowerCase().replace(/(\s*)/g, "") === answer_list[j].toLowerCase().replace(/(\s*)/g, "")) {
//                             index = j;
//                             break;
//                         }
//                     }

//                     if (index !== -1) {
//                         answer_list.splice(index, 1);
//                         check_result.check_list.push({
//                             user_answer: user_answer[i],
//                             correct: true
//                         });
//                     }
//                     else {
//                         check_result.check_list.push({
//                             user_answer: user_answer[i],
//                             correct: false
//                         });
//                         check_result.correct = false;
//                     }
//                 }

//                 for (var i = 0; i < answer_list.length; i++) {
//                     for (var item of check_result.check_list) {
//                         if (item.correct === false && item.answer === undefined) {
//                             item.answer = answer_list.pop();
//                         }
//                     }
//                 }
//             }

//             console.log('[success] check');
//             res.send({ success: true, check_result: check_result });

//         }
//     })
// })