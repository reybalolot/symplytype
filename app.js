import express from "express";
import dotenv from "dotenv";
// import sentencesJSON from "./sentences.json" assert { type: 'json' };

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let selectedMode;
// const sentences = sentencesJSON[0];
const sentencesJSON = [
    {
        "sentence" : "The quick brown fox jumps over the lazy dog.",
        "author" : "default"
    },
    {
        "sentence" : "If you found this sentence, it means that you are using the default sentence json.",
        "author" : "default"
    },
    {
        "sentence" : "Embrace the journey, for it is the path that shapes us. In the dance of life, find joy in eavery step. Amidst the cosmic symphony, where stars sing their ancient ballads and galaxies waltz in celestial choreography, we find ourselves—a fleeting note in the grand composition.",
        "author" : "default"
    },
    {
        "sentence" : "There's only five samples by default, so you'll mostly see repetitive sentences.",
        "author" : "default"
    },
]

app.get('/', (req, res) => {
    switch (selectedMode) {
        case 'type':
        res.render('typing', {mode: 'type'});
        break;
        case 'keyboard':
        res.render('keyboard');
        break;
        case 'fake':
        res.render('fake');
        break;
        default:
        res.render('menu')
        break;
    }
});

app.post('/mode', (req, res) => {
    selectedMode = req.body.modes;
    res.redirect('/');
});

app.post('/menu', (req, res) => {
    selectedMode = req.body.pauseModes;
    res.redirect('/')
});

app.get('/sentences', (req, res) => {
    res.json(sentencesJSON)
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on: ${process.env.PORT || 3000}`);
});
