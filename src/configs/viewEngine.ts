import path from 'path';
import express from 'express';

const configViewEngine = (app: any) => {
    console.log(__dirname);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, '../public')));
};

export default configViewEngine;
