import bodyParser from 'body-parser';

const parser = (app: any) => {
    app.use;
    app.use(bodyParser.json())
    bodyParser.urlencoded({
        extended: false,
    });
};

export default parser;
