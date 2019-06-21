import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {router as widgetRouter} from './widget'

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(widgetRouter);

app.listen(4201, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log('My Node App listening on port 4201');
});
