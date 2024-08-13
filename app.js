import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var selectedMode;

app.get('/', (req, res) => {
    switch (selectedMode) {
        case 'type':
            res.render('typing');
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
    selectedMode = req.body.modes
    res.redirect('/');
});


app.listen(port || 3000, () => {
    console.log(`Server running on: ${port}`);
});
