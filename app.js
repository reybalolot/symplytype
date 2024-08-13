import express from "express";

const app = express();
const port = 4000;

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


app.listen(port, () => {
    console.log(`Server running on: ${port}`);
});
