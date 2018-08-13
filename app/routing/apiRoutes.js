// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information 
// ===============================================================================

var surveyData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/survey", function (req, res) {
        res.json(surveyData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/survey", function (req, res) {
        let totalDiff = [];


        for (i = 0; i < surveyData.length; i++) {
            let diff = 0;
            for (j = 0; j < 10; j++) {
                diff += Math.abs(req.body.scores[j] - surveyData[i].scores[j])
            };
            totalDiff.push(diff);
        };

        var match = {
            name: surveyData[totalDiff.indexOf(Math.min(...totalDiff))].name,
            imageURL: surveyData[totalDiff.indexOf(Math.min(...totalDiff))].imageURL
        }
        // send the new object back to browser

        res.json(match);


        surveyData.push({
            name: req.body.name,
            imageURL: req.body.imageURL,
            scores: req.body.scores
        })


    });




    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function () {
        // Empty out the arrays of data
        surveyData = [];
        console.log(surveyData);
    });
};