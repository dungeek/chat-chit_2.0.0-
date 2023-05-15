import bodyParser from 'body-parser';

const parsec = (app: any) => {
    app.use
    bodyParser.urlencoded({
      extended: true
    }
  )
}

export default parsec;