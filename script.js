// ======================================================
// CareerGuide AI - Smart Summarizer
// Frontend JavaScript
// ======================================================

// Wait until the HTML page has loaded
document.addEventListener("DOMContentLoaded", function () {

    console.log("Smart Summarizer JavaScript Loaded");

    // --------------------------------------------------
    // Find the Generate button
    // --------------------------------------------------

    const buttons = document.querySelectorAll("button");

    let generateButton = null;

    buttons.forEach(button => {

        if (
            button.textContent
                .toLowerCase()
                .includes("generate smart summary")
        ) {

            generateButton = button;
        }
    });

    if (!generateButton) {

        console.error("Generate Smart Summary button not found.");

        return;
    }

    console.log("Generate button found.");

    // --------------------------------------------------
    // Button click
    // --------------------------------------------------

    generateButton.addEventListener("click", async function () {

        console.log("Generate button clicked.");

        // Find YouTube URL input
        const youtubeInput =
            document.getElementById("youtubeURL");

        // Find lecture textarea
        const lectureInput =
            document.getElementById("lectureText");

        const youtubeURL =
            youtubeInput ? youtubeInput.value.trim() : "";

        const lectureText =
            lectureInput ? lectureInput.value.trim() : "";

        // ------------------------------------------------
        // Check input
        // ------------------------------------------------

        if (!youtubeURL && !lectureText) {

            alert(
                "Please enter a YouTube URL or lecture/document text."
            );

            return;
        }

        // ------------------------------------------------
        // Loading message
        // ------------------------------------------------

        generateButton.disabled = true;

        generateButton.textContent =
            "⏳ Extracting transcript...";

        try {

            console.log("Sending request to server...");

            // ------------------------------------------------
            // Send data to Node.js server
            // ------------------------------------------------

            const response = await fetch(
                "/api/summarize",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        youtubeURL: youtubeURL,

                        lectureText: lectureText

                    })
                }
            );

            console.log(
                "Server response status:",
                response.status
            );

            const data = await response.json();

            console.log("Server response:", data);

            // ------------------------------------------------
            // Error from server
            // ------------------------------------------------

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Unable to generate summary."
                );
            }

            // ------------------------------------------------
            // Display results
            // ------------------------------------------------

            displaySummary(data);

        } catch (error) {

            console.error("ERROR:", error);

            alert(
                "❌ " + error.message
            );

        } finally {

            generateButton.disabled = false;

            generateButton.textContent =
                "✨ Generate Smart Summary";
        }
    });

});

// ======================================================
// Display Summary
// ======================================================

function displaySummary(data) {

    // --------------------------------------------------
    // Find existing result area
    // --------------------------------------------------

    let resultContainer =
        document.getElementById("summaryResults");

    // If it doesn't exist, create it
    if (!resultContainer) {

        resultContainer =
            document.createElement("div");

        resultContainer.id =
            "summaryResults";

        resultContainer.style.marginTop =
            "30px";

        resultContainer.style.padding =
            "25px";

        resultContainer.style.background =
            "#ffffff";

        resultContainer.style.borderRadius =
            "15px";

        resultContainer.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.1)";

        const button =
            document.querySelector("button");

        button.parentElement.appendChild(
            resultContainer
        );
    }

    // --------------------------------------------------
    // Bullet notes
    // --------------------------------------------------

    let notesHTML = "";

    if (data.bulletNotes) {

        notesHTML =
            data.bulletNotes
                .map(note => `<li>${escapeHTML(note)}</li>`)
                .join("");
    }

    // --------------------------------------------------
    // Formula sheet
    // --------------------------------------------------

    let formulaHTML = "";

    if (data.formulaSheet) {

        formulaHTML =
            data.formulaSheet
                .map(formula =>
                    `<li>${escapeHTML(formula)}</li>`
                )
                .join("");
    }

    // --------------------------------------------------
    // Quiz
    // --------------------------------------------------

    let quizHTML = "";

    if (data.quiz) {

        quizHTML =
            data.quiz
                .map((item, index) => {

                    return `
                        <div class="quiz-item">

                            <strong>
                                Q${index + 1}.
                                ${escapeHTML(item.question)}
                            </strong>

                            <p>
                                <b>Answer:</b>
                                ${escapeHTML(item.answer)}
                            </p>

                        </div>
                    `;

                })
                .join("");
    }

    // --------------------------------------------------
    // Display everything
    // --------------------------------------------------

    resultContainer.innerHTML = `

        <h2>📚 Smart Study Material</h2>

        <hr>

        <h3>📖 100-Word Story Summary</h3>

        <p>
            ${escapeHTML(data.summary)}
        </p>

        <hr>

        <h3>📝 Bullet Notes</h3>

        <ul>
            ${notesHTML}
        </ul>

        <hr>

        <h3>📐 Formula Sheet</h3>

        <ul>
            ${formulaHTML}
        </ul>

        <hr>

        <h3>🧠 Quick Quiz</h3>

        ${quizHTML}

    `;

    // Scroll to result
    resultContainer.scrollIntoView({
        behavior: "smooth"
    });
}

// ======================================================
// Security function
// Prevent transcript text from becoming HTML
// ======================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}
// ============================================================
// PRECISION SKILL-GAP VISUALIZER
// ============================================================


// ------------------------------------------------------------
// Industry Skill Database
// ------------------------------------------------------------

const careerSkills = {

    software: {

        name: "Software Developer",

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Git",
            "Data Structures",
            "Algorithms",
            "SQL",
            "Problem Solving"
        ],

        courses: {

            "HTML": "freeCodeCamp - Responsive Web Design",

            "CSS": "freeCodeCamp - Responsive Web Design",

            "JavaScript": "freeCodeCamp - JavaScript Algorithms",

            "Git": "GitHub Skills - Introduction to GitHub",

            "Data Structures": "freeCodeCamp - Data Structures",

            "Algorithms": "freeCodeCamp - Algorithms",

            "SQL": "SQLBolt - Interactive SQL Lessons",

            "Problem Solving": "HackerRank - Problem Solving"

        }

    },


    data: {

        name: "Data Analyst",

        skills: [
            "Python",
            "SQL",
            "Excel",
            "Statistics",
            "Data Visualization",
            "Pandas",
            "Power BI",
            "Problem Solving"
        ],

        courses: {

            "Python": "freeCodeCamp - Scientific Computing with Python",

            "SQL": "SQLBolt - Interactive SQL Lessons",

            "Excel": "Microsoft Learn - Excel Training",

            "Statistics": "Khan Academy - Statistics",

            "Data Visualization": "Khan Academy - Data Visualization",

            "Pandas": "Kaggle Learn - Pandas",

            "Power BI": "Microsoft Learn - Power BI",

            "Problem Solving": "HackerRank - Problem Solving"

        }

    },


    web: {

        name: "Full Stack Web Developer",

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Git"
        ],

        courses: {

            "HTML": "freeCodeCamp - Responsive Web Design",

            "CSS": "freeCodeCamp - Responsive Web Design",

            "JavaScript": "freeCodeCamp - JavaScript Algorithms",

            "React": "React Official Tutorial",

            "Node.js": "freeCodeCamp - Back End Development",

            "Express": "Express.js Documentation",

            "MongoDB": "MongoDB University",

            "Git": "GitHub Skills"

        }

    },


    cyber: {

        name: "Cybersecurity Analyst",

        skills: [
            "Networking",
            "Linux",
            "Python",
            "Cybersecurity Fundamentals",
            "Ethical Hacking",
            "Cryptography",
            "Operating Systems",
            "Problem Solving"
        ],

        courses: {

            "Networking": "Cisco Networking Academy",

            "Linux": "Linux Journey",

            "Python": "freeCodeCamp - Python",

            "Cybersecurity Fundamentals":
                "Cisco Networking Academy - Cybersecurity",

            "Ethical Hacking":
                "TryHackMe - Pre Security",

            "Cryptography":
                "Khan Academy - Cryptography",

            "Operating Systems":
                "Operating Systems - NPTEL",

            "Problem Solving":
                "HackerRank - Problem Solving"

        }

    },


    ai: {

        name: "AI / Machine Learning Engineer",

        skills: [
            "Python",
            "Statistics",
            "Linear Algebra",
            "Machine Learning",
            "Data Structures",
            "Pandas",
            "NumPy",
            "Deep Learning"
        ],

        courses: {

            "Python":
                "freeCodeCamp - Scientific Computing with Python",

            "Statistics":
                "Khan Academy - Statistics",

            "Linear Algebra":
                "Khan Academy - Linear Algebra",

            "Machine Learning":
                "Google Machine Learning Crash Course",

            "Data Structures":
                "freeCodeCamp - Data Structures",

            "Pandas":
                "Kaggle Learn - Pandas",

            "NumPy":
                "Kaggle Learn - NumPy",

            "Deep Learning":
                "Kaggle Learn - Intro to Deep Learning"

        }

    }

};


// ------------------------------------------------------------
// Analyze Skill Gap
// ------------------------------------------------------------
function analyzeSkillGap() {

    // Get student name
    const studentName =
        document.getElementById("studentName").value.trim();

    // Get selected career
    const career =
        document.getElementById("careerSelect").value;

    // Get student skills
    const skillsInput =
        document.getElementById("studentSkills").value.trim();


    // --------------------------------------------------------
    // Validation
    // --------------------------------------------------------

    if (!career) {
        alert("Please select a target career.");
        return;
    }

    if (!skillsInput) {
        alert("Please enter your current skills.");
        return;
    }


    // --------------------------------------------------------
    // Convert entered skills into an array
    // --------------------------------------------------------

    const studentSkills = skillsInput
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");


    // --------------------------------------------------------
    // Normalize skill names
    // This recognizes common variations.
    // --------------------------------------------------------

    function normalizeSkill(skill) {

        let s = skill
            .toLowerCase()
            .trim()
            .replace(/[.]/g, "")
            .replace(/\s+/g, " ");


        const aliases = {

            "js": "javascript",
            "java script": "javascript",

            "reactjs": "react",
            "react js": "react",

            "node": "nodejs",
            "node js": "nodejs",

            "expressjs": "express",
            "express js": "express",

            "mongo": "mongodb",
            "mongo db": "mongodb",

            "ds": "data structures",
            "data structure": "data structures",

            "algo": "algorithms",

            "powerbi": "power bi",

            "ml": "machine learning",

            "dl": "deep learning",

            "problem-solving": "problem solving"

        };

        return aliases[s] || s;
    }


    // --------------------------------------------------------
    // Get career information
    // --------------------------------------------------------

    const careerData = careerSkills[career];

    if (!careerData) {

        alert("Career information not found.");

        return;
    }


    // --------------------------------------------------------
    // Normalize student's skills
    // --------------------------------------------------------

    const normalizedStudentSkills =
        studentSkills.map(skill =>
            normalizeSkill(skill)
        );


    // --------------------------------------------------------
    // Required industry skills
    // --------------------------------------------------------

    const requiredSkills =
        careerData.skills;


    // --------------------------------------------------------
    // Find matched skills
    // --------------------------------------------------------

    const matchedSkills =
        requiredSkills.filter(requiredSkill => {

            const normalizedRequired =
                normalizeSkill(requiredSkill);

            return normalizedStudentSkills.includes(
                normalizedRequired
            );

        });


    // --------------------------------------------------------
    // Find missing skills
    // --------------------------------------------------------

    const missingSkills =
        requiredSkills.filter(requiredSkill => {

            const normalizedRequired =
                normalizeSkill(requiredSkill);

            return !normalizedStudentSkills.includes(
                normalizedRequired
            );

        });


    // --------------------------------------------------------
    // Calculate skill match percentage
    // --------------------------------------------------------

    const matchPercentage =
        Math.round(
            (matchedSkills.length /
                requiredSkills.length) * 100
        );


    const gapPercentage =
        100 - matchPercentage;


    // --------------------------------------------------------
    // Find result container
    // --------------------------------------------------------

    const result =
        document.getElementById("skillGapResult");


    if (!result) {

        alert("Skill-gap result section not found.");

        return;
    }


    // Make result visible
    result.classList.remove("hidden");


    // --------------------------------------------------------
    // Matched skills
    // --------------------------------------------------------

    let matchedHTML = "";

    if (matchedSkills.length === 0) {

        matchedHTML =
            "<p>No required skills matched yet.</p>";

    } else {

        matchedHTML = matchedSkills
            .map(skill => {

                return `
                    <span class="skill-tag matched">
                        ✓ ${skill}
                    </span>
                `;

            })
            .join("");

    }


    // --------------------------------------------------------
    // Missing skills
    // --------------------------------------------------------

    let missingHTML = "";

    if (missingSkills.length === 0) {

        missingHTML =
            "<p>🎉 Excellent! You have all the required skills.</p>";

    } else {

        missingHTML = missingSkills
            .map(skill => {

                return `
                    <div class="missing-skill">

                        <span>
                            ❌ ${skill}
                        </span>

                        <small>
                            📚 Free Resource:
                            ${careerData.courses[skill] || "Free online course"}
                        </small>

                    </div>
                `;

            })
            .join("");

    }


    // --------------------------------------------------------
    // Recommended action plan
    // --------------------------------------------------------

    let actionPlan = "";

    if (missingSkills.length === 0) {

        actionPlan = `
            <li>
                Continue building projects using your current skills.
            </li>

            <li>
                Prepare for technical interviews.
            </li>

            <li>
                Build a strong professional portfolio.
            </li>
        `;

    } else {

        missingSkills
            .slice(0, 3)
            .forEach((skill, index) => {

                actionPlan += `
                    <li>
                        Learn <strong>${skill}</strong>
                        using
                        <strong>
                            ${careerData.courses[skill] || "a free online course"}
                        </strong>.
                    </li>
                `;

            });

    }


    // --------------------------------------------------------
    // Display result
    // --------------------------------------------------------

    result.innerHTML = `

        <div class="skill-result-card">

            <h2>
                📊 ${careerData.name} Skill Analysis
            </h2>

            <p>
                ${
                    studentName
                    ? `Great work, ${studentName}!`
                    : "Here is your skill analysis."
                }
            </p>


            <!-- Skill Match Score -->

            <div class="skill-score">

                <div class="score-number">
                    ${matchPercentage}%
                </div>

                <div>

                    <strong>
                        Industry Skill Match
                    </strong>

                    <p>
                        ${gapPercentage}% skill gap remaining
                    </p>

                </div>

            </div>


            <!-- Skills already known -->

            <h3>
                ✅ Skills You Already Have
            </h3>

            <div class="skill-tags">

                ${matchedHTML}

            </div>


            <!-- Skills that need improvement -->

            <h3>
                🎯 Skills You Need to Learn
            </h3>

            <div class="missing-skills">

                ${missingHTML}

            </div>


            <!-- Recommended learning path -->

            <h3>
                🚀 Recommended Action Plan
            </h3>

            <ol>

                ${actionPlan}

            </ol>

        </div>

    `;


    // --------------------------------------------------------
    // Scroll to result
    // --------------------------------------------------------

    result.scrollIntoView({
        behavior: "smooth"
    });

}
// ============================================================
// VISUAL CAREER BLUEPRINT
// ============================================================


// ------------------------------------------------------------
// Career Blueprint Database
// ------------------------------------------------------------

const careerBlueprints = {

    software: {

        title: "Software Developer",

        description:
            "Build strong programming and problem-solving skills to become a professional software developer.",

        steps: [

            {
                icon: "1️⃣",
                title: "Programming Fundamentals",
                description:
                    "Learn programming basics, variables, loops, functions and object-oriented programming.",
                skills:
                    "Python / Java / C++"
            },

            {
                icon: "2️⃣",
                title: "Data Structures & Algorithms",
                description:
                    "Learn arrays, strings, stacks, queues, linked lists, trees, graphs and algorithms.",
                skills:
                    "DSA + Problem Solving"
            },

            {
                icon: "3️⃣",
                title: "Database Skills",
                description:
                    "Learn how applications store, retrieve and manage data.",
                skills:
                    "SQL + Database Concepts"
            },

            {
                icon: "4️⃣",
                title: "Version Control",
                description:
                    "Learn Git and GitHub for managing and collaborating on software projects.",
                skills:
                    "Git + GitHub"
            },

            {
                icon: "5️⃣",
                title: "Build Projects",
                description:
                    "Create real-world projects to demonstrate your programming skills.",
                skills:
                    "3–5 Portfolio Projects"
            },

            {
                icon: "6️⃣",
                title: "Certifications",
                description:
                    "Complete relevant programming and cloud certifications.",
                skills:
                    "Free certificates / NPTEL / Microsoft Learn"
            },

            {
                icon: "7️⃣",
                title: "Interview Preparation",
                description:
                    "Practice coding problems, technical questions and mock interviews.",
                skills:
                    "DSA + Aptitude + Technical Interview"
            },

            {
                icon: "8️⃣",
                title: "Career Launch",
                description:
                    "Apply for internships, placements and entry-level software development jobs.",
                skills:
                    "Internship → Job"
            }

        ]

    },


    web: {

        title: "Full Stack Web Developer",

        description:
            "Learn frontend, backend and database technologies and build complete web applications.",

        steps: [

            {
                icon: "1️⃣",
                title: "HTML & CSS",
                description:
                    "Learn how websites are structured and styled.",
                skills:
                    "HTML + CSS + Responsive Design"
            },

            {
                icon: "2️⃣",
                title: "JavaScript",
                description:
                    "Learn programming for interactive websites.",
                skills:
                    "JavaScript + DOM + APIs"
            },

            {
                icon: "3️⃣",
                title: "Frontend Framework",
                description:
                    "Learn a modern frontend framework.",
                skills:
                    "React"
            },

            {
                icon: "4️⃣",
                title: "Backend Development",
                description:
                    "Build APIs and server-side applications.",
                skills:
                    "Node.js + Express"
            },

            {
                icon: "5️⃣",
                title: "Database",
                description:
                    "Learn how to store and manage application data.",
                skills:
                    "MongoDB + SQL"
            },

            {
                icon: "6️⃣",
                title: "Full Stack Projects",
                description:
                    "Build complete applications combining frontend, backend and database.",
                skills:
                    "3+ Full Stack Projects"
            },

            {
                icon: "7️⃣",
                title: "Deployment",
                description:
                    "Learn how to deploy websites and applications online.",
                skills:
                    "GitHub + Deployment + Hosting"
            },

            {
                icon: "8️⃣",
                title: "Career Launch",
                description:
                    "Apply for internships, freelance opportunities and developer jobs.",
                skills:
                    "Internship → Full Stack Developer"
            }

        ]

    },


    data: {

        title: "Data Analyst",

        description:
            "Develop analytical, statistical and visualization skills to turn data into useful insights.",

        steps: [

            {
                icon: "1️⃣",
                title: "Excel",
                description:
                    "Learn spreadsheets, formulas, pivot tables and data cleaning.",
                skills:
                    "Excel"
            },

            {
                icon: "2️⃣",
                title: "SQL",
                description:
                    "Learn to query and analyze databases.",
                skills:
                    "SQL"
            },

            {
                icon: "3️⃣",
                title: "Python",
                description:
                    "Learn Python for data analysis.",
                skills:
                    "Python"
            },

            {
                icon: "4️⃣",
                title: "Statistics",
                description:
                    "Learn descriptive statistics, probability and analytical concepts.",
                skills:
                    "Statistics"
            },

            {
                icon: "5️⃣",
                title: "Data Visualization",
                description:
                    "Learn to communicate insights through dashboards and charts.",
                skills:
                    "Power BI / Tableau"
            },

            {
                icon: "6️⃣",
                title: "Portfolio Projects",
                description:
                    "Analyze real datasets and create dashboards.",
                skills:
                    "3+ Data Projects"
            },

            {
                icon: "7️⃣",
                title: "Certifications",
                description:
                    "Complete relevant data analytics certifications.",
                skills:
                    "Microsoft / Google / NPTEL"
            },

            {
                icon: "8️⃣",
                title: "Career Launch",
                description:
                    "Apply for internships and entry-level data analyst roles.",
                skills:
                    "Internship → Data Analyst"
            }

        ]

    },


    cyber: {

        title: "Cybersecurity Analyst",

        description:
            "Build networking, operating system and security skills to enter cybersecurity.",

        steps: [

            {
                icon: "1️⃣",
                title: "Networking Fundamentals",
                description:
                    "Understand networks, protocols and communication.",
                skills:
                    "TCP/IP + DNS + HTTP"
            },

            {
                icon: "2️⃣",
                title: "Linux",
                description:
                    "Learn Linux commands and system administration.",
                skills:
                    "Linux"
            },

            {
                icon: "3️⃣",
                title: "Security Fundamentals",
                description:
                    "Understand common security threats and defenses.",
                skills:
                    "Cybersecurity Fundamentals"
            },

            {
                icon: "4️⃣",
                title: "Ethical Hacking",
                description:
                    "Learn security testing concepts in authorized environments.",
                skills:
                    "Web Security + Security Testing"
            },

            {
                icon: "5️⃣",
                title: "Security Projects",
                description:
                    "Build security labs and document your learning.",
                skills:
                    "Security Labs + Portfolio"
            },

            {
                icon: "6️⃣",
                title: "Certifications",
                description:
                    "Prepare for entry-level cybersecurity certifications.",
                skills:
                    "Security Certifications"
            },

            {
                icon: "7️⃣",
                title: "Interview Preparation",
                description:
                    "Practice security concepts and technical questions.",
                skills:
                    "Technical Interview"
            },

            {
                icon: "8️⃣",
                title: "Career Launch",
                description:
                    "Apply for security internships and analyst roles.",
                skills:
                    "Internship → Security Analyst"
            }

        ]

    },


    ai: {

        title: "AI / Machine Learning Engineer",

        description:
            "Build mathematics, programming and machine learning skills for an AI career.",

        steps: [

            {
                icon: "1️⃣",
                title: "Python Programming",
                description:
                    "Learn Python programming and problem solving.",
                skills:
                    "Python"
            },

            {
                icon: "2️⃣",
                title: "Mathematics",
                description:
                    "Learn the mathematics required for machine learning.",
                skills:
                    "Statistics + Linear Algebra"
            },

            {
                icon: "3️⃣",
                title: "Data Handling",
                description:
                    "Learn to clean and manipulate datasets.",
                skills:
                    "NumPy + Pandas"
            },

            {
                icon: "4️⃣",
                title: "Machine Learning",
                description:
                    "Learn supervised and unsupervised machine learning.",
                skills:
                    "Machine Learning"
            },

            {
                icon: "5️⃣",
                title: "Deep Learning",
                description:
                    "Learn neural networks and deep learning concepts.",
                skills:
                    "Neural Networks + Deep Learning"
            },

            {
                icon: "6️⃣",
                title: "AI Projects",
                description:
                    "Build practical AI projects using real datasets.",
                skills:
                    "3+ AI Projects"
            },

            {
                icon: "7️⃣",
                title: "Portfolio & Certification",
                description:
                    "Document your projects and complete relevant courses.",
                skills:
                    "AI Portfolio"
            },

            {
                icon: "8️⃣",
                title: "Career Launch",
                description:
                    "Apply for internships and junior AI/ML positions.",
                skills:
                    "Internship → AI/ML Engineer"
            }

        ]

    }

};


// ------------------------------------------------------------
// Generate Career Blueprint
// ------------------------------------------------------------

function generateCareerBlueprint() {

    // Get selected career
    const career =
        document.getElementById("blueprintCareer").value;


    // Validate
    if (!career) {

        alert("Please select a career goal.");

        return;
    }


    // Get career data
    const blueprint =
        careerBlueprints[career];


    // Get result container
    const result =
        document.getElementById("careerBlueprintResult");


    // Show result
    result.classList.remove("hidden");


    // Create timeline
    let stepsHTML = "";


    blueprint.steps.forEach((step, index) => {

        stepsHTML += `

            <div class="blueprint-step">

                <div class="blueprint-number">

                    ${step.icon}

                </div>


                <div class="blueprint-content">

                    <h3>
                        ${step.title}
                    </h3>

                    <p>
                        ${step.description}
                    </p>

                    <div class="blueprint-skills">

                        🧠 ${step.skills}

                    </div>

                </div>

            </div>

        `;

    });


    // Display blueprint
    result.innerHTML = `

        <div class="blueprint-card">

            <h2>
                🎯 ${blueprint.title}
            </h2>

            <p class="blueprint-description">

                ${blueprint.description}

            </p>


            <div class="career-path">

                ${stepsHTML}

            </div>


            <div class="blueprint-final">

                🚀 <strong>Your Career Goal</strong>

                <p>
                    Complete these steps, build your portfolio
                    and start applying for internships and jobs.
                </p>

            </div>

        </div>

    `;


    // Scroll to blueprint
    result.scrollIntoView({
        behavior: "smooth"
    });

}
// ============================================================
// SMART SUMMARIZER
// ============================================================

async function generateSummary() {

    // Get YouTube URL
    const youtubeURL =
        document.getElementById("youtubeURL").value.trim();

    // Get lecture/document text
    const lectureText =
        document.getElementById("lectureText").value.trim();

    // Get result area
    const result =
        document.getElementById("summaryResult");


    // Check if user provided anything
    if (!youtubeURL && !lectureText) {

        alert(
            "Please provide a YouTube URL or lecture/document text."
        );

        return;
    }


    // Show loading message
    result.classList.remove("hidden");

    result.innerHTML = `
        <div class="loading-message">

            ⏳ Processing your lecture...

            <br><br>

            Please wait.

        </div>
    `;


    try {

        // Send information to our Node.js server
        const response = await fetch(
            "/api/summarize",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    youtubeURL: youtubeURL,
                    lectureText: lectureText
                })
            }
        );


        // Convert server response into JSON
        const data = await response.json();


        // Check for error
        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to generate summary."
            );
        }


        // Display result
        displaySmartSummary(data);


    } catch (error) {

        console.error(error);


        result.innerHTML = `

            <div class="error-message">

                ❌ <strong>Unable to generate summary.</strong>

                <p>
                    ${error.message}
                </p>

            </div>

        `;
    }
}


// ============================================================
// DISPLAY RESULT
// ============================================================

function displaySmartSummary(data) {

    const result =
        document.getElementById("summaryResult");


    // Create bullet notes
    let bulletNotes = "";

    if (
        data.bulletNotes &&
        data.bulletNotes.length > 0
    ) {

        data.bulletNotes.forEach(note => {

            bulletNotes += `
                <li>${note}</li>
            `;

        });

    } else {

        bulletNotes =
            "<li>No bullet notes available.</li>";
    }


    // Create formula sheet
    let formulas = "";

    if (
        data.formulaSheet &&
        data.formulaSheet.length > 0
    ) {

        data.formulaSheet.forEach(formula => {

            formulas += `
                <li>${formula}</li>
            `;

        });

    } else {

        formulas =
            "<li>No formulas detected.</li>";
    }


    // Create quiz
    let quiz = "";

    if (
        data.quiz &&
        data.quiz.length > 0
    ) {

        data.quiz.forEach(
            (question, index) => {

                quiz += `

                    <div class="quiz-question">

                        <h4>
                            Q${index + 1}.
                            ${question.question}
                        </h4>

                        <p>
                            <strong>Answer:</strong>
                            ${question.answer}
                        </p>

                    </div>

                `;
            }
        );

    } else {

        quiz =
            "<p>No quiz questions available.</p>";
    }


    // Display everything
    result.innerHTML = `

        <div class="smart-summary-card">

            <!-- 100 WORD SUMMARY -->

            <div class="summary-box">

                <h3>
                    📖 100-Word Summary
                </h3>

                <p>
                    ${data.summary}
                </p>

            </div>


            <!-- BULLET NOTES -->

            <div class="summary-box">

                <h3>
                    📝 Bullet Notes
                </h3>

                <ul>
                    ${bulletNotes}
                </ul>

            </div>


            <!-- FORMULA SHEET -->

            <div class="summary-box">

                <h3>
                    📐 Formula Sheet
                </h3>

                <ul>
                    ${formulas}
                </ul>

            </div>


            <!-- QUICK QUIZ -->

            <div class="summary-box">

                <h3>
                    🧠 Quick Quiz
                </h3>

                ${quiz}

            </div>

        </div>

    `;


    // Automatically scroll to result
    result.scrollIntoView({
        behavior: "smooth"
    });

}
// ============================================================
// NAVIGATION
// ============================================================

function scrollToSection(sectionClass) {

    const section =
        document.querySelector("." + sectionClass);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}