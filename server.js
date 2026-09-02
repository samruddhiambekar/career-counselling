// ============================================================
// CAREERGUIDE AI SERVER
// SMART SUMMARIZER
// FREE MODE - NO OPENAI API
// ============================================================

const express = require("express");
const path = require("path");

// YouTube transcript package
const { fetchTranscript } = require("youtube-transcript");

const app = express();

const PORT = 3000;


// ============================================================
// MIDDLEWARE
// ============================================================

// Allow JSON data from the website
app.use(express.json());

// Allow form data
app.use(express.urlencoded({ extended: true }));

// Serve index.html, style.css and script.js
app.use(express.static(__dirname));


// ============================================================
// HOME PAGE
// ============================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ============================================================
// TEST ROUTE
// ============================================================

app.get("/test", (req, res) => {

    res.json({
        success: true,
        message: "CareerGuide AI server is working!"
    });

});


// ============================================================
// GET YOUTUBE VIDEO ID
// ============================================================

function getYouTubeVideoId(url) {

    try {

        const parsedURL = new URL(url);

        // Example:
        // https://www.youtube.com/watch?v=ABC123

        if (
            parsedURL.hostname.includes("youtube.com")
        ) {

            return parsedURL.searchParams.get("v");

        }


        // Example:
        // https://youtu.be/ABC123

        if (
            parsedURL.hostname === "youtu.be"
        ) {

            return parsedURL.pathname.substring(1);

        }


        return null;

    } catch (error) {

        return null;

    }

}


// ============================================================
// SMART SUMMARIZER API
// ============================================================

app.post("/api/summarize", async (req, res) => {

    console.log("");
    console.log("======================================");
    console.log("SMART SUMMARIZER REQUEST");
    console.log("======================================");


    try {

        const {
            youtubeURL,
            lectureText
        } = req.body;


        // ====================================================
        // OPTION 1: YOUTUBE
        // ====================================================

        if (
            youtubeURL &&
            youtubeURL.trim() !== ""
        ) {

            console.log("YouTube URL received:");
            console.log(youtubeURL);


            // Get video ID
            const videoId =
                getYouTubeVideoId(youtubeURL);


            if (!videoId) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid YouTube URL."

                });

            }


            console.log("Video ID:", videoId);

            console.log("Fetching transcript...");


            // Get YouTube captions
            const transcriptData =
                await fetchTranscript(videoId);


            if (
                !transcriptData ||
                transcriptData.length === 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "No captions found. Please use a YouTube video that has subtitles/captions."

                });

            }


            // Convert transcript into normal text
            const transcript =
                transcriptData
                    .map(item => item.text)
                    .join(" ");


            console.log(
                "Transcript successfully extracted."
            );

            console.log(
                "Characters:",
                transcript.length
            );


            // Generate study material
            const result =
                createStudyMaterial(transcript);


            return res.json({

                success: true,

                source: "YouTube",

                summary:
                    result.summary,

                bulletNotes:
                    result.bulletNotes,

                formulaSheet:
                    result.formulaSheet,

                quiz:
                    result.quiz

            });

        }


        // ====================================================
        // OPTION 2: LECTURE / DOCUMENT TEXT
        // ====================================================

        if (
            lectureText &&
            lectureText.trim() !== ""
        ) {

            console.log(
                "Lecture/document text received."
            );


            const result =
                createStudyMaterial(lectureText);


            return res.json({

                success: true,

                source: "Lecture Text",

                summary:
                    result.summary,

                bulletNotes:
                    result.bulletNotes,

                formulaSheet:
                    result.formulaSheet,

                quiz:
                    result.quiz

            });

        }


        // ====================================================
        // NO INPUT
        // ====================================================

        return res.status(400).json({

            success: false,

            message:
                "Please provide a YouTube URL or lecture/document text."

        });


    } catch (error) {

        console.error(
            "SMART SUMMARIZER ERROR:"
        );

        console.error(error);


        return res.status(500).json({

            success: false,

            message:
                "Unable to extract the transcript. Please use a YouTube video with captions/subtitles.",

            error:
                error.message

        });

    }

});


// ============================================================
// FREE STUDY MATERIAL GENERATOR
// ============================================================

function createStudyMaterial(text) {


    // --------------------------------------------------------
    // Clean text
    // --------------------------------------------------------

    const cleanText =
        text
            .replace(/\s+/g, " ")
            .trim();


    // --------------------------------------------------------
    // Split text into sentences
    // --------------------------------------------------------

    const sentences =
        cleanText
            .split(/[.!?]+/)
            .map(sentence =>
                sentence.trim()
            )
            .filter(sentence =>
                sentence.length > 20
            );


    // ========================================================
    // 100-WORD SUMMARY
    // ========================================================

    let summary = "";


    for (
        const sentence of sentences
    ) {

        const testText =
            summary +
            " " +
            sentence;


        const wordCount =
            testText
                .trim()
                .split(/\s+/)
                .length;


        if (wordCount <= 100) {

            summary =
                testText.trim();

        } else {

            break;

        }

    }


    // If there are no proper sentences
    if (!summary) {

        summary =
            cleanText
                .split(/\s+/)
                .slice(0, 100)
                .join(" ");

    }


    // Make sure summary never exceeds 100 words
    summary =
        summary
            .split(/\s+/)
            .slice(0, 100)
            .join(" ");


    // ========================================================
    // BULLET NOTES
    // ========================================================

    const bulletNotes =
        sentences.slice(0, 8);


    // ========================================================
    // FORMULA SHEET
    // ========================================================

    const formulaMatches =
        cleanText.match(
            /[^.!?]*(formula|equation|calculate|calculation|theorem|law|principle|=)[^.!?]*[.!?]/gi
        );


    const formulaSheet =
        formulaMatches &&
        formulaMatches.length > 0

            ? formulaMatches.slice(0, 8)

            : [
                "No specific formulas detected in this material."
            ];


    // ========================================================
    // QUICK QUIZ
    // ========================================================

    const quiz = [];


    sentences
        .slice(0, 3)
        .forEach(sentence => {

            quiz.push({

                question:
                    `What is the main idea of "${sentence}"?`,

                answer:
                    sentence

            });

        });


    // ========================================================
    // RETURN ALL RESULTS
    // ========================================================

    return {

        summary,

        bulletNotes,

        formulaSheet,

        quiz

    };

}


// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {

    console.log(
        "======================================"
    );

    console.log(
        "CareerGuide AI Server Started"
    );

    console.log(
        "Website: http://localhost:3000"
    );

    console.log(
        "FREE MODE - NO OPENAI API"
    );

    console.log(
        "======================================"

    );

});